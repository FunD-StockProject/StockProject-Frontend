import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import styled from '@emotion/styled';

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

const HeaderContainer = styled(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>;
})({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 30px',
});

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderLogo src="/src/assets/logo.svg" onClick={() => navigate('/')} />
        <SearchBar />
      </HeaderContainer>
    </>
  );
};

export default Header;
