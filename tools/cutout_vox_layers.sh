#!/bin/bash
# Process all generated vox-shorts layers through cutout.py for transparency

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Processing VOX Layers Through cutout.py ==="
echo "Creating transparent PNG versions of all layers..."
echo ""

# Function to process a single layer
process_layer() {
    local raw_file=$1
    local out_file=${raw_file%-raw.png}.png

    if [ -f "$raw_file" ]; then
        echo "Processing: $(basename "$raw_file")"
        python tools/cutout.py "$raw_file" "$out_file" --method key --tol 30 --soft 22 --pad 16
    fi
}

# Process all raw layers
for raw_file in media/projects/vox-*/layers/*-raw.png; do
    process_layer "$raw_file"
done

echo ""
echo "=== ALL LAYERS PROCESSED ==="
echo "✓ Created transparent PNG versions for all layer images"
echo ""
echo "Layer files ready for TSX composition:"
find media/projects/vox-*/layers/ -name "*.png" ! -name "*-raw.png" | wc -l
echo "files created"
