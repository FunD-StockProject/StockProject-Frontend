import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import styled from '@emotion/styled';
import logo from '../assets/logo_white.svg';

const HeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  background: '#3457FD',
  width: '100%',
  // display: 'flex',
  // flexDirection: 'column',
  // alignItems: 'center',
  // padding: '0 30px',
  // background: '#3457FD',
  // width: '100%',
  // gap: '120px',
});

const HeaderLogo = styled(({ src, onClick, className }: { src: string; onClick?: (e: any) => void; className?: string }) => {
  return (
    <div onClick={onClick} className={className}>
      <img src={src} />
    </div>
  );
})({
  padding: '32px 16px',
  textAlign: 'center',
  ['img']: {
    height: '32px',
    cursor: 'pointer',
  },
});

const HeaderContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1280px',
  boxSizing: 'border-box',
  margin: '0 auto',
  padding: '0 60px',
  height: '100%',
});

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <HeaderLogo src={logo} onClick={() => navigate('/')} />
        <HeaderContents>
          <SearchBar />
          <div
            style={{
              width: 0,
              height: 0,
              marginLeft: 'auto',
              borderStyle: 'solid',
              borderWidth: '50px 50px 0px 0px',
              borderColor: '#243CAE transparent transparent transparent',
            }}
          ></div>
          <div
            style={{
              display: 'flex',
            }}
          >
            <div
              style={{
                padding: '12px 24px',
                background: '#101010',
              }}
            >
              <p style={{ margin: 0 }}>국내주식</p>
            </div>
            <div
              style={{
                padding: '12px 24px',
                background: '#F6F6F6',
              }}
            >
              <p style={{ margin: 0, color: '#303033' }}>해외주식</p>
            </div>
          </div>
        </HeaderContents>
      </HeaderContainer>
    </>
  );
};

export default Header;
