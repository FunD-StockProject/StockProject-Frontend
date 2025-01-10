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
