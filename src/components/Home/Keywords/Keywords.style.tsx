import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const KeywordsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const KeywordsGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr)',
  rowGap: '12px',
  columnGap: '8px',
  padding: '0 20px',
});

const KeywordItem = styled.div({
  minWidth: '0',
  overflow: 'hidden',
  padding: '12px',
  backgroundColor: theme.colors.sub_gray11,
  borderRadius: '8px',

  ['>p']: {
    margin: '0',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textAlign: 'center',
    ...theme.font.body16Semibold,
  },
});

export { KeywordsContainer, KeywordsGrid, KeywordItem };
