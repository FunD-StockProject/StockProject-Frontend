import styled from '@emotion/styled';
import { pop } from '@styles/keyframes';
import { media, theme, themeColor } from '@styles/themes';

const WordColors: themeColor[] = ['primary30', 'primary40', 'primary50', 'primary60', 'primary70', 'primary80'];

const StockWordCloudContainer = styled.div({
  height: '720px',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '24px',
  [media[0]]: {
    gap: '12px',
    height: '480px',
    borderRadius: '12px',
  },
});

const WordCloudTestText = styled.span({
  fontSize: '100px',
  position: 'absolute',
  lineHeight: '1',
  color: theme.colors.transparent,
});

const WordContainer = styled.div(
  {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'left top',
    userSelect: 'none',
    cursor: 'default',
  },
  ({
    posX,
    posY,
    sizeX,
    sizeY,
    fontSize,
  }: {
    posX: number;
    posY: number;
    sizeX: number;
    sizeY: number;
    fontSize: number;
  }) => ({
    left: posX,
    top: posY,
    transform: `scale(${fontSize / 100}) `,
    width: (sizeX * 100) / fontSize,
    height: (sizeY * 100) / fontSize,
  }),
);

const Word = styled.span(
  {
    position: 'absolute',
    fontWeight: '900',
    wordBreak: 'keep-all',
    overflow: 'clip',
    color: '#FFFA',
    animationFillMode: 'both',
    lineHeight: '1.0',
    fontSize: '100px',
    transform: 'scale(1)',
    fontFamily: 'PretendardBlack',
  },
  ({ orientation, colors }: { orientation: number; colors: number }) => ({
    animation: pop + ' .75s ease-in-out',
    rotate: !orientation ? '' : '90deg',
    color: theme.colors[WordColors[colors]],
  }),
);

export { StockWordCloudContainer, WordCloudTestText, WordContainer, Word };
