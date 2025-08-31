import { useLocation } from 'react-router-dom';
import { detectPWA } from '@utils/Detector';
import { webPath } from '@router/index';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
import Header from '@layout/Header/Header';
import PWAInfoPopUp from '@components/PopUp/PWAinfoPopUp/PWAInfoPopUp';
import Footer from '../Footer/Footer';
import { LayoutProps } from './Mainlayout.Props';
import { MainContent, StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // const isSearchPage = location.pathname === webPath.search();
  // const isLabPage = location.pathname.startsWith('/lab');
  // const isMyPage = location.pathname.startsWith('/mypage');
  const isRootPage = location.pathname === '/';
  // const isShortViewPage = location.pathname === webPath.shortView();
  // const isFavoritesPage = location.pathname.startsWith('/favorites');

  const isLoginPage = location.pathname.startsWith(webPath.login());
  const isRegisterPage = location.pathname.startsWith(webPath.register());
  const isWithdrawPage = location.pathname.startsWith(webPath.withdraw());
  const isTermPage = location.pathname.startsWith(webPath.term());

  const isBottomNavigationVisible = !isLoginPage && !isRegisterPage && !isWithdrawPage && !isTermPage;

  return (
    <StyledMainlayout>
      <MainContent isNavActive={isBottomNavigationVisible}>
        <Header location={location.pathname} />
        {children}
        {isRootPage && <Footer />}
      </MainContent>

      {isRootPage && !detectPWA() && <PWAInfoPopUp />}
      {isBottomNavigationVisible && <BottomNavigation />}
    </StyledMainlayout>
  );
};

export default Mainlayout;
