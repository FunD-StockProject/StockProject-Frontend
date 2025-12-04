export type PatternQuadrantKey = 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';

export const patternQuadrantKeys: PatternQuadrantKey[] = ['top-right', 'bottom-right', 'bottom-left', 'top-left'];

export interface PatternQuadrant {
  key: PatternQuadrantKey;
  title: string;
  description: string;
  roi: string;
}

export const patternQuadrantMap: Record<PatternQuadrantKey, { title: string; description: string; roi: string }> = {
  'top-right': {
    title: '✅ 트렌드 선점형',
    description: '인간지표 높을 때 매수',
    roi: '수익',
  },
  'bottom-right': {
    title: '❕ 후행 추종형',
    description: '인간지표 높을 때 매수',
    roi: '손실',
  },
  'bottom-left': {
    title: '📉 역행 투자형',
    description: '인간지표 낮을 때 매수',
    roi: '손실',
  },
  'top-left': {
    title: '💎 가치 선점형',
    description: '인간지표 낮을 때 매수',
    roi: '수익',
  },
};

export const patternQuadrantList: PatternQuadrant[] = [
  {
    key: 'top-right',
    title: '✅ 트렌드 선점형',
    description: '인간지표 높을 때 매수',
    roi: '수익',
  },
  {
    key: 'bottom-right',
    title: '❕ 후행 추종형',
    description: '인간지표 높을 때 매수',
    roi: '손실',
  },
  {
    key: 'bottom-left',
    title: '📉 역행 투자형',
    description: '인간지표 낮을 때 매수',
    roi: '손실',
  },
  {
    key: 'top-left',
    title: '💎 가치 선점형',
    description: '인간지표 낮을 때 매수',
    roi: '수익',
  },
];
