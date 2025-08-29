import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const RecentStocksItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray9,
    flexShrink: '0',
  },
});

const RecentStocksItemContents = styled.div({
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  gap: '8px',
  overflow: 'hidden',

  ['>p']: {
    margin: '0',

    ['&.country']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
      flexShrink: '0',
    },

    ['&.symbolName']: {
      ...theme.font.body16Semibold,
      color: theme.colors.sub_gray1,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexGrow: 1,
    },
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray9,
    flexShrink: '0',
  },
});

export { RecentStocksItem, RecentStocksItemContents };
