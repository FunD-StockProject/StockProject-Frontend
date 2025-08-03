import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import { fetchAuthLogout } from '@controllers/api';
import EditCircleSVG from '@assets/edit_circle.svg?react';
import InstagramSVG from '@assets/instagram.svg?react';
import LinkedInSVG from '@assets/linkedin.svg?react';
import ProfilePNG from '@assets/profile.png';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';
import ThreadSVG from '@assets/thread.svg?react';

const MyPageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  boxSizing: 'border-box',
});

const MyPageProfileContainer = styled.div({
  height: '294px',
  background: 'linear-gradient(180deg, #3457FD 0%, #5270FF 100%)',
  display: 'flex',
  alignItems: 'end',
  padding: '24px',
  boxSizing: 'border-box',
  gap: '12px',
});

const MyPageProfile = ({
  profileImg,
  username,
  useremail,
  onClick,
}: {
  profileImg?: string;
  username?: string;
  useremail?: string;
  onClick?: () => void;
}) => {
  return (
    <MyPageProfileContainer>
      <MyPageProfileImage>
        <img src={profileImg ?? ProfilePNG} />
        <EditCircleSVG />
      </MyPageProfileImage>
      <MyPageProfileContents>
        <p>{username}</p>
        <MyPageProfileContentsButton onClick={onClick}>
          <p>{useremail}</p>
          <RightArrowThickSVG />
        </MyPageProfileContentsButton>
      </MyPageProfileContents>
    </MyPageProfileContainer>
  );
};

const MyPageDetailContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '7px',
  padding: '16px 20px',
});

const MyPageDetailTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 0',

  ['>p']: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '500',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',

    ['>span']: {
      fontSize: '12px',
      fontWeight: '500',
      color: '#C6C7C8',
    },
  },

  ['>svg']: {
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
    stroke: '#707374',
  },
});

const MyPageDetailGrid = styled.div(
  ({ count }: { count: number }) => ({
    gridTemplateColumns: `repeat(${count}, 1fr)`,
  }),
  {
    display: 'grid',
    columnGap: '12px',
  },
);

const MyPageDetailContents = styled.div({
  padding: '12px',
  background: '#1D1E1F',
  display: 'flex',
  gap: '6px',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '8px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#FFFFFF',
    },

    ['&.content']: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#C6C7C8',
    },
  },
});

