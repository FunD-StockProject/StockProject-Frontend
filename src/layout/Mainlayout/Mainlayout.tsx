import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
import leftArrow from '@assets/leftArrow.svg';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { BackButton, MainContent, StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isSearchPage = location.pathname === webPath.search();
  const isLabPage = location.pathname.startsWith('/lab');
  const isRootPage = location.pathname === '/';
  const isShortViewPage = location.pathname === webPath.shortView();

  return (
    <StyledMainlayout>
      <MainContent>
        {isSearchPage && <BackButton src={leftArrow} onClick={() => navigate(-1)} />}
        {!isLabPage && !isShortViewPage && <Header />}
        {children}
        {isRootPage && <Footer />}
      </MainContent>
      {!isSearchPage && <BottomNavigation />}
    </StyledMainlayout>
  );
};

export default Mainlayout;
