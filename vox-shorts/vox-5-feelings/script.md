# vox-5-feelings — "Feelings fade when felt fully"

42s vertical (1080×1920) · voice: ElevenLabs female narrator · no burned captions.

## STATUS: scripting complete — layer production phase

## Facts (verified)

- Emotional suppression = prolonged emotional states (psychology/neuroscience)
- Full emotional processing = faster emotional resolution (validated concept)
- Feelings fade through acceptance, not avoidance (DBT/ACT principle)
- Named emotions process faster (labeling effect, neuroscience research)

## Beat sheet

| t (s) | beat | on screen | VO |
|---|---|---|---|
| 0–5 | INTRO | Title "Feelings" fades in; storm/turbulent imagery on paper. Dark, contained energy. | Feelings fade when felt fully. |
| 5–12 | STORM | Woman figure appears; swirling storm elements around her; "The storm that is allowed to pass" chip; visual turbulence. | The storm that is allowed to pass does not linger in the walls. |
| 12–20 | SUPPRESSION | Visual shift: walls/barriers appear around figure, storm contained within; "Only the ones we name and know" statement. | Only the ones we name and know can eventually move through us. |
| 20–30 | RELEASE | Barriers dissolve; storm energy transforms into flowing, dispersing elements; figure becomes calm; light enters. | (VO completes; visual shows transformation) |
| 30–42 | PEACE | Camera widens; clear sky emerges; peaceful figure with integrated storm elements (now flowing, not trapped); frame ≈ frame 0. | (Silent contemplation; peaceful space) |

## Layers (media/projects/vox-5-feelings/layers/)

paper.png · woman-figure.png (rembg) · storm-elements.png (rembg) · wall-barriers.png (rembg) · flowing-water.png (rembg) · light-rays.png (rembg) · sky-clear.png (rembg)

## Production notes

- Visual metaphor: storm = emotions, walls = suppression, flowing water = acceptance
- Progression: turbulent → contained → flowing → integrated
- Figure transforms from defensive (walls) to open (flow) positioning
- Parallax: storm elements float at different depths showing internal complexity
- Pacing: slow beginning (heavy storm), acceleration through release, calm ending
- SFX: storm sounds (wind, thunder) early, transition to water flows, ending with ambient calm
- Loop strategy: peace and sky view return to storm intro; seamless emotional cycle
- After gen_voice.py: sync storm intensity to "storm/walls", dissolution to "name and know", clearing to final statement

## Next steps

1. Generate storm, barrier, and flow layers via gen_image.py + cutout.py
2. Create TSX with storm transformation and barrier dissolution
3. Record voice with gen_voice.py
4. QA emotional progression at key transitions
5. SFX pass with storm→calm progression
