import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import styled from '@emotion/styled';
import logo from '../assets/logo_white.svg';

const HeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 30px',
  background: '#3457FD',
  width: '100%',
  gap: '120px',
});

const HeaderLogo = styled(({ src, onClick, className }: { src: string; onClick?: (e: any) => void; className?: string }) => {
  return (
    <div onClick={onClick} className={className}>
      <img src={src} />
    </div>
  );
})({
  padding: '28px 48px',
  textAlign: 'center',
  ['img']: {
    height: '32px',
    cursor: 'pointer',
  },
});

const HeaderContents = styled.div({
  width: '100%',
  maxWidth: '1280px',
});

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderLogo src={logo} onClick={() => navigate('/')} />
        <HeaderContents>
          <SearchBar />
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
