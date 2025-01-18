import { useNavigate } from 'react-router-dom';
import DisquietVote from '@components/Event/Disquiet';
import SearchBar from '@components/SearchBar/SearchBar';
import LogoSVG from '@assets/logo_white.svg?react';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderContents>
          <HeaderLogo onClick={() => navigate('/')}>
            <LogoSVG />
            <DisquietVote />
          </HeaderLogo>
          <SearchBar />
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
