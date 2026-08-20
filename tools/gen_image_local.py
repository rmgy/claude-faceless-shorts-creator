#!/usr/bin/env python3
"""
gen_image_local.py — Generate placeholder/test layer images locally using PIL.

For development and testing when external APIs are blocked. Creates simple but
visually coherent placeholder images for vox-shorts layers based on color/style
descriptions. These can be replaced with AI-generated images later.

Usage:
  python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/paper-raw.png \
    --style "warm cream kraft paper" --width 1080 --height 1920
"""
import argparse
import json
import os
import sys

try:
    from PIL import Image, ImageDraw, ImageFilter
except ImportError:
    print("Installing Pillow...")
    os.system("pip install pillow --quiet")
    from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def create_paper_bg(width, height):
    """Warm cream kraft paper texture"""
    img = Image.new("RGB", (width, height), color=(245, 240, 230))
    # Add subtle texture
    pixels = img.load()
    import random
    random.seed(42)
    for x in range(0, width, 10):
        for y in range(0, height, 10):
            noise = random.randint(-5, 5)
            pixels[x, y] = tuple(max(0, min(255, c + noise)) for c in img.getpixel((x, y)))
    # Apply blur for film grain effect
    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    return img


def create_woman_figure(width, height, style="standing"):
    """Simple woman silhouette/figure"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Head
    head_y = height // 4
    draw.ellipse([width//2 - 80, head_y - 80, width//2 + 80, head_y + 80],
                 fill=(80, 60, 50, 255), outline=(50, 40, 30, 255), width=2)

    # Shoulders and torso
    torso_y = head_y + 100
    draw.rectangle([width//2 - 100, torso_y, width//2 + 100, torso_y + 250],
                   fill=(100, 70, 60, 255), outline=(50, 40, 30, 255), width=2)

    # Arms
    draw.line([width//2 - 100, torso_y + 50, width//2 - 180, torso_y + 150],
              fill=(80, 60, 50, 255), width=20)
    draw.line([width//2 + 100, torso_y + 50, width//2 + 180, torso_y + 150],
              fill=(80, 60, 50, 255), width=20)

    # Legs
    draw.line([width//2 - 40, torso_y + 250, width//2 - 50, height - 100],
              fill=(70, 50, 45, 255), width=25)
    draw.line([width//2 + 40, torso_y + 250, width//2 + 50, height - 100],
              fill=(70, 50, 45, 255), width=25)

    return img


def create_gate(width, height):
    """Ornate gate/door element"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Gate frame
    margin = 40
    draw.rectangle([margin, margin, width - margin, height - margin],
                   fill=(180, 140, 100, 255), outline=(100, 70, 50, 255), width=8)

    # Vertical divider
    draw.line([width // 2, margin + 20, width // 2, height - margin - 20],
              fill=(100, 70, 50, 255), width=6)

    # Decorative circles (hinges/ornaments)
    for y in [100, height // 2, height - 100]:
        draw.ellipse([margin + 20, y - 25, margin + 70, y + 25],
                     fill=(220, 180, 140, 255), outline=(100, 70, 50, 255), width=3)
        draw.ellipse([width - margin - 70, y - 25, width - margin - 20, y + 25],
                     fill=(220, 180, 140, 255), outline=(100, 70, 50, 255), width=3)

    return img


def create_light_rays(width, height):
    """Ethereal light rays"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Central glow
    center_x, center_y = width // 2, height // 2
    for i in range(5, 0, -1):
        radius = i * 80
        alpha = int(200 * (1 - i / 5))
        draw.ellipse([center_x - radius, center_y - radius,
                      center_x + radius, center_y + radius],
                     fill=(255, 250, 200, alpha))

    # Light rays
    import math
    for angle in range(0, 360, 30):
        rad = math.radians(angle)
        x1, y1 = center_x, center_y
        x2 = center_x + int(math.cos(rad) * width)
        y2 = center_y + int(math.sin(rad) * height)
        draw.line([x1, y1, x2, y2], fill=(255, 250, 200, 150), width=8)

    return img


def create_storm_elements(width, height):
    """Stormy turbulent elements"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Swirling cloud-like shapes
    import random
    random.seed(42)
    for _ in range(20):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(50, 200)
        alpha = random.randint(100, 200)
        draw.ellipse([x - size, y - size, x + size, y + size],
                     fill=(100, 100, 120, alpha), outline=(80, 80, 100, alpha))

    return img


def create_flowing_water(width, height):
    """Flowing water/liquid elements"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Wavy lines representing water flow
    import math
    for y_offset in range(0, height, 60):
        points = []
        for x in range(0, width, 20):
            y = y_offset + int(30 * math.sin(x / 100))
            points.append((x, y))

        for i in range(len(points) - 1):
            draw.line([points[i], points[i + 1]], fill=(100, 150, 200, 180), width=15)

    return img


def create_barrier_walls(width, height):
    """Geometric barriers or walls"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Vertical barrier walls
    for x in [width // 3, width * 2 // 3]:
        draw.rectangle([x - 20, 50, x + 20, height - 50],
                       fill=(150, 150, 150, 200), outline=(100, 100, 100, 255), width=3)

    # Horizontal divisions
    for y in [height // 4, height // 2, height * 3 // 4]:
        draw.line([50, y, width - 50, y], fill=(120, 120, 120, 180), width=8)

    return img


def create_mirror_frame(width, height):
    """Ornate mirror frame"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Ornate frame
    margin = 50
    frame_width = 30
    draw.rectangle([margin, margin, width - margin, height - margin],
                   fill=(210, 180, 140, 255), outline=(139, 90, 43, 255), width=frame_width)

    # Decorative corners
    corner_size = 60
    for x, y in [(margin, margin), (width - margin, margin),
                 (margin, height - margin), (width - margin, height - margin)]:
        draw.ellipse([x - corner_size // 2, y - corner_size // 2,
                      x + corner_size // 2, y + corner_size // 2],
                     fill=(240, 210, 170, 255), outline=(139, 90, 43, 255), width=4)

    return img


def create_figure_silhouette(width, height, variation="default"):
    """Generic figure silhouette"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Simple human silhouette
    center_x = width // 2
    center_y = height // 2

    # Head
    draw.ellipse([center_x - 60, center_y - 120, center_x + 60, center_y - 20],
                 fill=(70, 50, 40, 255))

    # Body
    draw.rectangle([center_x - 50, center_y - 20, center_x + 50, center_y + 150],
                   fill=(70, 50, 40, 255))

    # Legs
    draw.rectangle([center_x - 30, center_y + 150, center_x - 10, center_y + 280],
                   fill=(70, 50, 40, 255))
    draw.rectangle([center_x + 10, center_y + 150, center_x + 30, center_y + 280],
                   fill=(70, 50, 40, 255))

    return img


def create_architectural_element(width, height, element_type="tower"):
    """Generic architectural element"""
    img = Image.new("RGBA", (width, height), color=(0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    if element_type == "tower":
        # Simple tower shape
        draw.rectangle([width // 2 - 100, 50, width // 2 + 100, height - 50],
                       fill=(150, 120, 90, 255), outline=(80, 60, 40, 255), width=4)
        # Tower top
        draw.polygon([(width // 2 - 100, 50), (width // 2 + 100, 50),
                      (width // 2, -30)],
                     fill=(180, 150, 110, 255), outline=(80, 60, 40, 255))

    elif element_type == "arch":
        # Arch shape
        draw.arc([width // 2 - 150, 50, width // 2 + 150, height - 50],
                 0, 180, fill=(150, 120, 90, 255), width=20)

    elif element_type == "foundation":
        # Foundation/base
        draw.rectangle([50, height - 150, width - 50, height - 50],
                       fill=(130, 100, 70, 255), outline=(80, 60, 40, 255), width=4)
        # Brick pattern
        for x in range(50, width, 80):
            draw.line([x, height - 150, x, height - 50], fill=(100, 70, 40, 255), width=2)

    return img


GENERATORS = {
    "paper": create_paper_bg,
    "woman-figure": create_woman_figure,
    "gate": create_gate,
    "light-rays": create_light_rays,
    "storm": create_storm_elements,
    "water": create_flowing_water,
    "barriers": create_barrier_walls,
    "mirror": create_mirror_frame,
    "figure": create_figure_silhouette,
    "tower": lambda w, h: create_architectural_element(w, h, "tower"),
    "arch": lambda w, h: create_architectural_element(w, h, "arch"),
    "foundation": lambda w, h: create_architectural_element(w, h, "foundation"),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--output", required=True, help="output PNG file")
    ap.add_argument("--style", required=True, help="image style/type")
    ap.add_argument("--width", type=int, default=1024, help="width")
    ap.add_argument("--height", type=int, default=1024, help="height")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    # Find matching generator
    generator = None
    for key in GENERATORS:
        if key.lower() in args.style.lower():
            generator = GENERATORS[key]
            break

    if not generator:
        generator = GENERATORS.get("paper")  # default

    if args.dry_run:
        print(f"Style: {args.style}")
        print(f"Output: {args.output}")
        return

    print(f"Generating: {args.style} ({args.width}x{args.height})")

    # Generate image
    if args.style.lower().startswith("paper") or "paper" in args.style.lower():
        img = create_paper_bg(args.width, args.height)
    else:
        img = generator(args.width, args.height)

    # Ensure output directory exists
    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    # Convert RGBA to RGB if needed for PNG
    if img.mode == "RGBA":
        img.save(args.output, "PNG")
    else:
        img.save(args.output, "PNG")

    # Save metadata
    metadata = {
        "prompt": args.style,
        "generator": "local_pil",
        "width": args.width,
        "height": args.height,
        "note": "Placeholder image - replace with AI-generated version"
    }
    with open(args.output + ".json", "w") as f:
        json.dump(metadata, f, indent=2)

    print(f"✓ Image saved: {args.output}")
    print(f"✓ Metadata saved: {args.output}.json")


if __name__ == "__main__":
    main()
