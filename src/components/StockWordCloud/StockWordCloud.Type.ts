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

export interface WordCloudLayout {
  word: string;
  freq: number;
  fontSize: number;
  position: Position;
  size: Size;
  orientation: boolean;
  color: string;
}
