import { theme } from '@styles/themes';

export type ReportClassKey = 'worst' | 'bad' | 'normal' | 'good' | 'best';

export interface ReportClassType {
  icon: string;
  title: string;
  background: string;
  color: string;
  min: number;
  max: number;
}

export const reportClassMap: Record<ReportClassKey, ReportClassType> = {
  worst: {
    icon: '😱',
    title: '완전 인간 아님',
    color: theme.colors.sub_white,
    background: theme.colors.sub_red,
    min: 0,
    max: 20,
  },
  bad: {
    icon: '🙁',
    title: '인간 아님',
    color: theme.colors.sub_white,
    background: theme.colors.sub_red,
    min: 20,
    max: 40,
  },
  normal: {
    icon: '😐',
    title: '평범 인간',
    color: theme.colors.sub_white,
    background: theme.colors.sub_gray9,
    min: 40,
    max: 60,
  },
  good: {
    icon: '☺️',
    title: '인간 맞음',
    color: theme.colors.sub_black,
    background: theme.colors.sub_gray1,
    min: 60,
    max: 80,
  },
  best: {
    icon: '😆',
    title: '인간 완전 맞음',
    color: theme.colors.sub_black,
    background: theme.colors.sub_white,
    min: 80,
    max: 100,
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
