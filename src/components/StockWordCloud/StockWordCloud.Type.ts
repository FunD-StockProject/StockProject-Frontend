export interface Position {
  x: number;
  y: number;
}

export interface Size {
  w: number;
  h: number;
}

export interface WordFrequency {
  text: string;
  freq: number;
}

export interface WordCloud {
  word: string;
  freq: number;
  fontSize: number;
  position: Position;
  size: Size;
  orientation: boolean;
  color: number;
}
