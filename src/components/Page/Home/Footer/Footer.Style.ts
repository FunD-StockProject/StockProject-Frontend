import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const FooterContainer = styled.div({
  background: theme.colors.sub_gray11,
  width: '100%',
});

const FooterContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 20px',
  boxSizing: 'border-box',
  margin: '0 auto',
  gap: '24px',
  maxWidth: '1200px',
});

const FooterTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',

  ['>p']: {
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },

  ['>svg']: {
    width: 'auto',
    height: '21px',
  },
});

const FooterButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const FooterButton = styled.div({
  display: 'flex',
  background: theme.colors.sub_black,
  padding: '12px 14px',
  borderRadius: '8px',
  gap: '8px',
  cursor: 'pointer',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  ['>p']: {
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray3,
    margin: '0',
  },
});

const FooterIconsContainer = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: 'white',
  },
});

export { FooterContainer, FooterContents, FooterTitle, FooterButtonContainer, FooterButton, FooterIconsContainer };
