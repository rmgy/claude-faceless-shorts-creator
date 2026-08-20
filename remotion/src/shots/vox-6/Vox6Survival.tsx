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

export const compositionConfig = {
  id: 'Vox6Survival',
  durationInSeconds: 40,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const asset = (f: string) => staticFile(`projects/vox-6-survival/layers/${f}`);

const CUE = {
  intro: 15,
  patterns: 120,
  variant1: 180,
  variant2: 240,
  context1: 300,
  adaptation: 360,
  notAboutYou: 480,
  survival: 540,
  loop: 700,
} as const;

const CAM = [
  { f: 0, x: 540, y: 960, z: 1 },
  { f: 180, x: 540, y: 900, z: 1.1 },    // zoom into patterns
  { f: 360, x: 540, y: 950, z: 1.15 },   // multiple perspectives
  { f: 600, x: 540, y: 1000, z: 1.05 },  // pull back
  { f: 1000, x: 540, y: 960, z: 1 },
];

const SceneFade: React.FC<{ out: number; dur?: number; children: React.ReactNode }> = ({ out, dur = 20, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [out - dur, out], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op }}>{children}</div>;
};

const Vox6Survival: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOX.paper }}>
      <CollageBoard cam={CAM}>
        <Sequence from={0} layout="none">
          <PaperBG src={asset('paper.png')} w={W} h={H} />
        </Sequence>

        {/* INTRO: Central figure and opening statement */}
        <Sequence from={0} durationInFrames={150} layout="none">
          <SceneFade out={145}>
            <SerifStatement
              x={540}
              y={250}
              w={900}
              at={CUE.intro}
              size={72}
              words={[{ t: 'People treat you the way' }, { t: "they've learned to survive", hl: true }]}
            />
            <Cutout
              src={asset('central-figure.png')}
              x={540}
              y={1100}
              w={420}
              at={40}
              enter="place"
              rotate={0}
              depth={0.05}
              shadow={2}
            />
          </SceneFade>
        </Sequence>

        {/* PATTERNS: Multiple figures showing different survival patterns */}
        <Sequence from={CUE.patterns} durationInFrames={180} layout="none">
          <SceneFade out={170}>
            <Cutout
              src={asset('figure-variant-1.png')}
              x={280}
              y={900}
              w={360}
              at={0}
              enter="slide-l"
              rotate={-2}
              depth={0.06}
              shadow={2}
            />
            <Cutout
              src={asset('figure-variant-2.png')}
              x={800}
              y={900}
              w={360}
              at={30}
              enter="slide-r"
              rotate={2}
              depth={0.06}
              shadow={2}
            />
            <LabelChip
              x={200}
              y={1500}
              at={60}
              text="Not always with intention"
              kicker="Not always with awareness"
              accent={VOX.teal}
              size={22}
              rotate={-2}
            />
            <LabelChip
              x={880}
              y={1600}
              at={70}
              text="Each person has their own"
              kicker="survival mechanism"
              accent={VOX.ink}
              size={22}
              rotate={2}
            />
          </SceneFade>
        </Sequence>

        {/* CONTEXTS: Show survival contexts/backgrounds */}
        <Sequence from={CUE.context1} durationInFrames={160} layout="none">
          <SceneFade out={150}>
            <Cutout
              src={asset('survival-context-1.png')}
              x={340}
              y={700}
              w={550}
              at={0}
              enter="rise"
              rotate={-1}
              depth={0.04}
              shadow={1}
            />
            <Cutout
              src={asset('survival-context-2.png')}
              x={740}
              y={700}
              w={550}
              at={30}
              enter="rise"
              rotate={1}
              depth={0.04}
              shadow={1}
            />
            <SerifStatement
              x={540}
              y={1700}
              w={900}
              at={60}
              size={60}
              backing
              words={[{ t: 'But the behavior that persists', hl: true }, { t: 'is almost always adaptive' }]}
            />
          </SceneFade>
        </Sequence>

        {/* ADAPTATION explanation */}
        <Sequence from={CUE.adaptation} durationInFrames={120} layout="none">
          <SceneFade out={110}>
            <Cutout
              src={asset('protection-gestures.png')}
              x={540}
              y={900}
              w={600}
              at={0}
              enter="fade"
              rotate={0}
              depth={0.08}
              shadow={2}
            />
          </SceneFade>
        </Sequence>

        {/* REFRAMING: The key insight */}
        <Sequence from={CUE.notAboutYou} durationInFrames={90} layout="none">
          <SceneFade out={80}>
            <SerifStatement
              x={540}
              y={800}
              w={900}
              at={0}
              size={88}
              backing
              words={[{ t: 'It is', hl: true }, { t: 'not about you' }]}
            />
          </SceneFade>
        </Sequence>

        {/* INTEGRATION: Final statement */}
        <Sequence from={CUE.survival} durationInFrames={90} layout="none">
          <SceneFade out={80}>
            <SerifStatement
              x={540}
              y={1000}
              w={900}
              at={0}
              size={84}
              backing
              words={[{ t: 'It is about' }, { t: 'their survival', hl: true }]}
            />
          </SceneFade>
        </Sequence>

        {/* LOOP: Return to central figure and intro */}
        <Sequence from={CUE.loop} layout="none">
          <Cutout
            src={asset('central-figure.png')}
            x={540}
            y={1100}
            w={420}
            at={0}
            enter="fade"
            rotate={0}
            depth={0.05}
            shadow={2}
          />
          <Sequence from={30} layout="none">
            <SerifStatement
              x={540}
              y={250}
              w={900}
              at={0}
              size={72}
              words={[{ t: 'People treat you the way' }, { t: "they've learned to survive", hl: true }]}
            />
          </Sequence>
        </Sequence>
      </CollageBoard>
      <Grain intensity={0.08} />
    </AbsoluteFill>
  );
};

export default Vox6Survival;
