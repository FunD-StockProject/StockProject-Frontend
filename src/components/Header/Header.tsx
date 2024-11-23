import { useNavigate } from 'react-router-dom';

import SearchBar from '../SearchBar/SearchBar';

// import { ReactComponent as LogoSVG } from '../../assets/logo_white.svg';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderContents>
          <HeaderLogo onClick={() => navigate('/')}>{/* <LogoSVG /> */}</HeaderLogo>
          <SearchBar />
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
