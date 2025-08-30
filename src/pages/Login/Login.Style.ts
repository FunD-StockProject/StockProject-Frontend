import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const LoginContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',

  ['>svg']: {
    width: '36px',
    height: 'auto',
    aspectRatio: '1 / 1',
    padding: '12px 20px',
    marginLeft: 'auto',
  },
});

const LoginBannerContainer = styled.div({
  flexGrow: '3',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
  justifyContent: 'center',
});

const LoginBannerContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    textAlign: 'center',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray2,
    },
    ['&.desc']: {
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const LoginButtonContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  alignItems: 'center',
  justifyContent: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray6,
    opacity: 0.8,
  },
});

const LoginButtonContents = styled.div({
  display: 'flex',
  gap: '16px',

  ['>img']: {
    width: '64px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '50%',
  },
});

export { LoginContainer, LoginBannerContainer, LoginBannerContents, LoginButtonContainer, LoginButtonContents };
