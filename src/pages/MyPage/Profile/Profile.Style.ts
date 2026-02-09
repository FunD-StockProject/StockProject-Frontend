import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const ProfileContainer = styled.div({
  background: 'linear-gradient(180deg, #3457FD 0%, #5270FF 100%)',
  display: 'flex',
  alignItems: 'end',
  padding: '25dvh 24px 24px',
  boxSizing: 'border-box',
  gap: '12px',
});

const ProfileContents = styled.div({
  gap: '4px',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Semibold,
    color: theme.colors.sub_white,
  },

  ['>button']: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: '0',

    ...theme.font.body16Medium,
    color: theme.colors.sub_blue1,

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
});

export { ProfileContainer, ProfileContents };
