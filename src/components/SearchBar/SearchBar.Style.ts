import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';
import { SearchBarActiveProps } from './SearchBar.Props';

const SearchBarLayout = styled.div({
  position: 'relative',
  height: '200px',
  [media[0]]: {
    height: '180px',
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
    padding: '24px 48px',
    gap: '12px',
    fontWeight: '700',
    fontSize: '32px',
    color: theme.colors.primary5,
    flexDirection: 'column',
    lineHeight: '1',
    background: theme.colors.primary100,

    [media[0]]: {
      gap: '12px',
      padding: '24px 32px',
      fontSize: '25px',
    },
  },
  (props: SearchBarActiveProps) => ({
    borderRadius: `12px 12px ${props.active ? '12px' : '0px'} 12px`,
    [media[0]]: {
      borderRadius: `8px 8px ${props.active ? '8px' : '0px'} 8px`,
    },
  }),
);

const SearchBarContents = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    outline: 'none',
  },
  (props: SearchBarActiveProps) => ({
    borderRadius: '10px',

    border: '1px solid ' + (props.active ? theme.colors.primary5 : theme.colors.transparent),
  }),
);

const SearchBarInput = styled.input(
  {
    border: 'none',
    boxSizing: 'border-box',
    background: theme.colors.grayscale100,
    padding: '18px',
    outline: 'none',
  },
  (props: SearchBarActiveProps) => ({
    borderRadius: props.active ? '12px 12px 0px 0px' : '12px',
  }),
);

const RecentSearchListContainer = styled.div(
  (props: { isEmpty: boolean }) =>
    !props.isEmpty && {
      margin: '6px 0',
    },
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
);

const RecentSearchItemContainer = styled.div(
  (props: { focus: boolean }) =>
    props.focus && {
      background: theme.colors.grayscale100,
      ['> svg']: {
        fill: theme.colors.primary5,
      },
    },
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
  (props: { focus: boolean }) =>
    props.focus && {
      background: theme.colors.grayscale100,
    },
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

const SearchBarDesignPart = styled.div((props: SearchBarActiveProps) => ({
  width: 0,
  height: 0,
  marginLeft: 'auto',
  borderStyle: 'solid',
  borderWidth: '50px 50px 0 0',
  borderColor: `${theme.colors.primary70} transparent`,
  display: props.active ? 'none' : 'block',
}));

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
  SearchBarDesignPart,
};
