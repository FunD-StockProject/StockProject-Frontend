import styled from '@emotion/styled';
import { media, theme } from '@styles/themes';

const FooterContainer = styled.div({
  background: theme.colors.sub_gray11,
  width: '100%',
});

const FooterContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '32px 20px',
  boxSizing: 'border-box',
  margin: '0 auto',
  height: '100%',
  gap: '32px',
  fontSize: '17px',
  fontWeight: '700',

  [media[0]]: {
    gap: '24px',
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
    fontSize: '17px',

    ['svg']: {
      height: '28px',
    },
  },
});

const FooterButtonContainer = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',

  [media[0]]: {
    gap: '12px',
  },
});

const FooterButtonItemContainer = styled.div({
  ...theme.font.body16Medium,
  display: 'flex',
  background: theme.colors.sub_black,
  padding: '12px 18px',
  borderRadius: '8px',
  gap: '8px',
  alignItems: 'center',
  color: theme.colors.sub_gray3,
  cursor: 'pointer',

  ['img']: {
    height: '1.5em',
  },

  // '&:hover': {
  //   background: theme.colors.cornflowerblue,
  //   color: 'white',
  //   transition: '.1s',
  // },

  [media[0]]: {
    gap: '8px',
    width: '100%',
    borderRadius: '8px',
  },
});

const FooterIconsContainer = styled.div({
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  fontSize: '32px',
  ['svg']: {
    cursor: 'pointer',
    height: '1em',
    width: '1em',
    fill: 'white',
  },
});
export {
  FooterContainer,
  FooterContents,
  FooterTitle,
  FooterButtonContainer,
  FooterButtonItemContainer,
  FooterIconsContainer,
};
