#!/bin/bash
# Generate voiceover for all 5 vox-shorts using Kokoro TTS via FAL

set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "=== Generating VOX SHORTS VOICEOVER (Kokoro TTS) ==="
echo ""

# VOX-2: Boundaries
echo ">>> VOX-2: Boundaries"
python tools/gen_voice_kokoro_local.py \
  --beats vox-shorts/vox-2-boundaries/beats.json \
  --voice "af" \
  --speed 1.0

# VOX-3: Empire
echo ""
echo ">>> VOX-3: Empire"
python tools/gen_voice_kokoro_local.py \
  --beats vox-shorts/vox-3-empire/beats.json \
  --voice "af" \
  --speed 1.0

# VOX-4: Mirror
echo ""
echo ">>> VOX-4: Mirror"
python tools/gen_voice_kokoro_local.py \
  --beats vox-shorts/vox-4-mirror/beats.json \
  --voice "af" \
  --speed 1.0

# VOX-5: Feelings
echo ""
echo ">>> VOX-5: Feelings"
python tools/gen_voice_kokoro_local.py \
  --beats vox-shorts/vox-5-feelings/beats.json \
  --voice "af" \
  --speed 1.0

# VOX-6: Survival
echo ""
echo ">>> VOX-6: Survival"
python tools/gen_voice_kokoro_local.py \
  --beats vox-shorts/vox-6-survival/beats.json \
  --voice "af" \
  --speed 1.0

echo ""
echo "=== ALL VOICEOVERS GENERATED ==="
echo "✓ 5 voice tracks created with word-exact timing"
echo "✓ beats.json files updated with actual timings"
echo ""
echo "Next steps:"
echo "1. QA voice tracks: listen to vox-shorts/vox-N-*/voice/voice.wav"
echo "2. Test frame timing: npm run gen && node scripts/frames.mjs VoxN..."
echo "3. Plan SFX with /suggest-sfx skill"
echo "4. Render final videos"
