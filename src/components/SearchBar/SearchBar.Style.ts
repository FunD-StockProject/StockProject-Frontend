import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const SearchBarLayout = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0)',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden auto ',
});

const SearchBarHeaderContainer = styled.div({
  paddingBottom: '8px',
  borderBottom: `4px solid ${theme.colors.sub_gray11}`,
});

const SearchBarHeaderContents = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 20px',
  gap: '12px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray5,
  },

  ['>p']: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },
});

const SearchBarContainer = styled.div({
  padding: '20px',
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '45px',
});

const SearchBarContents = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const SearchBarSelectBox = styled.div({
  position: 'relative',
  flexShrink: '0',

  ['>label']: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: `1.5px solid transparent`,
    background: theme.colors.sub_gray11,

    ...theme.font.body16Medium,

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    [':focus']: {
      borderColor: theme.colors.sub_gray7,
      ['>svg']: {
        transform: 'rotate(180deg);',
      },

      ['+ul']: {
        display: 'block',
        borderColor: theme.colors.sub_gray7,
      },
    },
  },

  ['>ul']: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    left: '0',
    listStyle: 'none',
    padding: '0',
    margin: '8px 0 0',
    width: '100%',
    zIndex: '1',
    border: `1.5px solid ${theme.colors.sub_gray11}`,
    borderRadius: '8px',
    background: theme.colors.sub_gray11,

    ['>li']: {
      padding: '12px 14px',
      ...theme.font.body16Medium,
      cursor: 'pointer',
    },
  },
});

const SearchBarInput = styled.label({
  display: 'flex',
  background: theme.colors.sub_gray11,
  borderRadius: '6px',
  padding: '10px 16px',
  flexGrow: 1,
  minWidth: '0',

  ['>input']: {
    flexGrow: '1',
    background: 'none',
    border: 'none',
    outline: 'none',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray2,
    minWidth: '0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    ['::placeholder']: {
      color: theme.colors.sub_gray8,
    },

    ['&:focus']: {
      ['::placeholder']: {
        color: 'transparent',
      },
    },
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray8,
    flexShrink: '0',
  },
});

const SearchBarItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

const SearchBarItemTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ...theme.font.body18Semibold,
  color: theme.colors.sub_white,

  ['>p']: {
    margin: '0',

    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,

    ['>b']: {
      flexShrink: '0',
      ...theme.font.body14Semibold,
      color: theme.colors.sub_gray3,
      marginRight: '4px',
    },
  },
});

const SearchBarItemContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export {
  SearchBarLayout,
  SearchBarHeaderContainer,
  SearchBarHeaderContents,
  SearchBarContainer,
  SearchBarContents,
  SearchBarSelectBox,
  SearchBarInput,
  SearchBarItemContainer,
  SearchBarItemTitle,
  SearchBarItemContents,
};
