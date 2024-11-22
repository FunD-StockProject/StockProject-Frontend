import styled from '@emotion/styled';
import theme from '../../styles/themes';
import { pop } from '../../styles/keyframes';

const WordContainer = styled.div(
  {
    position: 'absolute',
  },
  ({ orientation, posX, posY, sizeX, sizeY }: { orientation: number; posX: number; posY: number; sizeX: number; sizeY: number }) => ({
    left: (!orientation ? posX : posX - sizeY / 2 + sizeX / 2) + 'px',
    top: (!orientation ? posY : posY + sizeY / 2 - sizeX / 2) + 'px',
  }),
);

const Word = styled.span(
  {
    position: 'absolute',
    fontFamily: 'Pretendard',
    fontWeight: '900',
    wordBreak: 'keep-all',
    overflow: 'clip',
    color: '#FFFFFFAA',
    animation: pop + ' .75s ease-in-out',
    animationFillMode: 'both',
  },
  ({ orientation, fontSize, colors, delay }: { orientation: number; fontSize: number; colors: number; delay: number }) => ({
    fontSize: fontSize,
    lineHeight: 1,
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
    animationDelay: delay / 10 + 's',
  }),
);

export { WordContainer, Word };
