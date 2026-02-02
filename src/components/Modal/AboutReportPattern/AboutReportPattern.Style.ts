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
  gap: '16px',
  padding: '14px 10px',
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
  },

  ['>span.divider']: {
    width: '100%',
    height: '1px',
    background: theme.colors.sub_gray10,
  },
});

const HeaderContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const HeaderContentsItem = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',

  ['>span']: {
    width: '72px',
    padding: '4px',
    borderRadius: '999px',
    background: theme.colors.sub_gray11,
    ...theme.font.body14Semibold,
    textAlign: 'center',

    ['&.roi']: {
      color: theme.colors.sub_blue6,
    },
    ['&.score']: {
      color: theme.colors.sub_red,
    },
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',

    ['>div']: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',

      ['>span']: {
        ...theme.font.body14Medium,
        color: theme.colors.sub_gray5,
        whiteSpace: 'nowrap',
        ['&.condition']: {
          width: '72px',
        },
      },
    },
  },
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
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

export { Container, Header, HeaderContents, HeaderContentsItem, Content };
