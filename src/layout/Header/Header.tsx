import { useNavigate } from 'react-router-dom';
import LogoSVG from '@assets/logo_white.svg?react';
import { HeaderContainer, HeaderContents, HeaderLogo } from './Header.Style';

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderContents>
        <HeaderLogo onClick={() => navigate('/')}>
          <LogoSVG />
        </HeaderLogo>
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;
