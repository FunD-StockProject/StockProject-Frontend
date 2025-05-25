import { useLocation } from 'react-router-dom';
import { webPath } from '@router/index';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <StyledMainlayout>
      <Header />
      {children}
      <BottomNavigation />
      {![webPath.login()].includes(location.pathname) && <Footer />}
    </StyledMainlayout>
  );
};

export default Mainlayout;
