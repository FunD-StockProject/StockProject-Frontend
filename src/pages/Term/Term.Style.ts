import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const TermContainer = styled.div({
  background: theme.colors.sub_black,
});

const TermContents = styled.div({
  padding: '40px 20px 96px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Semibold,
    color: theme.colors.sub_gray2,
  },
});

const TermListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});

const TermListItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const TermListItemTitle = styled.p({
  margin: '0',
  ...theme.font.body18Medium,
  color: theme.colors.sub_gray3,
});

const TermListItemContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  whiteSpace: 'pre-line',

  ...theme.font.body16Medium,
  color: theme.colors.sub_gray5,
});

const TermButtonContainer = styled.div({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '28px 20px',
  boxSizing: 'border-box',
  background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0, ${theme.colors.sub_black} 50%)`,

  ['>button']: {
    width: '100%',
  },
});

//

const TermListOl = styled.ol(
  ({ listStyle }: { listStyle?: string }) => ({
    listStyleType: listStyle ?? 'decimal',
  }),
  {
    paddingLeft: '20px',
  },
);

export {
  TermContainer,
  TermContents,
  TermListContainer,
  TermListItemContainer,
  TermListItemTitle,
  TermListItemContent,
  TermButtonContainer,
  TermListOl,
};
