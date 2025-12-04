export type PatternQuadrantKey = 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

export const patternQuadrantKeys: PatternQuadrantKey[] = ['top-right', 'bottom-right', 'bottom-left', 'top-left'];

export interface PatternQuadrant {
  emoji: string;
  title: string;
  description: string;
  roi: string;
}

export const patternQuadrantMap: Record<PatternQuadrantKey, PatternQuadrant> = {
  'top-right': {
    emoji: '✅',
    title: '트렌드 선점형',
    description: '인간지표 높을 때 매수',
    roi: '수익',
  },
  'bottom-right': {
    emoji: '❕',
    title: '후행 추종형',
    description: '인간지표 높을 때 매수',
    roi: '손실',
  },
  'bottom-left': {
    emoji: '📉',
    title: '역행 투자형',
    description: '인간지표 낮을 때 매수',
    roi: '손실',
  },
  'top-left': {
    emoji: '💎',
    title: '가치 선점형',
    description: '인간지표 낮을 때 매수',
    roi: '수익',
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
