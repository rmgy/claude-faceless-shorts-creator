# vox-6-survival — "People treat you the way they've learned to survive"

40s vertical (1080×1920) · voice: ElevenLabs female narrator · no burned captions.

## STATUS: scripting complete — layer production phase

## Facts (verified)

- Trauma/survival patterns = learned behavioral adaptations (psychology)
- Behavior reflects internal protection mechanisms, not character judgment (neuroscience)
- People operate from their own survival framework (attachment theory, trauma-informed practice)
- Depersonalization = tool for emotional resilience (psychological principle)

## Beat sheet

| t (s) | beat | on screen | VO |
|---|---|---|---|
| 0–5 | INTRO | Title "Survival" fades in; figure placed on paper with subtle distress imagery around them. | People treat you the way they've learned to survive. |
| 5–12 | PATTERNS | Multiple figures appear, each showing different behavior patterns (protection poses); "Not always with intention" chip; contextual backgrounds hint at different survival contexts. | Not always with intention. Not always with awareness. |
| 12–20 | ADAPTATION | Background elements shift to show survival contexts (uncertainty, defense, past trauma hints); statement "But the behavior that persists is almost always adaptive" (backing strip). | But the behavior that persists is almost always adaptive. |
| 20–28 | REFRAMING | Camera pulls back; all figures visible in their own contexts; "It is not about you" statement emerges (backing strip, central, clear). | It is not about you. |
| 28–40 | INTEGRATION | Figures relax their protective poses; contexts fade to neutral; final view shows centered peace with acceptance; seamless loop to intro framing. | It is about their survival. (Silent space for integration) |

## Layers (media/projects/vox-6-survival/layers/)

paper.png · central-figure.png (rembg) · figure-variant-1.png (rembg) · figure-variant-2.png (rembg) · survival-context-1.png · survival-context-2.png · protection-gestures.png (rembg)

## Production notes

- Metaphor: different figures = different people with their own survival stories (not about the viewer)
- Protective poses show defense without judgment (visual empathy)
- Context backgrounds suggest (not explain) why survival strategies exist
- Pacing: building complexity (one figure → multiple → understanding), then simplification (return to center)
- Statement placement critical: "It is not about you" as hero moment (primary statement, bold backing)
- Parallax: survival context layers float behind figures (they carry their own weight)
- SFX: subtle tension early, protective sounds, transition to relief/acceptance, ending with quiet integration
- Loop strategy: integrated peace → back to survival patterns → understanding returns
- After gen_voice.py: sync figures to "Not always", contexts to "behavior persists", and bold statement to "It is not about you"

## Next steps

1. Generate figure variants and context layers via gen_image.py + cutout.py
2. Create TSX with multiple figure positioning and context parallax
3. Record voice with gen_voice.py
4. QA protective pose clarity and statement impact at key moments
5. SFX pass with tension→acceptance progression
