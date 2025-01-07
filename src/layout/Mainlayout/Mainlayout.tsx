import { LayoutProps } from '../../ts/Types';
import Footer from './Footer/Footer';
import Header from './Header/Header';
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
