import { useLocation } from 'react-router-dom';
import { detectPWA, detectPlatform, detectWebView } from '@utils/Detector';
import { webPath } from '@router/index';
import BottomNavigation from '@layout/BottomNavigation/BottomNavigation';
import Header from '@layout/Header/Header';
import AppInstallPopUp from '@components/PopUp/AppInstallPopUp/AppInstallPopUp';
import PWAInfoPopUp from '@components/PopUp/PWAinfoPopUp/PWAInfoPopUp';
import { LayoutProps } from './Mainlayout.Props';
import { MainContent, StyledMainlayout } from './Mainlayout.Style';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const platform = detectPlatform();
  const isMobileDevice = platform === 'iOS' || platform === 'Android';
  const visiblePWAInfoPopUp = false;
  const isRootPage = location.pathname === '/';

  const isBottomNavigationVisible = (
    ['login', 'register', 'editProfile', 'withdraw', 'term', 'usage', 'notification'] as (keyof typeof webPath)[]
  ).reduce((acc, path) => {
    return acc && !location.pathname.startsWith(webPath[path]);
  }, true);

  return (
    <StyledMainlayout>
      <MainContent isNavActive={isBottomNavigationVisible}>
        <Header location={location.pathname} />
        {children}
      </MainContent>

      {visiblePWAInfoPopUp && isRootPage && !detectPWA() && <PWAInfoPopUp />}
      {visiblePWAInfoPopUp && isMobileDevice && isRootPage && !detectWebView() && <AppInstallPopUp />}
      {isBottomNavigationVisible && <BottomNavigation />}
    </StyledMainlayout>
  );
};

export default Mainlayout;
