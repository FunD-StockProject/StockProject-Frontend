import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import DisquietVote from '@components/Event/Disquiet';
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
            {false && <DisquietVote />}
          </HeaderLogo>
          {![webPath.mypage(), webPath.login(), webPath.register(), webPath.registerDone()].includes(
            location.pathname,
          ) && <SearchBar />}
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
