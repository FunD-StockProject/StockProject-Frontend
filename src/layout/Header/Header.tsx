import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '@components/SearchBar/SearchBar';
import LogoSVG from '@assets/logo_white.svg?react';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <HeaderContainer>
      <HeaderContents>
        <HeaderLogo onClick={() => navigate('/')}>
          <LogoSVG />
        </HeaderLogo>
        {['/'].includes(location.pathname) && <SearchBar />}
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;
