export type Globals = '-moz-initial' | 'inherit' | 'initial' | 'revert' | 'revert-layer' | 'unset';
export type ObjectFit = Globals | 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type SelfPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start';
export type AlignItems = Globals | SelfPosition | 'baseline' | 'normal' | 'stretch' | (string & {});
export type ContentDistribution = 'space-around' | 'space-between' | 'space-evenly' | 'stretch';
export type ContentPosition = 'center' | 'end' | 'flex-end' | 'flex-start' | 'start';
export type JustifyContent =
  | Globals
  | ContentDistribution
  | ContentPosition
  | 'left'
  | 'normal'
  | 'right'
  | (string & {});
export type FlexDirection = Globals | 'column' | 'column-reverse' | 'row' | 'row-reverse';
export type Width<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | '-moz-fit-content'
  | '-moz-max-content'
  | '-moz-min-content'
  | '-webkit-fit-content'
  | '-webkit-max-content'
  | 'auto'
  | 'fit-content'
  | 'intrinsic'
  | 'max-content'
  | 'min-content'
  | 'min-intrinsic'
  | (string & {});
export type Padding<TLength = string | 0> = Globals | TLength | string;
