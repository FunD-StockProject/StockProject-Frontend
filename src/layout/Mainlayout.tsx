import Footer from '../components/Footer';
import Header from '../components/Header';

type MainLayoutProps = {
  children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Mainlayout;
