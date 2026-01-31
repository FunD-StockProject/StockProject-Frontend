import styled from '@emotion/styled';
import { theme } from '@styles/themes';

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
    ...theme.font.body16Semibold,
    color: theme.colors.sub_white,
    margin: '0',
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
});

export { KeywordsGrid, KeywordItem };
