import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const OAuthCallbackContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  justifyContent: 'center',
  flexGrow: 1,
  backgroundColor: theme.colors.sub_black,

  ['>img']: {
    width: '72px',
    height: '72px',
  },

  ['>svg']: {
    width: '72px',
    height: '72px',
    fill: theme.colors.sub_blue7,
  },
});

const StatusTitle = styled.p({
  margin: 0,
  fontSize: '20px',
  fontWeight: 600,
  textAlign: 'center',
  color: theme.colors.sub_white
});

const StatusDesc = styled.p({
  margin: 0,
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  color: '#666',
});

export { OAuthCallbackContainer, StatusTitle, StatusDesc };
