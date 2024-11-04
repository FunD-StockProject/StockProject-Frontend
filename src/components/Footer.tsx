import styled from '@emotion/styled';

const FooterContainer = styled.div({
  padding: '30px 0',
  background: '#111111',
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
