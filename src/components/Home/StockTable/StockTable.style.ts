import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

const StockTableContainer = styled.div({
  boxSizing: 'border-box',
  width: '100%',

  [media[0]]: {
    padding: '0 20px',
  },
});

const StockTableTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: 0,
  padding: '10px 0',

  color: theme.colors.grayscale10,
  fontWeight: '700',
  fontSize: '32px',
  fontFamily: 'Pretendard',
  lineHeight: '1.5',

  ['div']: {
    display: 'flex',
    alignItems: 'center',
  },

  ['span']: {
    color: theme.colors.grayscale60,
    fontWeight: '500',
    fontSize: '15px',
  },

  ['svg']: {
    width: 'auto',
    height: '28px',
    marginLeft: '8px',
  },

  [media[0]]: {
    padding: '5px 0',

    fontSize: '24px',

    ['span']: {
      fontSize: '11px',
    },

    ['svg']: {
      height: '0.9em',
    },
  },
});

const StyledTabMenu = styled.ul({
  display: 'flex',
  alignItems: 'center',
  margin: '0',
  padding: 0,

  backgroundColor: theme.colors.primary100,

  '.focused': {
    fontWeight: '700',

    backgroundColor: theme.colors.grayscale100,
  },

  '.submenu': {
    display: 'flex',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '8px 12px',

    color: theme.colors.primary0,
    fontWeight: '500',

    backgroundColor: theme.colors.primary100,
    borderRadius: '8px',
    cursor: 'pointer',
  },

  [media[0]]: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const HeaderItem = styled.div({
  flex: 1,

  textAlign: 'center',
});

const TableHeaderContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 0',

  color: theme.colors.grayscale60,
  fontWeight: 500,
  fontSize: '16px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  lineHeight: '1.5',

  [media[0]]: {
    padding: '5px 0',

    fontSize: '12px',
  },
});

const TableRow = styled.div({
  display: 'grid',
  gridTemplateColumns: '33% 33% 33%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 0',

  color: theme.colors.primary0,

  borderBottom: `1px solid ${theme.colors.grayscale90}`,
  cursor: 'pointer',

  ':last-child': {
    borderBottom: 'none',
  },
});

const StockInfo = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  textAlign: 'center',
});

const StockLogo = styled.div({
  width: '1.5em',
  height: '1.5em',

  borderRadius: '64px',
});

const StockName = styled.div({
  overflow: 'hidden',

  textOverflow: 'ellipsis',
  wordBreak: 'keep-all',
});

const StockData = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  gap: '0',
  justifyContent: 'center',

  color: theme.colors.primary0,
  fontWeight: 500,
  fontSize: '17px',
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  lineHeight: '1.5',
  textAlign: 'center',
});

const DeltaScore = styled.span(({ delta }: { delta: number }) => ({
  gap: '8px',

  color: deltaScoreToColor(delta),
  fontSize: '13px',
}));

export {
  StockTableContainer,
  StockInfo,
  StockName,
  StockTableTitle,
  StyledTabMenu,
  TableHeaderContainer,
  HeaderItem,
  TableRow,
  StockLogo,
  StockData,
  DeltaScore,
};
