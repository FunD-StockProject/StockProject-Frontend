import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: '1',
  padding: '32px 0px',
  gap: '24px',
});

const RegisterContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  boxSizing: 'border-box',
  flexGrow: '1',
});

const EditProfileValueContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',

  ['>hr']: {
    background: '#1D1E1F',
    width: '100%',
    height: '4px',
    border: 'none',
    margin: '0',
  },
});

const EditProfileButton = styled.button({
  margin: '0 20px',

  padding: '10px 0px',
  border: 'none',
  borderRadius: '8px',
  background: theme.colors.sub_blue6,
  color: theme.colors.sub_white,
  ...theme.font.body18Semibold,

  ['&:disabled']: {
    background: theme.colors.sub_gray8,
    color: theme.colors.sub_black,
  },
});

export { RegisterContainer, RegisterContent, EditProfileValueContainer, EditProfileButton };
