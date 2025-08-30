import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import { fetchAuthLogout } from '@controllers/api';
import { theme } from '@styles/themes';
import InstagramSVG from '@assets/instagram.svg?react';
import LinkedInSVG from '@assets/linkedin.svg?react';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';
import ThreadSVG from '@assets/thread.svg?react';
import {
  MyPageContainer,
  MyPageContents,
  MyPageDefaultContainer,
  MyPageDefaultItem,
  MyPageDetailContainer,
  MyPageDetailContents,
  MyPageDetailItem,
  MyPageDetailTitle,
  MyPageSNSContainer,
} from './MyPage.Style';
import MyPageProfile from './Profile/Profile';

const MyPage = () => {
  const isLogin = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

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

  const detailButtons = [
    {
      title: '내 인간지표',
      subtitle: '관심 종목 변동 알림 신청하기',
      onClick: () => {},
      items: [
        { title: '관심 종목', content: '8개' },
        { title: '변동알림', content: '7개' },
      ],
    },
    {
      title: '모의매수 실험 현황',
      subtitle: '내 투자 타이밍은 적절할까',
      onClick: () => {},
      items: [
        { title: '실험 중', content: '8개' },
        { title: '총 실험 수', content: '20개' },
        { title: '성공률', content: '62.5%' },
      ],
    },
  ];

  const defaultButtons = [
    { text: '서비스 가이드', onClick: () => {} },
    { text: '비즈니스 제안', onClick: () => {} },
    { text: '고객센터', onClick: () => {} },
    { text: '서비스 이용약관', onClick: () => {} },
    { text: '개인정보 처리방침', onClick: () => {} },
  ];

  const authButtons = [
    { text: '로그아웃', onClick: openLogoutModal },
    { text: '계정탈퇴', onClick: handleWithdraw },
  ];

  return (
    <MyPageContainer>
      <LogoutModal />
      <MyPageProfile />
      <MyPageContents>
        {isLogin &&
          detailButtons.map((button) => (
            <MyPageDetailContainer>
              <MyPageDetailTitle>
                <p>
                  {button.title} <span>| {button.subtitle}</span>
                </p>
                <RightArrowThickSVG />
              </MyPageDetailTitle>
              <MyPageDetailContents>
                {button.items.map((item) => (
                  <MyPageDetailItem>
                    <p className="title">{item.title}</p>
                    <p className="content">{item.content}</p>
                  </MyPageDetailItem>
                ))}
              </MyPageDetailContents>
            </MyPageDetailContainer>
          ))}
        <MyPageDefaultContainer>
          {defaultButtons.map((button) => (
            <MyPageDefaultItem onClick={button.onClick}>
              {button.text}
              <RightArrowThickSVG />
            </MyPageDefaultItem>
          ))}
        </MyPageDefaultContainer>
        {isLogin && (
          <MyPageDefaultContainer>
            {authButtons.map((button) => (
              <MyPageDefaultItem className="sub" onClick={button.onClick}>
                {button.text}
                <RightArrowThickSVG />
              </MyPageDefaultItem>
            ))}
          </MyPageDefaultContainer>
        )}
        <span className="divider" />
        <MyPageSNSContainer>
          <InstagramSVG />
          <LinkedInSVG />
          <ThreadSVG />
        </MyPageSNSContainer>
      </MyPageContents>
    </MyPageContainer>
  );
};

export default MyPage;
