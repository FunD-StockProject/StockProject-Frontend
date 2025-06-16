import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { BackButton, MainContent, StyledMainlayout } from './Mainlayout.Style';
import leftArrow from '@assets/leftArrow.svg';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledMainlayout>
      <MainContent>
        {[webPath.search()].includes(location.pathname) && <BackButton src={leftArrow} onClick={() => navigate(-1)} />}
        <Header />
        {children}
        {![webPath.login(), webPath.shortView(), webPath.search(), webPath.register(), webPath.registerDone()].includes(location.pathname) && <Footer />}
      </MainContent>
      {![webPath.search()].includes(location.pathname) && <BottomNavigation />}
    </StyledMainlayout>
  );
};

export default Mainlayout;