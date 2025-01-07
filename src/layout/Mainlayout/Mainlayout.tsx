import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
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
