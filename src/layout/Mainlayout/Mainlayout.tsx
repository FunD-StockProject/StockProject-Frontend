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

  const isRootPage = location.pathname === '/';

  const isBottomNavigationVisible = (
    [
      'login',
      'register',
      'editProfile',
      'withdraw',
      'term',
      'callback',
      'usage',
      'notification',
    ] as (keyof typeof webPath)[]
  ).reduce((acc, path) => {
    return acc && !location.pathname.startsWith(webPath[path]());
  }, true);

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
