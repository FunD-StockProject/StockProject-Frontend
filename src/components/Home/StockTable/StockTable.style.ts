import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const StockTableContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const StockTableContent = styled.div({
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const StockTableTabContainer = styled.div({
  display: 'flex',
  gap: '8px',
  padding: '0px 8px',
});

const StockTableTabLabel = styled.label({
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

const StockTableTable = styled.table({
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

const StockTableItemSymbol = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  // minWidth: '0',

  ['>img']: {
    width: '26px',
    height: '26px',
    flexShrink: '0',
    aspectRatio: '1 / 1',
    background: 'red',
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

const StockTableItemPrice = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p&.diff']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',

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

const StockTableItemScore = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p&.diff']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
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

export {
  StockTableContainer,
  StockTableContent,
  StockTableTabContainer,
  StockTableTabLabel,
  StockTableTable,
  StockTableItemSymbol,
  StockTableItemPrice,
  StockTableItemScore,
};
