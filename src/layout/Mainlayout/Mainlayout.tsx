import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { LayoutProps } from '../../ts/Types';
import { StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  return (
    <StyledMainlayout>
      <Header />
      {children}
      <Footer />
    </StyledMainlayout>
  );
};

export default Mainlayout;
