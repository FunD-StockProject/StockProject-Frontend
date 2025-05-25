import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import DisquietVote from '@components/Event/Disquiet';
import SearchBar from '@components/SearchBar/SearchBar';
import LogoSVG from '@assets/logo_white.svg?react';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  return (
    <>
      <HeaderContainer>
        <HeaderContents>
          <HeaderLogo onClick={() => navigate('/')}>
            <LogoSVG />
            {false && <DisquietVote />}
          </HeaderLogo>
          {location.pathname != webPath.mypage() && <SearchBar />}
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
