import styled from '@emotion/styled';
import theme from '../../styles/themes';
import { pop } from '../../styles/keyframes';

const StockWordCloudContainer = styled.div({
  display: 'flex',
  margin: '0 48px',
  // background: theme.colors.grayscale90,
  gap: '28px',
  height: '720px',
  overflow: 'hidden',
  position: 'relative',
});

const WordContainer = styled.div(
  {
    position: 'absolute',
  },
  ({
    orientation,
    posX,
    posY,
    sizeX,
    sizeY,
  }: {
    orientation: number;
    posX: number;
    posY: number;
    sizeX: number;
    sizeY: number;
  }) => ({
    left: (!orientation ? posX : posX - sizeY / 2 + sizeX / 2) + 'px',
    top: (!orientation ? posY : posY + sizeY / 2 - sizeX / 2) + 'px',
    width: sizeX,
    height: sizeY,
  }),
);

const Word = styled.span(
  {
    position: 'absolute',
    fontFamily: 'Pretendard black',
    wordBreak: 'keep-all',
    overflow: 'clip',
    color: '#FFFFFFAA',
    animationFillMode: 'both',
    lineHeight: '1.0',
  },
  ({
    animationState,
    orientation,
    fontSize,
    colors,
    delay,
  }: {
    animationState: boolean;
    orientation: number;
    fontSize: number;
    colors: number;
    delay: number;
  }) => ({
    animation: animationState ? pop + ' .75s ease-in-out' : '',
    transform: animationState ? 'scale(1)' : 'scale(0)',
    fontSize: fontSize,
    rotate: !orientation ? '' : '90deg',
    color:
      colors == 0
        ? theme.colors.primary30
        : colors == 1
          ? theme.colors.primary40
          : colors == 2
            ? theme.colors.primary50
            : colors == 3
              ? theme.colors.primary60
              : colors == 4
                ? theme.colors.primary70
                : colors == 5
                  ? theme.colors.primary80
                  : '',
    animationDelay: animationState ? delay * 0.1 + 's' : '0s',
  }),
);

export { StockWordCloudContainer, WordContainer, Word };
