export interface Pos {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface WordFrequency {
  word: string;
  freq: number;
}

export interface WordCloudItem {
  word: string;
  freq: number;
  fontSize: number;
  pos: Pos;
  size: Size;
  orientation: boolean;
  color: number;
}

export interface ExperimentItem {
  id: number,
  name: string,
  logo: string,
  buyPrice: number,
  buyScore: number,
  currentPrice: number,
  currentScore: number,
}
