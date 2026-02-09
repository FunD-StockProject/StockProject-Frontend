export type YMD = `${number}-${string}-${string}`;

export type DateUnit = 'D' | 'M' | 'Y';

export type YmdMeta = {
  year: number;
  month: number;
  day: number;
  ymKey: number;
  ymdKey: number;
};

export type IndexedYmd = {
  ymd: YMD;
  idx: number;
  meta: YmdMeta;
};

export type LabeledGridYmd = {
  ymd: YMD;
  idx: number;
  label: string;
};
