import { theme } from '@styles/themes';

export type ReportClassKey = 'worst' | 'bad' | 'normal' | 'good' | 'best';

export interface ReportClassType {
  emoji: string;
  title: string;
  description: React.ReactNode;
  color: keyof typeof theme.colors;
  min: number;
  max: number;
  range: string;
}

export const reportClassMap: Record<ReportClassKey, ReportClassType> = {
  worst: {
    emoji: '😱',
    title: '완전 인간 아님',
    description: (
      <>
        성공률이 <b>0~20%</b>인 유형을 말해요
        <br />
        유저 중 N%가 이에 속한답니다
      </>
    ),
    color: 'sub_red',
    min: 0,
    max: 20,
    range: '0~20%',
  },
  bad: {
    emoji: '🙁',
    title: '인간 아님',
    description: (
      <>
        성공률이 <b>20~40%</b>인 유형을 말해요 <br />
        유저 중 N%가 이에 속한답니다
      </>
    ),
    color: 'sub_red',
    min: 20,
    max: 40,
    range: '20~40%',
  },
  normal: {
    emoji: '😐',
    title: '평범 인간',
    description: (
      <>
        성공률이 <b>40~60%</b>인 유형을 말해요
        <br />
        유저 중 N%가 이에 속한답니다
      </>
    ),
    color: 'sub_gray9',
    min: 40,
    max: 60,
    range: '40~60%',
  },
  good: {
    emoji: '☺️',
    title: '인간 맞음',
    description: (
      <>
        성공률이 <b>60~80%</b>인 유형을 말해요
        <br />
        유저 중 N%가 이에 속한답니다
      </>
    ),
    color: 'sub_gray1',
    min: 60,
    max: 80,
    range: '60~80%',
  },
  best: {
    emoji: '😆',
    title: '인간 완전 맞음',
    description: (
      <>
        성공률이 <b>80%이상</b>인 유형을 말해요
        <br />
        유저 중 N%가 이에 속한답니다
      </>
    ),
    color: 'sub_white',
    min: 80,
    max: Infinity,
    range: '80% 이상',
  },
};

export const reportClassList: ({
  key: ReportClassKey;
} & ReportClassType)[] = Object.entries(reportClassMap).map(
  ([key, value]) =>
    ({
      key,
      ...value,
    }) as { key: ReportClassKey } & ReportClassType,
);
