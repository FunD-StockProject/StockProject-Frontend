import styled from '@emotion/styled';
import { Globals } from '@components/Common/Common.Type';
import { media, theme, themeColor } from '@styles/themes';

const PopUpImage = styled('ul')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 0,
  listStyle: 'none',

  ['div']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'space-between',
    gap: '8px',
    flex: 1,
    height: '160px',
  },
  [media[0]]: {
    ['div']: {
      height: '120px',
    },
  },
});

const PopUpDetailWord = styled.p(
  ({
    color,
    fontSize,
    textAlign,
  }: {
    color?: themeColor;
    fontSize?: number;
    textAlign?:
      | Globals
      | '-webkit-match-parent'
      | 'center'
      | 'end'
      | 'justify'
      | 'left'
      | 'match-parent'
      | 'right'
      | 'start';
  }) => ({
    textAlign: textAlign || 'left',
    fontWeight: '700',
    fontSize: fontSize ? `${fontSize}px` : '36px',
    margin: 0,
    padding: 0,
    background: theme.colors.grayscale90,
    color: color ? theme.colors[color] : theme.colors.primary0, // 색상이 없는 경우 기본값 사용
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    lineHeight: 1.3,
    [media[0]]: {
      fontSize: fontSize ? `${(fontSize * 2) / 3}px` : '24px',
    },
  }),
);

const PopUpDetailContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  background: theme.colors.grayscale10,
  borderRadius: '8px',
  padding: '16px',
  marginTop: '12px',

  [media[0]]: {
    padding: '12px',
    marginTop: '8px',
  },
});

const PopUpDetail = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  ['span']: {
    fontSize: '14px',
    color: theme.colors.grayscale100,
  },

  [media[0]]: {
    gap: 'px',
  },
});

const PopUpDetailNumber = styled.div(({ color }: { color?: themeColor }) => ({
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '14px',
  fontWeight: '700',
  borderRadius: '4px',
  background: color ? theme.colors[color] : theme.colors.primary40,
  color: theme.colors.primary0,

  [media[0]]: {
    width: '20px', // 모바일 크기 축소
    height: '20px',
    fontSize: '12px',
  },
}));

export { PopUpImage, PopUpDetailWord, PopUpDetailContainer, PopUpDetail, PopUpDetailNumber };
