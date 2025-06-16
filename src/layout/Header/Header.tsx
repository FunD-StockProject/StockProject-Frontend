import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import SearchBar from '@components/SearchBar/SearchBar';
import LogoSVG from '@assets/logo_white.svg?react';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <HeaderContainer>
        <HeaderContents>
          <HeaderLogo onClick={() => navigate('/')}>
            <LogoSVG />
          </HeaderLogo>
          {![webPath.mypage(), webPath.shortView(), webPath.search(), webPath.login(), webPath.register(), webPath.registerDone()].includes(
            location.pathname,
          ) && <SearchBar />}
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
