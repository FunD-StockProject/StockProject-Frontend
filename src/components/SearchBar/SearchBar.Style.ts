import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const SearchBarContainer = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    background: theme.colors.primary100,
    padding: '24px 48px',
    gap: '12px',
    fontSize: '32px',
    fontWeight: '700',
    color: theme.colors.primary5,
    lineHeight: '1',
    [media[0]]: {
      padding: '24px 32px',
      fontSize: '25px',
      gap: '6px',
    },
  },
  ({ active }: { active: boolean }) => ({
    borderRadius: '12px 12px ' + (active ? '12px' : '0px') + ' 12px',
  }),
);

const SearchBarContents = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    outline: 'none',
  },
  ({ active }: { active: boolean }) => ({
    borderRadius: '10px',
    WebkitBorderRadius: '10px',
    MozBorderRadius: '10px',
    border: '1px solid ' + (active ? theme.colors.primary5 : theme.colors.transparent),
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
  ({ active }: { active: boolean }) => ({
    borderRadius: active ? '12px 12px 0px 0px' : '12px',
  }),
);

const SearchBarDesignPart = styled.div(({ active }: { active: boolean }) => ({
  width: 0,
  height: 0,
  marginLeft: 'auto',
  borderStyle: 'solid',
  borderWidth: '50px 50px 0px 0px',
  borderColor: theme.colors.primary70 + ' transparent',
  display: active ? 'none' : 'block',
}));

const AutoCompleteCorrectSpan = styled.span({
  color: theme.colors.red,
});

export { SearchBarContainer, SearchBarContents, SearchBarInput, SearchBarDesignPart, AutoCompleteCorrectSpan };
