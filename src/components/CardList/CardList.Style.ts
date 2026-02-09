import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const CardListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const CardListTitle = styled.div({
  display: 'flex',
  padding: '0px 20px',
  gap: '6px',
  alignItems: 'center',

  ['>p']: {
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
      flexShrink: '0',
    },

    ['&.update-time']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray8,
      marginLeft: 'auto',
    },
  },

  ['>svg']: {
    width: '18px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray6,
    flexShrink: '0',
  },
});

export { CardListContainer, CardListTitle };
