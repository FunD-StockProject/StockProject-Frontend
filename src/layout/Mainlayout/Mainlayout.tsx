import styled from '@emotion/styled';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { LayoutProps } from '../../ts/Types';
import { StyledMainlayout } from './Mainlayout.Style';

const Main = styled.div({
  padding: '0px 0px',
  flexGrow: 1,
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
