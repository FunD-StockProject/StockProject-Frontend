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
      <div
        style={{
          position: 'relative',
          overflow: 'auto',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        {children}
        {![webPath.login(), webPath.register(), webPath.registerDone()].includes(location.pathname) && <Footer />}
      </div>
      <BottomNavigation />
    </StyledMainlayout>
  );
};

export default Mainlayout;
