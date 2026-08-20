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
  id: 'Vox3Empire',
  durationInSeconds: 38,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const asset = (f: string) => staticFile(`projects/vox-3-empire/layers/${f}`);

const CUE = {
  hook: 15,
  foundation: 120,
  tower1: 210,
  tower2: 270,
  arch: 330,
  statement: 480,
  loop: 600,
} as const;

const CAM = [
  { f: 0, x: 540, y: 1200, z: 1.1 },    // start low on foundation
  { f: 120, x: 540, y: 1100, z: 1.15 },
  { f: 300, x: 540, y: 900, z: 1.3 },   // camera rises with building
  { f: 500, x: 540, y: 700, z: 1.4 },   // high view of complete empire
  { f: 1000, x: 540, y: 800, z: 1.3 },
];

const SceneFade: React.FC<{ out: number; dur?: number; children: React.ReactNode }> = ({ out, dur = 20, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [out - dur, out], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op }}>{children}</div>;
};

const Vox3Empire: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOX.paper }}>
      <CollageBoard cam={CAM}>
        <Sequence from={0} layout="none">
          <PaperBG src={asset('paper.png')} w={W} h={H} />
        </Sequence>

        {/* HOOK: Title */}
        <Sequence from={0} durationInFrames={120} layout="none">
          <SceneFade out={115}>
            <SerifStatement
              x={540}
              y={300}
              w={900}
              at={CUE.hook}
              size={76}
              words={[{ t: 'Her boundaries' }, { t: 'built', hl: true }, { t: 'her empire' }]}
            />
          </SceneFade>
        </Sequence>

        {/* FOUNDATION: Base and woman builder figure */}
        <Sequence from={CUE.foundation} durationInFrames={200} layout="none">
          <SceneFade out={190}>
            <Cutout
              src={asset('foundation-brick.png')}
              x={540}
              y={1400}
              w={950}
              at={0}
              enter="rise"
              rotate={0}
              depth={-0.05}
              shadow={2}
            />
            <Cutout
              src={asset('woman-figure.png')}
              x={540}
              y={1000}
              w={480}
              at={40}
              enter="place"
              rotate={0}
              depth={0.08}
              shadow={3}
            />
            <LabelChip
              x={540}
              y={200}
              at={80}
              text="The wall is not the building"
              kicker="But without it, nothing stands"
              accent={VOX.ink}
              size={26}
              rotate={-1}
            />
          </SceneFade>
        </Sequence>

        {/* CONSTRUCTION: Towers rise */}
        <Sequence from={CUE.tower1} durationInFrames={180} layout="none">
          <SceneFade out={170}>
            {/* Tower 1 - Left */}
            <Cutout
              src={asset('tower-1.png')}
              x={280}
              y={700}
              w={380}
              at={0}
              enter="rise"
              rotate={-2}
              depth={0.08}
              shadow={3}
              sticker={6}
            />
            {/* Tower 2 - Right */}
            <Cutout
              src={asset('tower-2.png')}
              x={800}
              y={750}
              w={380}
              at={30}
              enter="rise"
              rotate={2}
              depth={0.08}
              shadow={3}
              sticker={6}
            />
            {/* Arch connection */}
            <Cutout
              src={asset('arch.png')}
              x={540}
              y={550}
              w={700}
              at={60}
              enter="place"
              rotate={0}
              depth={0.06}
              shadow={2}
              sticker={4}
            />
            {/* Architectural details */}
            <Cutout
              src={asset('architectural-details.png')}
              x={540}
              y={400}
              w={600}
              at={90}
              enter="fade"
              rotate={0}
              depth={0.04}
              shadow={1}
            />
            <SerifStatement
              x={540}
              y={1700}
              w={900}
              at={120}
              size={68}
              backing
              words={[{ t: 'The no that held the line freed the space', hl: true }]}
            />
          </SceneFade>
        </Sequence>

        {/* EMPIRE VIEW: Everything visible, grand statement */}
        <Sequence from={CUE.statement} durationInFrames={120} layout="none">
          <SceneFade out={110}>
            <SerifStatement
              x={540}
              y={900}
              w={900}
              at={0}
              size={80}
              backing
              words={[{ t: 'where everything was', hl: true }, { t: 'eventually constructed' }]}
            />
          </SceneFade>
        </Sequence>

        {/* LOOP: Return to foundation view */}
        <Sequence from={CUE.loop} layout="none">
          <Cutout
            src={asset('foundation-brick.png')}
            x={540}
            y={1400}
            w={950}
            at={0}
            enter="fade"
            rotate={0}
            depth={-0.05}
          />
          <Sequence from={30} layout="none">
            <SerifStatement
              x={540}
              y={300}
              w={900}
              at={0}
              size={76}
              words={[{ t: 'Her boundaries' }, { t: 'built', hl: true }, { t: 'her empire' }]}
            />
          </Sequence>
        </Sequence>
      </CollageBoard>
      <Grain intensity={0.08} />
    </AbsoluteFill>
  );
};

export default Vox3Empire;
