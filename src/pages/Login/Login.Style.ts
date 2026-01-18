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
    position: 'absolute',
    right: '0',
    top: '0',
  },

  ['::before']: {
    content: '""',
  },

  justifyContent: 'space-around',
});

const LoginBannerContainer = styled.div({
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
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
});

const LoginButton = styled.div(
  ({ isRecent }: { isRecent: boolean }) =>
    isRecent &&
    ({
      ['::before']: {
        content: '"최근 로그인"',
        position: 'absolute',
        background: theme.colors.sub_gray10,
        padding: '4px 8px',
        ...theme.font.detail10Medium,
        left: '50%',
        whiteSpace: 'nowrap',
        transform: 'translateX(-50%);',
        bottom: 'calc(100% + 12px)',
        borderRadius: '4px',
      },
      ['::after']: {
        content: '""',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%);',
        bottom: 'calc(100% + 6px)',
        width: '0px',
        height: '0px',
        borderStyle: 'solid',
        borderWidth: '6px 4px 0px 4px',
        borderColor: `${theme.colors.sub_gray10} transparent transparent transparent`,
      },
    } as const),
  {
    position: 'relative',
    display: 'flex',

    ['>svg']: {
      width: '64px',
      height: 'auto',
      aspectRatio: '1 / 1',
      borderRadius: '50%',
    },
  },
);

const LoginStatusContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  justifyContent: 'center',
  flexGrow: 1,

  ['>img']: {
    width: '72px',
    height: '72px',
  },

  ['>svg']: {
    width: '72px',
    height: '72px',
    fill: '#3457FD',
  },
});

const LoginStatusTitle = styled.p({
  margin: 0,
  fontSize: '20px',
  fontWeight: 600,
  textAlign: 'center',
  color: theme.colors.sub_white
});

const LoginStatusDesc = styled.p({
  margin: 0,
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'center',
  color: '#666',
});

export { LoginContainer, LoginBannerContainer, LoginBannerContents, LoginButtonContainer, LoginButton, LoginStatusContainer, LoginStatusTitle, LoginStatusDesc };
