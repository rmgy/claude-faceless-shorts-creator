#!/bin/bash
# Generate all layers for 5 vox-shorts projects using OpenRouter

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Generating VOX SHORTS LAYERS ==="

# VOX-2: BOUNDARIES
echo ""
echo ">>> VOX-2: Boundaries (gates/peace metaphor)"
mkdir -p media/projects/vox-2-boundaries/layers

python tools/gen_image_openrouter.py \
  --prompt "warm cream kraft paper texture, seamless background, film grain" \
  --output media/projects/vox-2-boundaries/layers/paper-raw.png \
  --width 1080 --height 1920

python tools/gen_image_openrouter.py \
  --prompt "silhouette of a contemplative woman standing, isolated on plain white background, peaceful expression, graceful posture" \
  --output media/projects/vox-2-boundaries/layers/woman-figure-raw.png \
  --width 1080 --height 1080

python tools/gen_image_openrouter.py \
  --prompt "ornate decorative gate or door, vintage style, isolated on white background, intricate metalwork" \
  --output media/projects/vox-2-boundaries/layers/gate-left-raw.png \
  --width 600 --height 800

python tools/gen_image_openrouter.py \
  --prompt "ornate decorative gate or door, vintage style, isolated on white background, intricate metalwork, mirror image" \
  --output media/projects/vox-2-boundaries/layers/gate-right-raw.png \
  --width 600 --height 800

python tools/gen_image_openrouter.py \
  --prompt "soft light rays or luminous glow, ethereal quality, isolated on transparent background, peaceful energy" \
  --output media/projects/vox-2-boundaries/layers/light-rays-raw.png \
  --width 800 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "serene peaceful abstract background, soft colors, calming atmosphere, isolated elements on white background" \
  --output media/projects/vox-2-boundaries/layers/peaceful-background-raw.png \
  --width 1080 --height 1920

echo "VOX-2 images generated."

# VOX-3: EMPIRE
echo ""
echo ">>> VOX-3: Empire (foundation/construction metaphor)"
mkdir -p media/projects/vox-3-empire/layers

python tools/gen_image_openrouter.py \
  --prompt "warm cream kraft paper texture, seamless background, film grain" \
  --output media/projects/vox-3-empire/layers/paper-raw.png \
  --width 1080 --height 1920

python tools/gen_image_openrouter.py \
  --prompt "strong confident woman figure standing tall, isolated on white background, powerful posture, architectural quality" \
  --output media/projects/vox-3-empire/layers/woman-figure-raw.png \
  --width 1080 --height 1080

python tools/gen_image_openrouter.py \
  --prompt "stone brick foundation or base, architectural element, isolated on white background, solid and strong" \
  --output media/projects/vox-3-empire/layers/foundation-brick-raw.png \
  --width 1080 --height 600

python tools/gen_image_openrouter.py \
  --prompt "tall tower or architectural column, vintage engraving style, isolated on white background" \
  --output media/projects/vox-3-empire/layers/tower-1-raw.png \
  --width 500 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "another tall tower or architectural column, vintage engraving style, isolated on white background" \
  --output media/projects/vox-3-empire/layers/tower-2-raw.png \
  --width 500 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "grand architectural arch or gateway, classical style, isolated on white background" \
  --output media/projects/vox-3-empire/layers/arch-raw.png \
  --width 800 --height 600

python tools/gen_image_openrouter.py \
  --prompt "ornate architectural decorative details, vintage style, isolated elements on white background" \
  --output media/projects/vox-3-empire/layers/architectural-details-raw.png \
  --width 800 --height 800

echo "VOX-3 images generated."

# VOX-4: MIRROR
echo ""
echo ">>> VOX-4: Mirror (reflection/self-discovery metaphor)"
mkdir -p media/projects/vox-4-mirror/layers

python tools/gen_image_openrouter.py \
  --prompt "warm cream kraft paper texture, seamless background, film grain" \
  --output media/projects/vox-4-mirror/layers/paper-raw.png \
  --width 1080 --height 1920

python tools/gen_image_openrouter.py \
  --prompt "ornate decorative mirror frame, vintage or classical style, isolated on white background, elegant" \
  --output media/projects/vox-4-mirror/layers/mirror-frame-raw.png \
  --width 800 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "woman figure looking forward, reflective expression, isolated on white background, modern style" \
  --output media/projects/vox-4-mirror/layers/woman-primary-raw.png \
  --width 600 --height 900

