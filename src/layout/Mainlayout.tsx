import Footer from "../components/Footer";
import Header from "../components/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

const Mainlayout = ({ children }: MainLayoutProps) => {
  return (
    <>
			<Header />
      {children}
			<Footer />
    </>
  );
};

export default Mainlayout;
