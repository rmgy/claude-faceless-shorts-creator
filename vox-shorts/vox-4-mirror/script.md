# vox-4-mirror — "Every relationship is a mirror"

40s vertical (1080×1920) · voice: ElevenLabs female narrator · no burned captions.

## STATUS: scripting complete — layer production phase

## Facts (verified)

- Mirror metaphor = psychological principle (self-awareness through relationships)
- Relationships reflect internal patterns (Jung/Gestalt concept)
- Reflections reveal both positive and negative aspects
- Self-discovery through connection (established psychological framework)

## Beat sheet

| t (s) | beat | on screen | VO |
|---|---|---|---|
| 0–5 | INTRO | Title "Mirror" fades in; actual mirror imagery places on paper. Soft focus beginning. | Every relationship is a mirror. |
| 5–12 | REFLECTION | Woman figure places; second figure (reflection) appears in mirror space; chip "What you find in others" | What you find in others often echoes something you carry inside. |
| 12–20 | MULTIPLICITY | Multiple figures/reflections arrange around the mirror; different aspects highlighted (humor, depth, irritant imagery); "The irritant, the humor, the depth" statement. | The irritant, the humor, the depth. |
| 20–30 | REALIZATION | Camera pulls back; all figures visible; statement "Every relationship is a mirror" (backing strip) emerges central. | Every relationship is a mirror. |
| 30–40 | LOOP | Mirror imagery fades; figures settle into symmetric composition; camera returns to intro framing; seamless loop point. | (Ambient reflection/contemplation space) |

## Layers (media/projects/vox-4-mirror/layers/)

paper.png · mirror-frame.png (rembg) · woman-primary.png (rembg) · reflection-figure.png (rembg) · secondary-figures.png (rembg) · depth-elements.png (rembg)

## Production notes

- Metaphor: actual mirror visual represents internal reflection (not literal)
- Multiple figures show different relationship dynamics (different people, same mirror principle)
- Symmetric composition emphasizes the reflection concept
- Depth layering: figure in front, mirror center, reflections behind (parallax effect)
- Pacing: building complexity (1 figure → many figures → full understanding)
- SFX: subtle mirror chimes, reflective ambient tones, soft figure placements
- Loop strategy: tight composition → wide symmetric view → back to mirror focus
- After gen_voice.py: sync "What you find" with second figure appearance, "irritant/humor/depth" with respective figure reveals

## Next steps

1. Generate mirror and figure layers via gen_image.py + cutout.py
2. Create TSX with symmetric parallax and reflection positioning
3. Record voice with gen_voice.py
4. QA reflection alignment at key moments
5. SFX pass with reflective/chime elements
