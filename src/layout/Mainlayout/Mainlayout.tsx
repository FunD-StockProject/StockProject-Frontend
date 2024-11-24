import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { LayoutProps } from '../../ts/Types';
import { StyledMainlayout } from './Mainlayout.Style';
import { useSystemTheme } from '../../hooks/useSystemHook';

const Mainlayout = ({ children }: LayoutProps) => {
  const isDarkMode = useSystemTheme();

  return (
    <StyledMainlayout style={{ backgroundColor: `${isDarkMode ? '#101010' : '#F6F6F6'}` }}>
      <Header />
      {children}
      <Footer />
    </StyledMainlayout>
  );
};

export default Mainlayout;