const MyPage = () => {
  const isLogin = !!localStorage.getItem('access_token');

  const profileImg = localStorage.getItem('profileImg') ?? undefined;
  const username = localStorage.getItem('username') ?? '';
  const useremail = localStorage.getItem('useremail') ?? '';

  const stockDetails = [
    {
      title: '관심종목',
      content: `8개`,
      onClick: () => {},
    },
    {
      title: '변동알림',
      content: `7개`,
      onClick: () => {},
    },
  ];

  const labDetails = [
    {
      title: '실험 중',
      content: `8개`,
      onClick: () => {},
    },
    {
      title: '총 실험 수',
      content: `20개`,
      onClick: () => {},
    },
    {
      title: '성공률',
      content: `62.5%`,
      onClick: () => {},
    },
  ];

  const defaultButtons = [
    { text: '서비스 가이드', onClick: () => {} },
    { text: '비즈니스 제안', onClick: () => {} },
    { text: '고객센터', onClick: () => {} },
    { text: '서비스 이용약관', onClick: () => {} },
    { text: '개인정보 처리방침', onClick: () => {} },
  ];

  const handleLogout = async () => {
    const res = await fetchAuthLogout();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('provider');

    navigate('/');
    console.log(res);
  };

  const handleWithdraw = async () => {
    navigate(webPath.withdraw());
  };

  const [LogoutModal, openLogoutModal] = ConfirmModal('정말 로그아웃 하시겠어요?', handleLogout);

  const authButtons = [
    { text: '로그아웃', onClick: openLogoutModal },
    { text: '계정탈퇴', onClick: handleWithdraw },
  ];

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(webPath.login());
  };

  return (
    <MyPageContainer>
      <LogoutModal />
      {isLogin ? (
        <MyPageProfile profileImg={profileImg} username={username} useremail={useremail} />
      ) : (
        <MyPageProfile username="아직 정보가 없어요!" useremail="로그인을 진행해주세요" onClick={handleLogin} />
      )}
      <MyPageContents>
        {isLogin && (
          <>
            <MyPageDetailContainer>
              <MyPageDetailTitle>
                <p>
                  내 인간지표 <span>| 관심 종목 변동 알림 신청하기</span>
                </p>
                <RightArrowThickSVG />
              </MyPageDetailTitle>
              <MyPageDetailGrid count={stockDetails.length}>
                {stockDetails.map((e) => (
                  <MyPageDetailContents>
                    <p className="title">{e.title}</p>
                    <p className="content">{e.content}</p>
                  </MyPageDetailContents>
                ))}
              </MyPageDetailGrid>
            </MyPageDetailContainer>
            <span className="divider" />
            <MyPageDetailContainer>
              <MyPageDetailTitle>
                <p>
                  모의매수 실험 현황 <span>| 내 투자 타이밍은 적절할까</span>
                </p>
                <RightArrowThickSVG />
              </MyPageDetailTitle>
              <MyPageDetailGrid count={labDetails.length}>
                {labDetails.map((e) => (
                  <MyPageDetailContents>
                    <p className="title">{e.title}</p>
                    <p className="content">{e.content}</p>
                  </MyPageDetailContents>
                ))}
              </MyPageDetailGrid>
            </MyPageDetailContainer>
            <span className="divider" />
          </>
        )}
        {defaultButtons.map((e) => (
          <MyPageButton>
            <p>{e.text}</p>
            <RightArrowThickSVG />
          </MyPageButton>
        ))}
        <span className="divider" />
        {authButtons.map((e) => (
          <MyPageButton isSub onClick={e.onClick}>
            <p>{e.text}</p>
            <RightArrowThickSVG />
          </MyPageButton>
        ))}
        <span className="divider" />
        <MyPageSNSContainer>
          <InstagramSVG />
          <LinkedInSVG />
          <ThreadSVG />
        </MyPageSNSContainer>
      </MyPageContents>
      {/* <MyPageEventBanner />
      {!isLogin ? <MyPageLogin /> : <MyPageUserInfo />} */}
    </MyPageContainer>
  );
};

const MyPageProfileImage = styled.div({
  position: 'relative',
  width: '64px',
  height: 'auto',
  aspectRatio: '1 / 1',
  display: 'flex',

  ['>img']: {
    width: '100%',
    height: '100%',
  },

  ['>svg']: {
    position: 'absolute',
    fill: '#ADB5BD',
    background: '#495057',
    borderRadius: '999px',
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    bottom: '0',
    right: '0',
  },
});

const MyPageProfileContents = styled.div({
  gap: '4px',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',

  ['>p']: {
    margin: '0',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: '600',
  },
});

const MyPageProfileContentsButton = styled.button({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '0',

  ['>p']: {
    margin: '0',
    color: '#CBF5FF',
    fontSize: '16px',
    fontWeight: '500',
  },

  ['>svg']: {
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const MyPageContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  ['>span.divider']: {
    background: '#1D1E1F',
    height: '4px',
  },
});

const MyPageButton = styled.button(
  ({ isSub }: { isSub?: true }) => ({
    ['>p']: {
      color: isSub ? '#707374' : '#C6C7C8',
    },
  }),
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 28px',
    width: '100%',
    background: 'none',
    border: 'none',

    ['>p']: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
    },

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
      stroke: '#707374',
    },
  },
);

const MyPageSNSContainer = styled.div({
  display: 'flex',
  padding: '24px 28px',
  gap: '20px',
  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: '#3457FD',
  },
});

export default MyPage;
