import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const NeedLoginContainer = styled.div({
  width: '100%',
  height: 'calc(100% - 96px)',
  position: 'fixed',
  background: 'linear-gradient(rgba(16, 16, 16, 0.4) 0%, #101010 50%)',
  backdropFilter: 'blur(5px)',
  zIndex: '1000',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: '20px',
  padding: '0px 20px',
  boxSizing: 'border-box',
});

const NeedLoginText = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',

  ['>p']: {
    margin: '0',
    textAlign: 'center',
    whiteSpace: 'nowrap',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,

      ['>b']: {
        ...theme.font.body14Medium,
        color: theme.colors.sub_white,
      },
    },
  },
});

const NeedLoginButton = styled.button({
  padding: '10px 28px',
  borderRadius: '999px',
  background: theme.colors.sub_white,
  color: theme.colors.sub_gray11,
  ...theme.font.body18Semibold,
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
});

export { NeedLoginContainer, NeedLoginText, NeedLoginButton };
