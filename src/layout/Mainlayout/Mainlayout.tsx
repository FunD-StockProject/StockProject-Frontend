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
  const isLoginPage = location.pathname.startsWith(webPath.login());
  const isRegisterPage = location.pathname.startsWith(webPath.register());
  const isEditProfilePage = location.pathname.startsWith(webPath.editProfile());
  const isWithdrawPage = location.pathname.startsWith(webPath.withdraw());
  const isTermPage = location.pathname.startsWith(webPath.term());
  const isCallbackPage = location.pathname.startsWith(webPath.callback());
  const isUsagePage = location.pathname.startsWith(webPath.usage());
  const isNotificationPage = location.pathname.startsWith(webPath.notification());

  const isBottomNavigationVisible =
    !isLoginPage &&
    !isRegisterPage &&
    !isEditProfilePage &&
    !isWithdrawPage &&
    !isTermPage &&
    !isCallbackPage &&
    !isUsagePage &&
    !isNotificationPage;

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
