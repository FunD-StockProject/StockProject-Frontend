import styled from '@emotion/styled';

const FooterContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 30px',
  width: '100%',
  height: '700px',
  background: '#3457FD',
});

const FooterList = styled.div({
  padding: '0 60px',
});

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterList>푸터입니다</FooterList>
      </FooterContainer>
    </>
  );
};

export default Footer;
