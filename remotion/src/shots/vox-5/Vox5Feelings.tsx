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
  id: 'Vox5Feelings',
  durationInSeconds: 42,
  fps: 30,
  width: 1080,
  height: 1920,
};

const W = 1080;
const H = 1920;
const asset = (f: string) => staticFile(`projects/vox-5-feelings/layers/${f}`);

const CUE = {
  intro: 15,
  storm: 120,
  barriers: 240,
  water: 360,
  light: 420,
  statement: 540,
  sky: 600,
  loop: 750,
} as const;

const CAM = [
  { f: 0, x: 540, y: 960, z: 1 },
  { f: 180, x: 540, y: 1100, z: 1.1 },   // in the storm
  { f: 360, x: 540, y: 900, z: 1.05 },   // barriers appear
  { f: 540, x: 540, y: 800, z: 0.95 },   // rising out
  { f: 800, x: 540, y: 960, z: 1 },
];

const SceneFade: React.FC<{ out: number; dur?: number; children: React.ReactNode }> = ({ out, dur = 20, children }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [out - dur, out], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op }}>{children}</div>;
};

const Vox5Feelings: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: VOX.paper }}>
      <CollageBoard cam={CAM}>
        <Sequence from={0} layout="none">
          <PaperBG src={asset('paper.png')} w={W} h={H} />
        </Sequence>

        {/* INTRO: Title statement */}
        <Sequence from={0} durationInFrames={150} layout="none">
          <SceneFade out={145}>
            <SerifStatement
              x={540}
              y={400}
              w={900}
              at={CUE.intro}
              size={76}
              words={[{ t: 'Feelings fade' }, { t: 'when felt fully', hl: true }]}
            />
          </SceneFade>
        </Sequence>

        {/* STORM: Turbulent emotions present */}
        <Sequence from={CUE.storm} durationInFrames={180} layout="none">
          <SceneFade out={170}>
            <Cutout
              src={asset('woman-figure.png')}
              x={540}
              y={1100}
              w={480}
              at={0}
              enter="place"
              rotate={0}
              depth={0.06}
              shadow={2}
            />
            <Cutout
              src={asset('storm-elements.png')}
              x={540}
              y={800}
              w={900}
              at={30}
              enter="rise"
              rotate={0}
              depth={0.08}
              shadow={2}
            />
            <LabelChip
              x={540}
              y={200}
              at={60}
              text="The storm that is allowed to pass"
              kicker="does not linger"
              accent={VOX.red}
              size={26}
              rotate={-1}
            />
          </SceneFade>
        </Sequence>

        {/* SUPPRESSION: Barriers appear, containing emotions */}
        <Sequence from={CUE.barriers} durationInFrames={160} layout="none">
          <SceneFade out={150}>
            <Cutout
              src={asset('wall-barriers.png')}
              x={540}
              y={950}
              w={700}
              at={0}
              enter="place"
              rotate={0}
              depth={0.04}
              shadow={2}
            />
            <SerifStatement
              x={540}
              y={1700}
              w={900}
              at={40}
              size={64}
              backing
              words={[{ t: 'Only the ones we', hl: true }, { t: 'name and know' }]}
            />
          </SceneFade>
        </Sequence>

        {/* RELEASE: Water flow represents acceptance and movement */}
        <Sequence from={CUE.water} durationInFrames={140} layout="none">
          <SceneFade out={130}>
            {/* Barriers dissolve */}
            <Cutout
              src={asset('flowing-water.png')}
              x={540}
              y={1000}
              w={850}
              at={0}
              enter="rise"
              rotate={0}
              depth={0.05}
              shadow={1}
            />
            <SerifStatement
              x={540}
              y={400}
              w={900}
              at={30}
              size={68}
              backing
              words={[{ t: 'can eventually', hl: true }, { t: 'move through us' }]}
            />
          </SceneFade>
        </Sequence>

        {/* PEACE: Light and calm emerge */}
        <Sequence from={CUE.light} durationInFrames={120} layout="none">
          <SceneFade out={110}>
            <Cutout
              src={asset('light-rays.png')}
              x={540}
              y={800}
              w={500}
              at={0}
              enter="rise"
              rotate={0}
              depth={0.06}
              shadow={0}
            />
          </SceneFade>
        </Sequence>

        {/* RESOLUTION: Final statement */}
        <Sequence from={CUE.statement} durationInFrames={90} layout="none">
          <SceneFade out={80}>
            <SerifStatement
              x={540}
              y={900}
              w={900}
              at={0}
              size={78}
              backing
              words={[{ t: 'Feelings fade', hl: true }, { t: 'when felt fully' }]}
            />
          </SceneFade>
        </Sequence>

        {/* CLEAR SKY: Peace established */}
        <Sequence from={CUE.sky} durationInFrames={150} layout="none">
          <SceneFade out={140}>
            <Cutout
              src={asset('sky-clear.png')}
              x={540}
              y={800}
              w={1000}
              at={0}
              enter="fade"
              rotate={0}
              depth={-0.02}
              shadow={0}
            />
          </SceneFade>
        </Sequence>

        {/* LOOP: Return to intro state */}
        <Sequence from={CUE.loop} layout="none">
          <Cutout
            src={asset('storm-elements.png')}
            x={540}
            y={800}
            w={900}
            at={0}
            enter="fade"
            rotate={0}
            depth={0.08}
          />
          <Sequence from={40} layout="none">
            <SerifStatement
              x={540}
              y={400}
              w={900}
              at={0}
              size={76}
              words={[{ t: 'Feelings fade' }, { t: 'when felt fully', hl: true }]}
            />
          </Sequence>
        </Sequence>
      </CollageBoard>
      <Grain intensity={0.08} />
    </AbsoluteFill>
  );
};

export default Vox5Feelings;
