import styled from '@emotion/styled';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { LayoutProps } from '../../ts/Types';
import { StyledMainlayout } from './Mainlayout.Style';

const Main = styled.div({
  padding: '0 30px',
});

const Mainlayout = ({ children }: LayoutProps) => {
  return (
    <StyledMainlayout>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </StyledMainlayout>
  );
};

export default Mainlayout;
