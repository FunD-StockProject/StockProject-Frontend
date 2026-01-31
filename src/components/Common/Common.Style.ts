import styled from '@emotion/styled';
import { theme } from '../../styles/themes';
import { AbsoluteDivProps, ButtonDivProps, FlexDivProps, ImgDivProps } from './Common.Props';

const FlexDiv = styled.div(
  ({
    flexDirection = 'row',
    alignItems = 'normal',
    justifyContent = 'normal',
    padding = '0',
    width = 'auto',
    gap = '0',
  }: FlexDivProps) => ({
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: alignItems,
    justifyContent: justifyContent,
    padding: padding,
    width: width,
    gap: gap,
  }),
);

const ButtonDiv = styled.div(
  ({ gap = '0', padding = '0', background, width = 'auto', height = 'auto', radius = 'auto' }: ButtonDivProps) => ({
    display: 'flex',
    padding: padding,
    background: theme.colors[background ?? 'transparent'],
    cursor: 'pointer',
    gap: gap,
    width: width,
    height: height,
    borderRadius: radius,
  }),
);

const RelativeDiv = styled.div({
  position: 'relative',
});

const AbsoluteDiv = styled.div(
  { position: 'absolute' },
  ({
    width = 'auto',
    height = 'auto',
    top = 'auto',
    bottom = 'auto',
    left = 'auto',
    right = 'auto',
  }: AbsoluteDivProps) => ({
    width: width,
    height: height,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
  }),
);

const ImgDiv = styled.img(({ width = 'auto', height = 'auto', objectFit = 'contain' }: ImgDivProps) => ({
  width: width,
  height: height,
  objectFit: objectFit,
}));

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',

  ['>img']: {
    objectFit: 'contain',
    objectPosition: 'center',

    width: '100%',
    height: '100%',
  },
});

export { FlexDiv, ButtonDiv, RelativeDiv, AbsoluteDiv, ImgDiv, Container };
