import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const Header = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '14px 10px',
  borderBottom: `1px solid ${theme.colors.sub_gray10}`,
  margin: '0 20px',

  ['>p']: {
    margin: '0',
    wordBreak: 'keep-all',

    ['&.title']: {
      ...theme.font.body18Semibold,
      color: theme.colors.sub_gray1,

      ['>svg']: {
        width: '24px',
        height: 'auto',
        aspectRatio: '1 / 1',
        fill: theme.colors.sub_white,
        flexShrink: '0',
        verticalAlign: 'middle',
      },
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray7,
    },
  },
});

const TabContainer = styled.div({
  display: 'flex',
  gap: '16px',
  overflow: 'auto',
  padding: '0 20px',

  msOverflowStyle: 'none',
  ['&::-webkit-scrollbar']: {
    display: 'none',
  },
});

const TabItem = styled.span(
  ({ isSelected }: { isSelected?: boolean }) => ({
    background: isSelected ? theme.colors.sub_blue6 : theme.colors.sub_gray10,
    color: isSelected ? theme.colors.sub_white : theme.colors.sub_gray6,
  }),
  {
    position: 'relative',
    ...theme.font.body14Medium,
    whiteSpace: 'nowrap',
    padding: '8px 16px',
    borderRadius: '999px',
  },
);

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 10px 12px',
  margin: '0 20px',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  gap: '20px',

  ['>span.divider']: {
    width: '100%',
    height: '1px',
    background: theme.colors.sub_gray10,
  },
});

const ContentHeader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '0 8px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_gray2,
    },
    ['&.description']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray5,
      lineHeight: '175%',
      whiteSpace: 'pre-line',
    },
  },
});

export { Container, Header, TabContainer, TabItem, Content, ContentHeader };
