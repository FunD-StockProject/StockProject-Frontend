import { themeColor } from '../../styles/themes';
import {
  AlignItems,
  FlexDirection,
  JustifyContent,
  ObjectFit,
  Padding,
  Width,
} from './Common.Type';

export interface FlexDivProps {
  flexDirection?: FlexDirection;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  padding?: Padding;
  width?: Width;
  gap?: string;
}

export interface ButtonDivProps {
  padding?: string;
  background?: themeColor;
  width?: Width;
  height?: string;
  radius?: string;
  gap?: string;
}

export interface AbsoluteDivProps {
  width?: Width;
  height?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface ImgDivProps {
  width?: Width;
  height?: string;
  objectFit?: ObjectFit;
}
