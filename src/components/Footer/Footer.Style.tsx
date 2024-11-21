import styled from '@emotion/styled';
import theme from '../../styles/themes';

const FooterContainer = styled.div({
  background: theme.colors.primary50,
  width: '100%',
});

const FooterContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '120px 60px',
  height: '100%',
  gap: '32px',
});

const FooterButtonContainer = styled.div({
  display: 'flex',
  gap: '20px',
});

export { FooterContainer, FooterContents, FooterButtonContainer };
