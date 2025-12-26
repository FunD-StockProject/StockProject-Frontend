export type PatternQuadrantKey = 'trend-preemptive' | 'lagging-follower' | 'reverse-investor' | 'value-preemptive';

export const patternQuadrantKeys: PatternQuadrantKey[] = [
  'trend-preemptive',
  'lagging-follower',
  'reverse-investor',
  'value-preemptive',
];

export interface PatternQuadrant {
  emoji: string;
  title: string;
  score: string;
  roi: string;
  description: React.ReactElement;
}

export const patternQuadrantMap: Record<PatternQuadrantKey, PatternQuadrant> = {
  'trend-preemptive': {
    emoji: '✅',
    title: '트렌드 선점형',
    score: '인간지표 높을 때 매수',
    roi: '수익',
    description: (
      <>
        투자자들의 관심도가 높을 때 매수하여 수익을 보는 투자 패턴 <br />= 트렌드 형성 시점에 선제적으로 대응하는 투자
        성향을 보이고 있네요!
      </>
    ),
  },
  'lagging-follower': {
    emoji: '❕',
    title: '후행 추종형',
    score: '인간지표 높을 때 매수',
    roi: '손실',
    description: (
      <>
        투자자들의 관심도가 높을 때 매수하여 손실을 보는 투자 패턴 <br />= 과열 국면에서 진입해 변동성 영향을 크게 받는
        투자 성향을 보이고 있네요!
      </>
    ),
  },
  'reverse-investor': {
    emoji: '📉',
    title: '역행 투자형',
    score: '인간지표 낮을 때 매수',
    roi: '손실',
    description: (
      <>
        투자자들의 관심도가 낮을 때 매수하여 손실을 보는 투자 패턴 <br />
        =진입 시점하는 타이밍이 시장 흐름과 맞지 않는 경우가 나타나고 있네요!
      </>
    ),
  },
  'value-preemptive': {
    emoji: '💎',
    title: '가치 선점형',
    score: '인간지표 낮을 때 매수',
    roi: '수익',
    description: (
      <>
        투자자들의 관심도가 낮을 때 매수하여 수익을 보는 투자 패턴 <br />
        =저평가 구간에서 기회를 선점하는 투자 성향을 보이고 있네요!
      </>
    ),
  },
};

export const patternQuadrantList: ({
  key: PatternQuadrantKey;
} & PatternQuadrant)[] = Object.entries(patternQuadrantMap).map(
  ([key, value]) =>
    ({
      key,
      ...value,
    }) as { key: PatternQuadrantKey } & PatternQuadrant,
);
