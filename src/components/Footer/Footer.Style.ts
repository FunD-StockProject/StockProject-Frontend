import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const FooterContainer = styled.div({
  background: theme.colors.primary50,
  width: '100%',
});

const FooterContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  padding: '60px',
  boxSizing: 'border-box',
  margin: '0 auto',
  height: '100%',
  gap: '32px',
  fontSize: '17px',
  fontWeight: '700',

  [media[0]]: {
    gap: '24px',
    padding: '60px 30px',
    fontSize: '13px',
  },
});

const FooterTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  lineHeight: '1',
  fontSize: '40px',
  color: theme.colors.primary0,
  gap: '18px',

  ['svg']: {
    width: 'auto',
    height: '36px',
  },

  [media[0]]: {
    gap: '12px',
    fontSize: '32px',

    ['svg']: {
      height: '28px',
    },
  },
});

const FooterButtonContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '18px',

  [media[0]]: {
    gap: '12px',
  },
});

const FooterButtonItemContainer = styled.div({
  display: 'flex',
  background: theme.colors.primary0,
  padding: '18px 24px',
  borderRadius: '18px',
  gap: '12px',
  alignItems: 'center',
  color: theme.colors.primary100,
  fontSize: '24px',

  ['img']: {
    height: '32px',
  },

  [media[0]]: {
    gap: '8px',

    width: '100%',
    padding: '12px 18px',

    fontSize: '18px',

    borderRadius: '12px',

    ['img']: {
      height: '28px',
    },
  },
});

export { FooterContainer, FooterContents, FooterTitle, FooterButtonContainer, FooterButtonItemContainer };
