import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const RankingContent = styled.div({
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  position: 'relative',
  minHeight: '446px',
});

const RankingTabContainer = styled.div({
  display: 'flex',
  gap: '8px',
  padding: '0px 8px',
});

const RankingTabLabel = styled.label({
  display: 'flex',
  gap: '8px',
  width: '100%',

  ['>input']: {
    display: 'none',
  },

  ['>span']: {
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray6,
    background: theme.colors.sub_gray11,
    textAlign: 'center',
    width: '100%',
    padding: '8px 0px',
    borderRadius: '8px',
  },

  ['> input[type="radio"]:checked']: {
    ['~span']: {
      color: theme.colors.sub_white,
      background: theme.colors.sub_blue6,
    },
  },
});

const RankingTable = styled.table({
  width: '100%',
  borderCollapse: 'collapse',

  ['>thead>tr, >tbody>tr']: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
  },

  ['>thead>tr>th']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
  },
});

const RankingStockContainer = styled.tr({
  padding: '9px 0',

  ['&:not(:last-of-type)']: {
    borderBottom: `1px solid ${theme.colors.grayscale90}`,
  },
});

const RankingStockSymbol = styled.td({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '0',

  ['>img']: {
    width: '26px',
    height: '26px',
    flexShrink: '0',
    aspectRatio: '1 / 1',
    borderRadius: '50%',
  },

  ['>p']: {
    ...theme.font.body14Medium,
    color: theme.colors.primary0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: '0',
  },
});

const RankingStockPrice = styled.td(
  ({ delta }: { delta: number }) => ({
    ['>p.diff']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    ['>p']: {
      margin: '0',

      ['&.price']: {
        ...theme.font.body14Medium,
        color: theme.colors.primary0,
      },

      ['&.diff']: {
        ...theme.font.detail12Medium,
      },
    },
  },
);

const RankingStockScore = styled.td(
  ({ delta }: { delta: number }) => ({
    ['>p.diff']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',

    ['>p']: {
      margin: '0',

      ['&.score']: {
        ...theme.font.body16Semibold,
        color: theme.colors.primary0,
      },

      ['&.diff']: {
        ...theme.font.detail12Medium,
      },
    },
  },
);

const RankingLoading = styled.div({
  position: 'absolute',
  bottom: '0',
  top: '64px',
  left: '0',
  right: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px',

  ['>img']: {
    width: '128px',
    aspectRatio: '1 / 1',
  },
});

export {
  RankingContent,
  RankingTabContainer,
  RankingTabLabel,
  RankingTable,
  RankingStockContainer,
  RankingStockSymbol,
  RankingStockPrice,
  RankingStockScore,
  RankingLoading,
};
