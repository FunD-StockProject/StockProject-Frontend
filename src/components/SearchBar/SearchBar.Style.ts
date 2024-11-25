import styled from '@emotion/styled';
import { media, theme } from '../../styles/themes';

const CustomText = styled.div`
  display: flex;
  background-color: black;
  padding: 10px;
  width: 200px;
  margin: 10px;

  font-size: 14px;
  color: #e9ecef;
  font-weight: bold;

  animation: ease;
  border-radius: 100%;
`;

const SearchBarContainer = styled.div(
  {
    padding: '24px 48px',
    gap: '12px',
    fontWeight: '700',
    fontSize: '32px',
    color: theme.colors.primary5,
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1',
    background: theme.colors.primary100,

    [media[0]]: {
      gap: '6px',
      padding: '24px 32px',
      fontSize: '25px',
    },
  },
  ({ active }: { active: boolean }) => ({
    borderRadius: +(active ? '12px' : '0px'),
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
  borderWidth: '50px 50px 0 0',
  borderColor: theme.colors.primary70 + ' transparent',
  display: active ? 'none' : 'block',
}));

const AutoCompleteCorrectSpan = styled.span({
  color: theme.colors.red,
});

export { SearchBarContainer, SearchBarContents, SearchBarInput, SearchBarDesignPart, AutoCompleteCorrectSpan };
