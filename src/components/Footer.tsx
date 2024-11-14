import styled from '@emotion/styled';
import logo from '../assets/logo_white.svg';
import dictSVG from '../assets/footer_dict.svg';
import commentSVG from '../assets/footer_comment.svg';
import developerSVG from '../assets/footer_developer.svg';

const FooterContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '120px 0px',
  width: '100%',
  background: '#3457FD',
});

const FooterList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 60px',
  height: '100%',
  gap: '32px',
});

const FooterTitle = styled.div({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',

  ['p']: { fontSize: '32px', margin: 0, fontWeight: '700' },
  ['img']: { height: '32px' },
});

const FooterButtonContainer = styled.div({
  display: 'flex',
  gap: '20px',
});

const FooterButton = styled(({ str, src, onClick, className }: { str: string; src: string; onClick?: (e: any) => void; className?: string }) => {
  return (
    <div className={className} onClick={onClick}>
      <img src={src} />
      <p>{str}</p>
    </div>
  );
})({
  background: 'white',
  color: 'black',
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '14px',
  padding: '18px 24px',
  gap: '12px',
  fontSize: '18px',
  fontWeight: '700',
  alignItems: 'center',
  ['img']: {
    height: '36px',
  },
  ['p']: {
    margin: '0',
  },
});

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterList>
          <FooterTitle>
            <p>About</p>
            <img src={logo} />
          </FooterTitle>
          <div>
            개미들이 원하던 서비스! '인간지표'가 2025년 1월 11일에 공식 오픈이 예정되어있어요! 😊
            <br />
            '인간지표'를 사용하면서 불편한 부분이나 추가로 원하는 기능이 있으면 언제든지 피드백해주세요 :)
          </div>
          <FooterButtonContainer>
            <FooterButton src={dictSVG} str="인간지표 백과사전" />
            <FooterButton src={commentSVG} str="서비스 의견 남기기" />
            <FooterButton src={developerSVG} str="만든이들" />
          </FooterButtonContainer>
        </FooterList>
      </FooterContainer>
    </>
  );
};

export default Footer;
