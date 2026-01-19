import { css } from '@emotion/react';
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

const ContentsItemTitle = styled.div<{ color?: themeColor }>(({ color }) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    color: theme.colors.grayscale10,
    ...theme.font.title20Semibold,

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

      ['.btn_info']: {
        marginLeft: '0px',
      },
    },
  }),
);

const ContentsItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  margin: '0 32px',

  [media[0]]: {
    margin: '0 0px',
  },
});

export const DetailText = styled.div({
  ...theme.font.detail12Medium,
  color: theme.colors.sub_gray6,
});

export const TitleDetailText = styled.div({
  ...theme.font.body14Medium,
  color: theme.colors.sub_gray8,
});

export const ContentsItemTitleSeparator = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
});

export { ContentsItemContainer, ContentsItemTitle, ContentsItemContent };
