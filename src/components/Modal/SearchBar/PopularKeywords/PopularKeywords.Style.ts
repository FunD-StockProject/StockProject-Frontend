import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Wrapper = styled.div({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  ['>p']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0 20px',
  },
});

const PopularKeywordsContainer = styled.div({
  display: 'flex',
  padding: '0 20px',
  overflow: 'auto',
  gap: '8px',

  msOverflowStyle: 'none',
  ['::-webkit-scrollbar']: {
    display: 'none',
  },

  ['>span']: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    flexShrink: '0',
    padding: '8px 16px',
    borderRadius: '999px',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray1,
    border: `1px solid ${theme.colors.sub_gray9}`,
  },
});

export { Wrapper, PopularKeywordsContainer };
