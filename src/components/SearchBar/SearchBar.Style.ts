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

const RecentSearchListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 18px',
  fontSize: '15px',
  ['span']: {
    padding: '18px 0px',
  },
  [media[0]]: {
    fontSize: '11px',
  },
});

const RecentSearchItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  fontSize: '19px',
  lineHeight: 1,
  color: theme.colors.primary0,
  paddingBottom: '18px',
  ['span']: {
    padding: '0px',
    width: '100%',
    cursor: 'pointer',
  },
  ['svg']: {
    cursor: 'pointer',
    fill: theme.colors.primary5,
    height: '19px',
    width: '19px',
  },
  [media[0]]: {
    fontSize: '15px',
    ['span']: {
      padding: '0px',
    },
    ['svg']: {
      height: '13px',
      width: '13px',
    },
  },
});

const AutoCompleteListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '18px',
  gap: '18px',
  minHeight: '160px',
  ['svg']: {
    margin: 'auto',
  },
});

const AutoCompleteItemContainer = styled.div({
  cursor: 'pointer',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  color: theme.colors.grayscale40,
  fontSize: '15px',
  width: '100%',
  [media[0]]: {
    fontSize: '11px',
  },
});

const AutoCompleteItemText = styled.div({
  color: theme.colors.primary0,
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
