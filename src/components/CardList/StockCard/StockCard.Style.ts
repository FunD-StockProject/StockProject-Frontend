import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const StockCardContainer = styled.div({
  display: 'flex',
  overflow: 'auto',
  scrollSnapType: 'x mandatory',

  transition: 'background-color 0.1s ease-in-out',
  backgroundColor: theme.colors.sub_black,

  ['>div']: {
    display: 'flex',
    gap: '12px',
    padding: '0px 20px 8px',
    backgroundColor: theme.colors.sub_black,
  },

  ['::-webkit-scrollbar']: {
    height: '6px',
  },
  ['::-webkit-scrollbar-track']: {
    background: theme.colors.sub_black,
  },
  ['::-webkit-scrollbar-thumb']: {
    background: 'inherit',
    borderRadius: '4px',
  },

  ['@media (max-width: 768px)']: {
    ['>div']: {
      padding: '0px 20px',
    },

    msOverflowStyle: 'none',
    ['::-webkit-scrollbar']: {
      display: 'none',
    },
  },
});

const StockCardItem = styled.div({
  flexShrink: '0',
  display: 'flex',
  width: '300px',
  scrollSnapAlign: 'center',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
});

//
const LargeStockCardContainer = styled.div({
  flexShrink: '0',
  // display: 'block',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  scrollSnapAlign: 'center',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',

  ['>hr']: {
    border: `2px solid ${theme.colors.sub_black}`,
    margin: '0px',
  },
});

const LargeStockCardHeader = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  padding: '12px 12px 8px',
  overflow: 'hidden',

  ['>p']: {
    ...theme.font.title20Semibold,
    color: theme.colors.sub_gray3,
    margin: '0px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  ['>img']: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    flexShrink: '0',
  },
});

const LargeStockCardContent = styled.div({
  display: 'flex',
  padding: '16px 12px 12px',
  gap: '12px',

  ['>img']: {
    width: '102px',
    height: '92px',
    borderRadius: '4px',
  },
});

const LargeStockCardContentTextContainer = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',

    ['>p']: {
      margin: '0px',

      ['&.title']: {
        ...theme.font.body14Medium,
        color: theme.colors.sub_gray7,
      },

      ['&.content']: {
        ...theme.font.title20Semibold,
        color: theme.colors.sub_gray5,
      },
    },
  },
});

const SmallStockCardContainer = styled.div({
  flexShrink: '0',
  display: 'flex',
  width: '100%',
  scrollSnapAlign: 'center',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  padding: '12px',
  gap: '16px',
  boxSizing: 'border-box',

  ['>img']: {
    width: '102px',
    height: '92px',
    borderRadius: '4px',
  },
});

const SmallStockCardContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minWidth: '0px',
});

const SmallStockCardContentTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',

  ['>p']: {
    margin: '0px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    ...theme.font.body18Semibold,
    color: theme.colors.primary0,
  },
});

const SmallStockCardContentScore = styled.div(
  ({ delta, isNew }: { delta: number; isNew: boolean }) => ({
    ['>span']: {
      color: isNew ? theme.colors.yellow : (deltaScoreToColor(delta) ?? theme.colors.sub_gray7),
    },
  }),
  {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray4,

    display: 'flex',
    gap: '4px',
    alignItems: 'center',

    ['>span']: {
      ...theme.font.body14Semibold,
    },
  },
);

const SmallStockCardContentKeywords = styled.div({
  display: 'flex',
  gap: '10px',

  ['>p']: {
    margin: '0px',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
  },
});

export {
  StockCardContainer,
  StockCardItem,
  LargeStockCardContainer,
  LargeStockCardHeader,
  LargeStockCardContent,
  LargeStockCardContentTextContainer,
  SmallStockCardContainer,
  SmallStockCardContent,
  SmallStockCardContentTitle,
  SmallStockCardContentScore,
  SmallStockCardContentKeywords,
};
