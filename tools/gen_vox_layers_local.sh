#!/bin/bash
# Generate all placeholder layers for 5 vox-shorts projects using local PIL

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Generating VOX SHORTS LAYERS (Local PIL) ==="
echo "Note: These are placeholder images. Replace with AI-generated versions later."
echo ""

# VOX-2: BOUNDARIES
echo ">>> VOX-2: Boundaries"
mkdir -p media/projects/vox-2-boundaries/layers
python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/paper-raw.png --style "paper" --width 1080 --height 1920
python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/woman-figure-raw.png --style "woman-figure" --width 1080 --height 1080
python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/gate-left-raw.png --style "gate" --width 600 --height 800
python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/gate-right-raw.png --style "gate" --width 600 --height 800
python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/light-rays-raw.png --style "light-rays" --width 800 --height 1000
python tools/gen_image_local.py --output media/projects/vox-2-boundaries/layers/peaceful-background-raw.png --style "paper" --width 1080 --height 1920

# VOX-3: EMPIRE
echo ""
echo ">>> VOX-3: Empire"
mkdir -p media/projects/vox-3-empire/layers
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/paper-raw.png --style "paper" --width 1080 --height 1920
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/woman-figure-raw.png --style "woman-figure" --width 1080 --height 1080
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/foundation-brick-raw.png --style "foundation" --width 1080 --height 600
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/tower-1-raw.png --style "tower" --width 500 --height 1000
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/tower-2-raw.png --style "tower" --width 500 --height 1000
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/arch-raw.png --style "arch" --width 800 --height 600
python tools/gen_image_local.py --output media/projects/vox-3-empire/layers/architectural-details-raw.png --style "tower" --width 800 --height 800

# VOX-4: MIRROR
echo ""
echo ">>> VOX-4: Mirror"
mkdir -p media/projects/vox-4-mirror/layers
python tools/gen_image_local.py --output media/projects/vox-4-mirror/layers/paper-raw.png --style "paper" --width 1080 --height 1920
python tools/gen_image_local.py --output media/projects/vox-4-mirror/layers/mirror-frame-raw.png --style "mirror" --width 800 --height 1000
python tools/gen_image_local.py --output media/projects/vox-4-mirror/layers/woman-primary-raw.png --style "figure" --width 600 --height 900
python tools/gen_image_local.py --output media/projects/vox-4-mirror/layers/reflection-figure-raw.png --style "figure" --width 600 --height 900
python tools/gen_image_local.py --output media/projects/vox-4-mirror/layers/secondary-figures-raw.png --style "figure" --width 900 --height 800
python tools/gen_image_local.py --output media/projects/vox-4-mirror/layers/depth-elements-raw.png --style "light-rays" --width 1000 --height 900

# VOX-5: FEELINGS
echo ""
echo ">>> VOX-5: Feelings"
mkdir -p media/projects/vox-5-feelings/layers
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/paper-raw.png --style "paper" --width 1080 --height 1920
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/woman-figure-raw.png --style "figure" --width 800 --height 1000
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/storm-elements-raw.png --style "storm" --width 900 --height 900
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/wall-barriers-raw.png --style "barriers" --width 800 --height 1000
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/flowing-water-raw.png --style "water" --width 900 --height 800
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/light-rays-raw.png --style "light-rays" --width 800 --height 800
python tools/gen_image_local.py --output media/projects/vox-5-feelings/layers/sky-clear-raw.png --style "paper" --width 1080 --height 1200

# VOX-6: SURVIVAL
echo ""
echo ">>> VOX-6: Survival"
mkdir -p media/projects/vox-6-survival/layers
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/paper-raw.png --style "paper" --width 1080 --height 1920
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/central-figure-raw.png --style "figure" --width 700 --height 1000
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/figure-variant-1-raw.png --style "figure" --width 700 --height 900
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/figure-variant-2-raw.png --style "figure" --width 700 --height 900
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/survival-context-1-raw.png --style "barriers" --width 900 --height 800
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/survival-context-2-raw.png --style "storm" --width 900 --height 800
python tools/gen_image_local.py --output media/projects/vox-6-survival/layers/protection-gestures-raw.png --style "figure" --width 800 --height 800

echo ""
echo "=== ALL PLACEHOLDER LAYERS GENERATED ==="
echo "✓ Generated $(find media/projects/vox-*/layers/ -name "*-raw.png" | wc -l) layer images"
echo ""
echo "Next steps:"
echo "1. Process layers through cutout.py for transparency (remove backgrounds)"
echo "2. Create TSX compositions with these layers"
echo "3. Replace placeholder images with AI-generated versions when network access is available"
