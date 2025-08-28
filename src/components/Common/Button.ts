import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Button = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  background: theme.colors.sub_blue6,
  border: 'none',
  borderRadius: '8px',
  padding: '10px 0px',
  ...theme.font.body18Semibold,
  color: theme.colors.sub_white,
});

export default Button;
