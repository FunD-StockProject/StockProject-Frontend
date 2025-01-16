import styled from '@emotion/styled';
import { media, theme, themeColor } from '@styles/themes';

const ContentsItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [media[0]]: {
    gap: '18px',
  },
});

const ContentsItemTitle = styled.div(({ color }: { color?: themeColor }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '32px',
  fontWeight: '700',
  color: theme.colors.grayscale10,
  ['svg']: {
    height: '0.9em',
    width: 'auto',
    fill: color ? theme.colors[color] : '',
  },
  ['.btn_info']: {
    marginLeft: '4px',
    height: '0.8em',
    cursor: 'pointer',
  },
  [media[0]]: {
    padding: '0 20px',
    fontSize: '24px',
    gap: '6px',
    ['.btn_info']: {
      marginLeft: '0px',
    },
  },
}));

const ContentsItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 32px',
  gap: '18px',
  [media[0]]: {
    margin: '0 0px',
    padding: '0 20px',
  },
});

export { ContentsItemContainer, ContentsItemTitle, ContentsItemContent };
