import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { LayoutProps } from '../../ts/Types';
import { StyledMainlayout } from './Mainlayout.Style';
import { useSystemTheme } from '../../hooks/useSystemHook';
import { useLocation } from 'react-router-dom';

const Mainlayout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isDarkMode = useSystemTheme();
  console.log(location);

  return (
    <StyledMainlayout
      style={{ backgroundColor: `${isDarkMode ? '#101010' : '#F6F6F6'}` }}
    >
      {location.pathname !== '/search/wordcloud' ? (
        <>
          <Header />
          {children}
          <Footer />
        </>
      ) : (
        children
      )}
    </StyledMainlayout>
  );
};

export default Mainlayout;
