import { useLocation } from 'react-router-dom';
import { webPath } from '@router/index';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { LayoutProps } from './Mainlayout.Props';
import { MainContent, StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isSearchPage = location.pathname === webPath.search();
  const isLabPage = location.pathname.startsWith('/lab');
  const isMyPage = location.pathname.startsWith('/mypage');
  const isRootPage = location.pathname === '/';
  const isShortViewPage = location.pathname === webPath.shortView();
  const isFavoritesPage = location.pathname.startsWith('/favorites');

  return (
    <StyledMainlayout>
      <MainContent>
        {!(isLabPage || isFavoritesPage || isMyPage || isShortViewPage) && <Header />}
        {children}
        {isRootPage && <Footer />}
      </MainContent>
      {!isSearchPage && <BottomNavigation />}
    </StyledMainlayout>
  );
};

export default Mainlayout;
