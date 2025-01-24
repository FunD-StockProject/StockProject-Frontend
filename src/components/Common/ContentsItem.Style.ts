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
  gap: '8px',
  alignItems: 'center',

  color: theme.colors.grayscale10,
  fontWeight: '700',
  fontSize: '32px',

  ['.btn_info']: {
    height: '0.8em',
    marginLeft: '4px',

    cursor: 'pointer',
  },

  ['svg']: {
    width: 'auto',
    height: '0.9em',

    fill: color ? theme.colors[color] : '',
  },

  [media[0]]: {
    gap: '6px',
    padding: '0 20px',

    fontSize: '24px',

    ['.btn_info']: {
      marginLeft: '0px',
    },
  },
}));

const ContentsItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  margin: '0 32px',

  [media[0]]: {
    margin: '0 0px',
    padding: '0 20px',
  },
});

export { ContentsItemContainer, ContentsItemTitle, ContentsItemContent };
