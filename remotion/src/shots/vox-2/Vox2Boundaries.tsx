import React from 'react';
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import {
  CollageBoard,
  Cutout,
  Grain,
  LabelChip,
  PaperBG,
  SerifStatement,
  VOX,
} from '../../lib/collage';

// =============================================================================
// COMPOSITION CONFIG — "Boundaries are how she protects her peace"
// Beats + VO contract: vox-shorts/vox-2-boundaries/beats.json
// =============================================================================
export const compositionConfig = {
  id: 'Vox2Boundaries',
  durationInSeconds: 42,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const asset = (f: string) => staticFile(`projects/vox-2-boundaries/layers/${f}`);

// =============================================================================
// CUES (GLOBAL frames @30fps) — from beats.json timing
// =============================================================================
const CUE = {
  intro: 15,           // "Boundaries are how she protects" @ 0.5s
  woman: 120,          // woman figure enters @ 4.0s
  gate: 150,           // gates arrange @ 5.0s
  light: 360,          // light/glow @ 12.0s
  statement: 600,      // final statement @ 20.0s
  loop: 750,           // back to intro framing @ 25.0s
} as const;

// Camera: start wide on gates, stay relatively static with subtle drift
const CAM = [
  { f: 0, x: 540, y: 960, z: 1 },
  { f: 150, x: 540, y: 960, z: 1 },
  { f: 300, x: 540, y: 970, z: 1.01 },
  { f: 1000, x: 540, y: 960, z: 1 },
];

// Scene fade helper
const SceneFade: React.FC<{ out: number; dur?: number; children: React.ReactNode }> = ({ out, dur = 20, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [out - dur, out], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op }}>{children}</div>;
};

const Vox2Boundaries: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOX.paper }}>
      <CollageBoard cam={CAM}>
        {/* Paper background — persists throughout */}
        <Sequence from={0} layout="none">
          <PaperBG src={asset('paper.png')} w={W} h={H} />
        </Sequence>

        {/* INTRO (0–5s): Title text fades in, gates enter */}
        <Sequence from={0} durationInFrames={150} layout="none">
          <SceneFade out={145}>
            <SerifStatement
              x={540}
              y={400}
              w={900}
              at={CUE.intro}
              size={76}
              words={[{ t: 'Boundaries' }, { t: 'protect' }, { t: 'her', hl: true }, { t: 'peace' }]}
            />
          </SceneFade>
        </Sequence>

        {/* METAPHOR (4–12s): Woman figure and gates establish the visual metaphor */}
        <Sequence from={120} durationInFrames={300} layout="none">
          <SceneFade out={290}>
            {/* Woman centered */}
            <Cutout
              src={asset('woman-figure.png')}
              x={540}
              y={1000}
              w={500}
              at={0}
              enter="place"
              rotate={0}
              depth={0.05}
              shadow={2}
            />

            {/* Left gate */}
            <Cutout
              src={asset('gate-left.png')}
              x={280}
              y={900}
              w={400}
              at={CUE.gate - CUE.woman}
              enter="slide-l"
              rotate={-2}
              depth={0.02}
              shadow={2}
              sticker={4}
            />

            {/* Right gate */}
            <Cutout
              src={asset('gate-right.png')}
              x={800}
              y={900}
              w={400}
              at={CUE.gate - CUE.woman}
              enter="slide-r"
              rotate={2}
              depth={0.02}
              shadow={2}
              sticker={4}
            />

            {/* Label chip */}
            <LabelChip
              x={540}
              y={1600}
              at={CUE.gate - CUE.woman + 30}
              text="Not walls—filters"
              kicker="Gates, not barriers"
              accent={VOX.teal}
              size={28}
              rotate={-1}
            />
          </SceneFade>
        </Sequence>

        {/* REALIZATION (12–20s): Light/glow enters, peaceful imagery */}
        <Sequence from={360} durationInFrames={240} layout="none">
          <SceneFade out={230}>
            {/* Light rays enter */}
            <Cutout
              src={asset('light-rays.png')}
              x={540}
              y={800}
              w={600}
              at={0}
              enter="rise"
              rotate={0}
              depth={0.08}
              shadow={0}
            />

            {/* Peaceful background layer */}
            <Cutout
              src={asset('peaceful-background.png')}
              x={540}
              y={960}
              w={1000}
              at={30}
              enter="fade"
              rotate={0}
              depth={-0.02}
              shadow={0}
            />

            {/* Statement */}
            <SerifStatement
              x={540}
              y={1400}
              w={900}
              at={60}
              size={72}
              backing
              words={[{ t: 'The' }, { t: 'peace', hl: true }, { t: 'inside did not arrive by accident' }]}
            />
          </SceneFade>
        </Sequence>

        {/* REINFORCEMENT (20–30s): Final statement, everything settles */}
        <Sequence from={600} durationInFrames={150} layout="none">
          <SceneFade out={140}>
            <SerifStatement
              x={540}
              y={800}
              w={900}
              at={0}
              size={80}
              backing
              words={[{ t: 'Boundaries' }, { t: 'are how she protects her peace', hl: true }]}
            />
          </SceneFade>
        </Sequence>

        {/* LOOP (30–42s): Return to intro framing for seamless repeat */}
        <Sequence from={CUE.loop} layout="none">
          <Cutout
            src={asset('woman-figure.png')}
            x={540}
            y={1000}
            w={500}
            at={0}
            enter="fade"
            rotate={0}
            depth={0.05}
            shadow={2}
          />
          <Sequence from={30} layout="none">
            <SerifStatement
              x={540}
              y={400}
              w={900}
              at={0}
              size={76}
              words={[{ t: 'Boundaries' }, { t: 'protect' }, { t: 'her', hl: true }, { t: 'peace' }]}
            />
          </Sequence>
        </Sequence>
      </CollageBoard>

      {/* Grain overlay for vox aesthetic */}
      <Grain intensity={0.08} />
    </AbsoluteFill>
  );
};

export default Vox2Boundaries;
