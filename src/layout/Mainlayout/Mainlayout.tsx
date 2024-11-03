import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MainLayoutProps } from '../../ts/Types';
import { StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <StyledMainlayout>
      <Header />
      {children}
      <Footer />
    </StyledMainlayout>
  );
};

export default Mainlayout;
