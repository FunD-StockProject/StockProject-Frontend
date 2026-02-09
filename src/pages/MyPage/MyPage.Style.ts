import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const MyPageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
});

const MyPageContents = styled.div({
  display: 'flex',
  flexDirection: 'column',

  ['&>:not(:last-of-type)']: {
    borderBottom: `4px solid ${theme.colors.sub_gray11}`,
  },
});

// Detail Container

const MyPageDetailContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px 20px',
  gap: '7px',
});

const MyPageDetailTitle = styled.button({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  padding: '4px 0px',
  outline: 'none',
  overflow: 'hidden',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    ['>span']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray5,
    },
  },

  ['>svg']: {
    flexShrink: '0',
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
    stroke: theme.colors.sub_gray7,
  },
});

const MyPageDetailContents = styled.div({
  display: 'flex',
  gap: '12px',
});

const MyPageDetailItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  padding: '12px',
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  width: '100%',
  alignItems: 'center',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_white,
    },

    ['&.content']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray5,
    },
  },
});

// Default Container

const MyPageDefaultContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const MyPageDefaultItem = styled.button({
  background: 'none',
  border: 'none',
  padding: '16px 28px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  ...theme.font.body18Medium,
  color: theme.colors.sub_gray5,

  ['>svg']: {
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
    stroke: theme.colors.sub_gray7,
  },

  ['&.sub']: {
    color: theme.colors.sub_gray7,
  },
});

// SNS Container

const MyPageSNSContainer = styled.div({
  display: 'flex',
  padding: '24px 28px',
  gap: '20px',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: '#3457FD',
  },
});

export {
  MyPageContainer,
  MyPageContents,
  MyPageDetailContainer,
  MyPageDetailTitle,
  MyPageDetailContents,
  MyPageDetailItem,
  MyPageDefaultContainer,
  MyPageDefaultItem,
  MyPageSNSContainer,
};
