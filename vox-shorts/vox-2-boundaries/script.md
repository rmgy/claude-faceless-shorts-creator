# vox-2-boundaries — "Boundaries are how she protects her peace"

42s vertical (1080×1920) · voice: ElevenLabs female narrator · no burned captions.

## STATUS: scripting complete — layer production phase

## Facts (verified)

- Boundaries = psychological construct, not walls (empowerment literature)
- Boundaries protect internal peace through selective access (psychology)
- Boundaries = self-respect foundation (established concept)
- Metaphor: gates vs walls (gates open by choice, walls block all)

## Beat sheet

| t (s) | beat | on screen | VO |
|---|---|---|---|
| 0–5 | INTRO | Title "Boundaries" fades in; soft gate/door imagery places on paper. Slow push toward the gate. | Boundaries are how she protects her peace. |
| 5–12 | METAPHOR | Woman figure places left; gates/doors arrange around her; chip "not walls—filters" | Not walls against the world. But gates that she opens only in the direction she chooses. |
| 12–20 | REALIZATION | Light/glow imagery builds around the figure; peaceful elements (light rays, calm shapes) enter; statement "The peace inside did not arrive by accident" (backing strip). | The peace inside did not arrive by accident. |
| 20–30 | REINFORCEMENT | Camera widens; all elements settle into balanced composition; final statement "Boundaries are how she protects her peace" emerges (backing strip). | Boundaries are how she protects her peace. |
| 30–42 | LOOP | Camera returns to intro wide shot; title fades back; figure and gates remain visible. Frame ≈ frame 0 for seamless replay. | (VO ends; ambient space for reflection) |

## Layers (media/projects/vox-2-boundaries/layers/)

paper.png · woman-figure.png (rembg) · gate-left.png (rembg) · gate-right.png (rembg) · light-rays.png (rembg) · peaceful-background.png

## Production notes

- Visual metaphor: gates (choice-based access) vs walls (total blockade)
- Woman figure centered; gates frame her, not trap her (positioning is key)
- Light/glow represents peace as an internal state, not external
- Pacing: slow, contemplative; this is about internal protection
- SFX: soft gate sounds on entrance, light ambient tones, minimal percussion
- Loop strategy: title+figure+gates at frame 0 ≈ last frame; seamless cycle
- After gen_voice.py: retime cues to actual word boundaries (woman on "world", light on "accident", final statement timing)

## Next steps

1. Generate layers via gen_image.py + cutout.py
2. Create TSX composition with proper camera moves and parallax
3. Record voice with gen_voice.py
4. QA frames at key cues
5. SFX pass with suggest-sfx