python tools/gen_image_openrouter.py \
  --prompt "mirrored woman figure, same as primary but slightly different angle, reflection, isolated on white background" \
  --output media/projects/vox-4-mirror/layers/reflection-figure-raw.png \
  --width 600 --height 900

python tools/gen_image_openrouter.py \
  --prompt "multiple abstract figures or silhouettes in various poses, showing different personalities, isolated on white background" \
  --output media/projects/vox-4-mirror/layers/secondary-figures-raw.png \
  --width 900 --height 800

python tools/gen_image_openrouter.py \
  --prompt "abstract depth elements, layered transparent shapes suggesting reflection and multiplicity, isolated on white background" \
  --output media/projects/vox-4-mirror/layers/depth-elements-raw.png \
  --width 1000 --height 900

echo "VOX-4 images generated."

# VOX-5: FEELINGS
echo ""
echo ">>> VOX-5: Feelings (storm/acceptance metaphor)"
mkdir -p media/projects/vox-5-feelings/layers

python tools/gen_image_openrouter.py \
  --prompt "warm cream kraft paper texture, seamless background, film grain" \
  --output media/projects/vox-5-feelings/layers/paper-raw.png \
  --width 1080 --height 1920

python tools/gen_image_openrouter.py \
  --prompt "woman figure in contemplative pose, emotional but centered, isolated on white background" \
  --output media/projects/vox-5-feelings/layers/woman-figure-raw.png \
  --width 800 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "stormy weather elements, swirling wind and clouds, turbulent energy, isolated on white background" \
  --output media/projects/vox-5-feelings/layers/storm-elements-raw.png \
  --width 900 --height 900

python tools/gen_image_openrouter.py \
  --prompt "geometric barriers or walls, representing emotional containment, isolated on white background" \
  --output media/projects/vox-5-feelings/layers/wall-barriers-raw.png \
  --width 800 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "flowing water or liquid elements, smooth and graceful, representing emotional flow, isolated on white background" \
  --output media/projects/vox-5-feelings/layers/flowing-water-raw.png \
  --width 900 --height 800

python tools/gen_image_openrouter.py \
  --prompt "soft light rays or divine light, peaceful glow, isolated on transparent background" \
  --output media/projects/vox-5-feelings/layers/light-rays-raw.png \
  --width 800 --height 800

python tools/gen_image_openrouter.py \
  --prompt "clear sky or peaceful natural landscape, serene and calm, isolated on white background" \
  --output media/projects/vox-5-feelings/layers/sky-clear-raw.png \
  --width 1080 --height 1200

echo "VOX-5 images generated."

# VOX-6: SURVIVAL
echo ""
echo ">>> VOX-6: Survival (trauma-informed perspectives metaphor)"
mkdir -p media/projects/vox-6-survival/layers

python tools/gen_image_openrouter.py \
  --prompt "warm cream kraft paper texture, seamless background, film grain" \
  --output media/projects/vox-6-survival/layers/paper-raw.png \
  --width 1080 --height 1920

python tools/gen_image_openrouter.py \
  --prompt "centered woman figure with calm expression, isolated on white background, grounded presence" \
  --output media/projects/vox-6-survival/layers/central-figure-raw.png \
  --width 700 --height 1000

python tools/gen_image_openrouter.py \
  --prompt "woman figure in protective pose or stance, showing emotional guardedness, isolated on white background" \
  --output media/projects/vox-6-survival/layers/figure-variant-1-raw.png \
  --width 700 --height 900

python tools/gen_image_openrouter.py \
  --prompt "woman figure in different defensive posture, showing different survival mechanism, isolated on white background" \
  --output media/projects/vox-6-survival/layers/figure-variant-2-raw.png \
  --width 700 --height 900

python tools/gen_image_openrouter.py \
  --prompt "abstract background suggesting challenging life circumstances or adversity, isolated on white background" \
  --output media/projects/vox-6-survival/layers/survival-context-1-raw.png \
  --width 900 --height 800

python tools/gen_image_openrouter.py \
  --prompt "another abstract background representing different survival context or challenge, isolated on white background" \
  --output media/projects/vox-6-survival/layers/survival-context-2-raw.png \
  --width 900 --height 800

python tools/gen_image_openrouter.py \
  --prompt "abstract protective or defensive gestures and movements, showing protective instincts, isolated on white background" \
  --output media/projects/vox-6-survival/layers/protection-gestures-raw.png \
  --width 800 --height 800

echo "VOX-6 images generated."

echo ""
echo "=== ALL LAYERS GENERATED ==="
echo "Next: Process layers through cutout.py for transparency"
