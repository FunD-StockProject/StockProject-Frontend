import styled from '@emotion/styled';
import theme, { themeColor } from '../styles/themes';

interface FlexDivProps {
  flexDirection?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
  alignItems?: 'center' | 'end' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'start' | 'baseline' | 'normal' | 'stretch';
  justifyContent?:
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'stretch'
    | 'center'
    | 'end'
    | 'flex-end'
    | 'flex-start'
    | 'start'
    | 'left'
    | 'normal'
    | 'right';
  padding?: string;
  width?: string;
  gap?: string;
}

const FlexDiv = styled.div(
  ({ flexDirection = 'row', alignItems = 'start', justifyContent = 'start', padding = '0', width = 'auto', gap = '0' }: FlexDivProps) => ({
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: alignItems,
    justifyContent: justifyContent,
    padding: padding,
    width: width,
    gap: gap,
  }),
);

interface ButtonDivProps {
  padding?: string;
  background?: themeColor;
  width?: string;
  height?: string;
  radius?: string;
}

const ButtonDiv = styled.div(({ padding = '0', background, width = 'auto', height = 'auto', radius = 'auto' }: ButtonDivProps) => ({
  padding: padding,
  background: theme.colors[background ?? 'transparent'],
  cursor: 'pointer',
  width: width,
  height: height,
  borderRadius: radius,
}));

const RelativeDiv = styled.div({
  position: 'relative',
});

interface AbsoluteDivProps {
  width?: string;
  height?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

const AbsoluteDiv = styled.div(
  { position: 'absolute' },
  ({ width = 'auto', height = 'auto', top = 'auto', bottom = 'auto', left = 'auto', right = 'auto' }: AbsoluteDivProps) => ({
    width: width,
    height: height,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
  }),
);

interface ImgDivProps {
  width?: string;
  height?: string;
}

const ImgDiv = styled.img(({ width = 'auto', height = 'auto' }: ImgDivProps) => ({
  width: width,
  height: height,
}));

export { FlexDiv, ButtonDiv, RelativeDiv, AbsoluteDiv, ImgDiv };
