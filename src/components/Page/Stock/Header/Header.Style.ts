import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const HeaderContainer = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '8px 20px 16px',
  boxSizing: 'border-box',
  gap: '12px',
  borderBottom: `4px solid ${theme.colors.sub_gray11}`,

  ['>svg']: {
    fill: theme.colors.sub_gray5,
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  ['>span.grow']: {
    flexGrow: 1,
  },
});

const HeaderIconButton = styled.button(
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

export { HeaderContainer, HeaderIconButton };
