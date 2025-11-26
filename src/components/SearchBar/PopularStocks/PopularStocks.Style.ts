import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const PopularStocksItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Semibold,
    color: theme.colors.sub_blue6,
  },
});

const PopularStocksItemContents = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  overflow: 'hidden',
  flexGrow: 1,

  ['>img']: {
    width: '32px',
    height: '32px',
    aspectRatio: '1 / 1',
    borderRadius: '50%',
    flexShrink: '0',
    background: theme.colors.sub_gray11,
  },

  ['>p']: {
    ...theme.font.body16Semibold,
    color: theme.colors.sub_gray1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 1,
    margin: '0',
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray7,
    flexShrink: '0',
  },
});

export { PopularStocksItem, PopularStocksItemContents };
