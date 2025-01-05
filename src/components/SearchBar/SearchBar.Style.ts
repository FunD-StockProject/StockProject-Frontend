import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';
import { SearchBarActiveProps } from './SearchBar.Props';

const SearchBarLayout = styled.div({
  position: 'relative',
  height: '200px',
  [media[0]]: {
    height: '150px',
  },
});

const SearchBarLayer = styled.div({
  position: 'absolute',
  zIndex: '10',
  width: '100%',
  top: '0px',
});

const SearchBarContainer = styled.div(
  {
    display: 'flex',
    padding: '12px',
    gap: '12px',
    fontWeight: '700',
    fontSize: '32px',
    color: theme.colors.primary5,
    flexDirection: 'column',
    lineHeight: '1',
    background: theme.colors.primary100,

    [media[0]]: {
      gap: '12px',
      padding: '18px 24px',
      fontSize: '25px',
    },
  },
  (props: SearchBarActiveProps) => ({
    borderRadius: '8px',
    [media[0]]: {
      borderRadius: '8px',
    },
  }),
);

const SearchBarSelectBox = styled.div(
  {
    position: 'relative',
    display: 'flex',
    width: '50%',
    label: {
      fontSize: '17px',
      borderRadius: '8px',
      padding: '18px',
      alignContent: 'center',
      width: '100%',
      background: theme.colors.grayscale100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      ['svg']: {
        fill: theme.colors.grayscale10,
        height: '16px',
        width: 'auto',
      },
    },
  },
  ({ focus }: { focus: boolean }) =>
    focus && {
      label: {
        background: theme.colors.grayscale90,
        borderRadius: '8px 8px 0 0',
      },
      ul: {
        display: 'flex',
      },
    },
);

const SearchBarContents = styled.div(
  {
    display: 'flex',
    width: '100%',
    outline: 'none',
    gap: '12px',
  },
  (props: SearchBarActiveProps) => ({
    // borderRadius: '10px',
    // overflow: 'hidden',
    // border: '1px solid ' + (props.active ? theme.colors.primary5 : theme.colors.transparent),
  }),
);

const SearchBarInput = styled.div({
  display: 'flex',
  alignItems: 'center',
  background: theme.colors.grayscale100,
  padding: '18px',
  borderRadius: '12px',
  width: '100%',
  ['input']: {
    boxSizing: 'border-box',
    width: '100%',
    border: 'none',
    background: theme.colors.transparent,
    color: theme.colors.primary0,
    outline: 'none',
    fontFamily: 'Pretendard',

    '::placeholder': {
      color: theme.colors.grayscale50,
    },
  },
  ['svg']: {
    height: '24px',
    width: 'auto',
    stroke: theme.colors.primary0,
    cursor: 'pointer',
  },
  [media[0]]: {
    padding: '0 12px',
    ['input']: {
      padding: '12px 0',
    },
    ['svg']: {
      height: '18px',
    },
  },
});

const RecentSearchListContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '12px',
    ['> span']: {
      margin: '6px 18px',
      fontSize: '15px',
    },
    [media[0]]: {
      paddingRight: '6px',
      ['> span']: {
        margin: '6px 12px',
        fontSize: '13px',
      },
    },
  },
  (props: { isEmpty: boolean }) =>
    !props.isEmpty && {
      margin: '6px 0',
    },
);

const RecentSearchItemContainer = styled.div(
  {
    display: 'flex',
    alignItems: 'center',
    color: theme.colors.grayscale40,
    fontSize: '15px',
    gap: '12px',
    padding: '9px 18px',
    borderRadius: '0 24px 24px 0',
    whiteSpace: 'nowrap',
    ['> span']: {
      color: theme.colors.primary0,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: '100%',
      fontSize: '19px',
      marginRight: 'auto',
      cursor: 'pointer',
    },
    ['> svg']: {
      width: 'auto',
      height: '12px',
      cursor: 'pointer',
      padding: '6px',
      borderRadius: '12px',
      [':hover']: {
        background: theme.colors.grayscale70,
      },
    },
    [':hover']: {
      background: theme.colors.grayscale100,
      ['> svg']: {
        fill: theme.colors.primary5,
      },
    },
    [media[0]]: {
      fontSize: '11px',
      gap: '8px',
      padding: '6px 12px',
      ['> span']: {
        fontSize: '15px',
      },
      ['> svg']: {
        height: '12px',
        padding: '0',
        fill: theme.colors.primary5,
      },
      [':hover']: {
        background: theme.colors.transparent,
        ['> svg']: {
          background: theme.colors.transparent,
        },
      },
    },
  },
  (props: { focus: boolean }) =>
    props.focus && {
      background: theme.colors.grayscale100,
      ['> svg']: {
        fill: theme.colors.primary5,
      },
    },
);

const AutoCompleteListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '6px 0',
  paddingRight: '12px',
  ['svg']: {
    margin: 'auto',
    padding: '32px 0',
  },
});

const AutoCompleteItemContainer = styled.div(
  {
    cursor: 'pointer',
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    color: theme.colors.grayscale40,
    fontSize: '15px',
    padding: '9px 18px',
    borderRadius: '0 24px 24px 0',
    whiteSpace: 'nowrap',
    [media[0]]: {
      gap: '8px',
      padding: '6px 12px',
      fontSize: '11px',
    },
    [':hover']: {
      background: theme.colors.grayscale100,
    },
  },
  (props: { focus: boolean }) =>
    props.focus && {
      background: theme.colors.grayscale100,
    },
);

const AutoCompleteItemText = styled.div({
  color: theme.colors.primary0,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  fontSize: '19px',
  ['span']: {
    color: theme.colors.red,
  },
  [media[0]]: {
    fontSize: '15px',
  },
});

export {
  SearchBarLayout,
  SearchBarLayer,
  SearchBarContainer,
  SearchBarContents,
  SearchBarInput,
  RecentSearchListContainer,
  RecentSearchItemContainer,
  AutoCompleteListContainer,
  AutoCompleteItemContainer,
  AutoCompleteItemText,
  SearchBarSelectBox,
};
