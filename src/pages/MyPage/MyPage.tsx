import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchAuthLogout, fetchAuthWithdraw } from '@controllers/api';
import RightArrowSVG from '@assets/icons/rightArrow.svg?react';

const MyPageEventBannerContainer = styled.div({
  padding: '24px 12px',
  display: 'flex',
  justifyContent: 'center',
  borderBottom: '1px solid white',
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
  boxSizing: 'border-box',
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
      <p onClick={() => navigate(webPath.mypage(), { state: { login: true } })}>test login</p>
    </MyPageLoginContainer>
  );
};

const MyPageUser = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
      <div style={{ width: '96px', aspectRatio: '1 / 1', background: 'gray', borderRadius: '100%' }}></div>
      <p style={{ margin: '0', fontSize: '15px', fontWeight: '700' }}>압구정 불개미</p>
      <div style={{ fontSize: '12px', background: 'gray', borderRadius: '32px', padding: '0 6px' }}>내 정보 수정</div>
    </div>
  );
};

const MyPageUserLike = () => {
  return (
    <div style={{ border: '1px solid white', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 12px',
        }}
      >
        <p style={{ margin: '0', fontSize: '11px' }}>
          <b>내 인간지표</b> | 관심 종목 변동 알림 신청하기
        </p>
        <RightArrowSVG fill="white" style={{ width: '12px', height: '12px' }} />
      </div>
      <div style={{ display: 'flex', gap: '8px', padding: '0 8px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid white',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            padding: '12px 0',
          }}
        >
          <p style={{ margin: '0', fontWeight: '700' }}>관심 종목</p>
          <p style={{ margin: '0' }}>8개</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid white',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            padding: '12px 0',
          }}
        >
          <p style={{ margin: '0', fontWeight: '700' }}>변동 알림</p>
          <p style={{ margin: '0' }}>7개</p>
        </div>
      </div>
    </div>
  );
};

const MyPageUserLab = () => {
  return (
    <div style={{ border: '1px solid white', display: 'flex', flexDirection: 'column', gap: '8px', padding: '8px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 12px',
        }}
      >
        <p style={{ margin: '0', fontSize: '11px' }}>
          <b>실험 현황</b> | 내 투자 타이밍은 적절할까?
        </p>
        <RightArrowSVG fill="white" style={{ width: '12px', height: '12px' }} />
      </div>
      <div style={{ display: 'flex', gap: '8px', padding: '0 8px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid white',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            padding: '12px 0',
          }}
        >
          <p style={{ margin: '0', fontWeight: '700' }}>실험 중</p>
          <p style={{ margin: '0' }}>8개</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid white',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            padding: '12px 0',
          }}
        >
          <p style={{ margin: '0', fontWeight: '700' }}>총 실험 수</p>
          <p style={{ margin: '0' }}>20개</p>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid white',
            alignItems: 'center',
            width: '100%',
            gap: '8px',
            padding: '12px 0',
          }}
        >
          <p style={{ margin: '0', fontWeight: '700' }}>성공률</p>
          <p style={{ margin: '0' }}>62.5%</p>
        </div>
      </div>
    </div>
  );
};

const MyPageUserInteraction = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm('정말 로그아웃 하시겠어요?')) {
      const res = await fetchAuthLogout();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('provider');

      navigate('/');
      console.log(res);
    }
  };

  const handleWithdraw = async () => {
    // const res = await fetchAuthWithdraw();
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('refresh_token');
    // localStorage.removeItem('provider');

    // navigate('/');
    // console.log(res);
    navigate(webPath.withdraw());
  };

  return (
    <div
      style={{
        padding: '12px',
        margin: '0 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        borderTop: '1px solid white',
      }}
    >
      <div onClick={handleLogout}>로그아웃</div>
      <div onClick={handleWithdraw}>회원탈퇴</div>
    </div>
  );
};

const MyPageUserInfo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '8px 12px' }}>
      <MyPageUser />
      <MyPageUserLike />
      <MyPageUserLab />
      <MyPageUserInteraction />
    </div>
  );
};

const MyPage = () => {
  const isLogin = !!localStorage.getItem('access_token');

  return (
    <MyPageContainer>
      <MyPageEventBanner />
      {!isLogin ? <MyPageLogin /> : <MyPageUserInfo />}
    </MyPageContainer>
  );
};

export default MyPage;
