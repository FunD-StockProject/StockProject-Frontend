import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const SearchHeaderWrapper = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '8px 20px',
  boxSizing: 'border-box',
  marginBottom: '8px',

  ['>svg']: {
    fill: theme.colors.sub_gray5,
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const RightSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const IconButton = styled.button(
  ({ isActive }: { isActive?: boolean }) => ({
    ['>svg']: {
      fill: isActive ? theme.colors.sub_blue6 : theme.colors.sub_gray7,
      width: '36px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  }),
  {
    background: 'none',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
);

export { SearchHeaderWrapper, RightSection, IconButton };
