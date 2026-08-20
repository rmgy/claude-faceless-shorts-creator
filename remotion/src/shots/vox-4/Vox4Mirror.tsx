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
  id: 'Vox4Mirror',
  durationInSeconds: 40,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const asset = (f: string) => staticFile(`projects/vox-4-mirror/layers/${f}`);

const CUE = {
  intro: 15,
  mirror: 90,
  woman: 120,
  reflection: 180,
  figures: 300,
  statement: 480,
  loop: 700,
} as const;

const CAM = [
  { f: 0, x: 540, y: 960, z: 1 },
  { f: 180, x: 540, y: 960, z: 1.05 },
  { f: 360, x: 540, y: 880, z: 1.15 },
  { f: 1000, x: 540, y: 960, z: 1 },
];

const SceneFade: React.FC<{ out: number; dur?: number; children: React.ReactNode }> = ({ out, dur = 20, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [out - dur, out], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op }}>{children}</div>;
};

const Vox4Mirror: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOX.paper }}>
      <CollageBoard cam={CAM}>
        <Sequence from={0} layout="none">
          <PaperBG src={asset('paper.png')} w={W} h={H} />
        </Sequence>

        {/* INTRO: Title and mirror frame */}
        <Sequence from={0} durationInFrames={150} layout="none">
          <SceneFade out={145}>
            <SerifStatement
              x={540}
              y={250}
              w={900}
              at={CUE.intro}
              size={76}
              words={[{ t: 'Every', hl: true }, { t: 'relationship is a mirror' }]}
            />
            <Cutout
              src={asset('mirror-frame.png')}
              x={540}
              y={1000}
              w={600}
              at={CUE.mirror}
              enter="place"
              rotate={-1.5}
              depth={0.04}
              shadow={3}
              sticker={6}
            />
          </SceneFade>
        </Sequence>

        {/* REFLECTION: Primary woman and reflection appear */}
        <Sequence from={CUE.woman} durationInFrames={200} layout="none">
          <SceneFade out={190}>
            {/* Primary figure - left */}
            <Cutout
              src={asset('woman-primary.png')}
              x={320}
              y={1000}
              w={380}
              at={0}
              enter="slide-l"
              rotate={-2}
              depth={0.06}
              shadow={2}
            />
            {/* Reflection - right */}
            <Cutout
              src={asset('reflection-figure.png')}
              x={760}
              y={1000}
              w={380}
              at={40}
              enter="slide-r"
              rotate={2}
              depth={0.05}
              shadow={2}
            />
            <LabelChip
              x={540}
              y={1700}
              at={80}
              text="What you find in others..."
              kicker="...echoes something inside"
              accent={VOX.teal}
              size={26}
              rotate={0}
            />
          </SceneFade>
        </Sequence>

        {/* MULTIPLICITY: Many figures appear showing different aspects */}
        <Sequence from={CUE.figures} durationInFrames={200} layout="none">
          <SceneFade out={190}>
            <Cutout
              src={asset('secondary-figures.png')}
              x={540}
              y={600}
              w={700}
              at={0}
              enter="fade"
              rotate={0}
              depth={0.08}
              shadow={2}
            />
            <Cutout
              src={asset('depth-elements.png')}
              x={540}
              y={800}
              w={800}
              at={40}
              enter="rise"
              rotate={0}
              depth={0.03}
              shadow={1}
            />
            <SerifStatement
              x={540}
              y={1500}
              w={900}
              at={80}
              size={64}
              backing
              words={[{ t: 'The irritant,' }, { t: 'the humor,' }, { t: 'the depth', hl: true }]}
            />
          </SceneFade>
        </Sequence>

        {/* REALIZATION: Final statement appears centered */}
        <Sequence from={CUE.statement} durationInFrames={140} layout="none">
          <SceneFade out={130}>
            <SerifStatement
              x={540}
              y={960}
              w={900}
              at={0}
              size={82}
              backing
              words={[{ t: 'Every', hl: true }, { t: 'relationship is a mirror' }]}
            />
          </SceneFade>
        </Sequence>

        {/* LOOP: Return to mirror focus */}
        <Sequence from={CUE.loop} layout="none">
          <Cutout
            src={asset('mirror-frame.png')}
            x={540}
            y={1000}
            w={600}
            at={0}
            enter="fade"
            rotate={-1.5}
            depth={0.04}
            shadow={3}
          />
          <Sequence from={40} layout="none">
            <SerifStatement
              x={540}
              y={250}
              w={900}
              at={0}
              size={76}
              words={[{ t: 'Every', hl: true }, { t: 'relationship is a mirror' }]}
            />
          </Sequence>
        </Sequence>
      </CollageBoard>
      <Grain intensity={0.08} />
    </AbsoluteFill>
  );
};

export default Vox4Mirror;
