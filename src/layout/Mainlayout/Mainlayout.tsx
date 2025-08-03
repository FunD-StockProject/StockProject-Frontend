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

  const isSearchPage = location.pathname === webPath.search();
  const isLabPage = location.pathname.startsWith('/lab');
  const isRootPage = location.pathname === '/';
  const isFavoritesPage = location.pathname.startsWith('/favorites');

  return (
    <StyledMainlayout>
      <MainContent>
        {isSearchPage && <BackButton src={leftArrow} onClick={() => navigate(-1)} />}
        {!(isLabPage || isFavoritesPage) && <Header />}
        {children}
        {isRootPage && <Footer />}
      </MainContent>
      {!isSearchPage && <BottomNavigation />}
    </StyledMainlayout>
  );
};

export default Mainlayout;