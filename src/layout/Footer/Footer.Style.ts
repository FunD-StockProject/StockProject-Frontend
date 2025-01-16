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
    padding: '60px 20px',
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
  gap: '12px',

  [media[0]]: {
    gap: '8px',
  },
});

const FooterButtonItemContainer = styled.div({
  display: 'flex',
  background: theme.colors.primary0,
  padding: '12px 18px',
  borderRadius: '8px',
  gap: '8px',
  alignItems: 'center',
  color: theme.colors.primary100,
  fontSize: '18px',

  ['img']: {
    height: '1.5em',
  },

  '&:hover': {
    background: theme.colors.cornflowerblue,
    color: 'white',
    transition: '.1s',
  },

  [media[0]]: {
    gap: '8px',
    width: '100%',
    borderRadius: '8px',
  },
});

const FooterIconsContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center; // 아이콘 세로 정렬
`;
export {
  FooterContainer,
  FooterContents,
  FooterTitle,
  FooterButtonContainer,
  FooterButtonItemContainer,
  FooterIconsContainer,
};
