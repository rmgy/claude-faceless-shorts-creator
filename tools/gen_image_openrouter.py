#!/usr/bin/env python3
"""
gen_image_openrouter.py — AI image generation via OpenRouter for vox-shorts layers.

Generates images for collage layers using OpenRouter (supports Claude Vision, Flux,
Midjourney, and other providers). Designed for vox-shorts visual metaphors.

Usage:
  python tools/gen_image_openrouter.py --prompt "woman figure on plain white background" \
    --output media/projects/vox-2-boundaries/layers/woman-figure-raw.png

Needs OPENROUTER_API_KEY in .env.
"""
import argparse
import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_env():
    env = {}
    p = os.path.join(ROOT, ".env")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return {**env, **os.environ}


def generate_image_openrouter(api_key, prompt, width=1024, height=1024, model="black-forest-labs/flux-pro"):
    """Generate image via OpenRouter.

    Supports various image models:
    - black-forest-labs/flux-pro (FLUX Pro)
    - black-forest-labs/flux-realism (FLUX Realism)
    - openai/dall-e-3 (DALL-E 3)
    - stabilityai/stable-diffusion-3-large (Stable Diffusion 3)
    """

    url = "https://openrouter.ai/api/v1/images/generations"

    payload = {
        "model": model,
        "prompt": prompt,
        "width": width,
        "height": height,
        "num_images": 1,
    }

    try:
        req = urllib.request.Request(
            url,
            data=json.dumps(payload).encode(),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            }
        )

        with urllib.request.urlopen(req, timeout=300) as response:
            result = json.loads(response.read().decode())

        if "data" not in result or not result["data"]:
            sys.exit(f"OpenRouter image generation failed: {result.get('error', 'unknown error')}")

        image_data = result["data"][0]
        if "b64_json" in image_data:
            # Base64 encoded image
            image_bytes = base64.b64decode(image_data["b64_json"])
        elif "url" in image_data:
            # URL to image - download it
            with urllib.request.urlopen(image_data["url"], timeout=60) as img_response:
                image_bytes = img_response.read()
        else:
            sys.exit(f"OpenRouter returned unknown image format: {image_data.keys()}")

        return image_bytes

    except urllib.error.HTTPError as e:
        detail = e.read().decode()[:500]
        sys.exit(f"OpenRouter image generation failed ({e.code}): {detail}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True, help="image generation prompt")
    ap.add_argument("--output", required=True, help="output PNG file path")
    ap.add_argument("--width", type=int, default=1024, help="image width (default: 1024)")
    ap.add_argument("--height", type=int, default=1024, help="image height (default: 1024)")
    ap.add_argument("--model", default="black-forest-labs/flux-pro",
                    help="OpenRouter model (default: black-forest-labs/flux-pro)")
    ap.add_argument("--dry-run", action="store_true", help="print prompt only")
    args = ap.parse_args()

    if args.dry_run:
        print(f"Prompt: {args.prompt}")
        print(f"Output: {args.output}")
        print(f"Model: {args.model}")
        return

    api_key = load_env().get("OPENROUTER_API_KEY")
    if not api_key:
        sys.exit("OPENROUTER_API_KEY not found in .env")

    # Create output directory if it doesn't exist
    os.makedirs(os.path.dirname(args.output), exist_ok=True)

    print(f"Generating image: {args.prompt}")
    print(f"Model: {args.model}")

    image_bytes = generate_image_openrouter(api_key, args.prompt, args.width, args.height, args.model)

    with open(args.output, "wb") as f:
        f.write(image_bytes)

    print(f"Image saved: {args.output} ({len(image_bytes)} bytes)")

    # Also save metadata
    metadata = {
        "prompt": args.prompt,
        "model": args.model,
        "width": args.width,
        "height": args.height,
    }
    with open(args.output + ".json", "w") as f:
        json.dump(metadata, f, indent=2)
    print(f"Metadata saved: {args.output}.json")


if __name__ == "__main__":
    main()
