import { useNavigate } from 'react-router-dom';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';
import LogoSVG from '../../assets/logo_white.svg?react';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderContents>
          <HeaderLogo onClick={() => navigate('/')}>
            <LogoSVG />
          </HeaderLogo>
          <SearchBar />
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
