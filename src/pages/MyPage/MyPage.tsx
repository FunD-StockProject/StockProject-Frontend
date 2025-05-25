import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const MyPageEventBannerContainer = styled.div({
  padding: '24px 12px',
  display: 'flex',
  justifyContent: 'center',
});

const MyPageEventBannerContent = styled.div({
  background: 'gray',
  textAlign: 'center',
  boxSizing: 'border-box',
  height: '120px',
  width: '360px',
  alignContent: 'center',
});

const MyPageEventBanner = () => {
  return (
    <MyPageEventBannerContainer>
      <MyPageEventBannerContent>이벤트 배너 영역</MyPageEventBannerContent>
    </MyPageEventBannerContainer>
  );
};

const MyPageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  ['hr']: {
    width: '100%',
  },
});

const MyPageLoginContainer = styled.div({
  padding: '24px 12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

const MyPageLogin = () => {
  const navigate = useNavigate();

  return (
    <MyPageLoginContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          border: '1px solid white',
          alignItems: 'center',
          padding: '18px 24px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: '0', fontSize: '15px' }}>로그인하고</p>
          <p style={{ margin: '0', fontSize: '17px', fontWeight: '700' }}>내가 '인간지표'인지 확인하기</p>
        </div>
        <p
          style={{ border: '1px solid white', padding: '12px', margin: '0' }}
          onClick={() => {
            navigate(webPath.login());
          }}
        >
          로그인
        </p>
      </div>
      <p style={{ fontSize: '12px', margin: '0' }}>
        아직 인간지표 계정이 없으시가면?{' '}
        <span
          style={{
            cursor: 'pointer',
            borderBottom: '1px solid white',
          }}
          onClick={() => {
            navigate(webPath.register());
          }}
        >
          회원가입
        </span>
      </p>
    </MyPageLoginContainer>
  );
};

const MyPage = () => {
  return (
    <MyPageContainer>
      <MyPageEventBanner />
      <hr />
      <MyPageLogin />
    </MyPageContainer>
  );
};

export default MyPage;
