import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

const ContentsItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  [media[0]]: {
    gap: '12px',
  },
});

const ContentsItemTitle = styled.div(({ color }: { color?: themeColor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '40px',
  fontWeight: '700',
  color: theme.colors.grayscale10,
  ['svg']: {
    height: '36px',
    width: 'auto',
    fill: color ? theme.colors[color] : '',
  },
  ['.btn_info']: {
    marginLeft: '8px',
    height: '32px',
    cursor: 'pointer',
  },
  [media[0]]: {
    fontSize: '19px',
    gap: '6px',
    ['svg']: {
      height: '17px',
    },
    ['.btn_info']: {
      marginLeft: '4px',
      height: '19px',
    },
  },
}));

const ContentsItemContent = styled.div({
  margin: '0 18px',
  [media[0]]: {
    margin: '0 0px',
  },
});

export { ContentsItemContainer, ContentsItemTitle, ContentsItemContent };
