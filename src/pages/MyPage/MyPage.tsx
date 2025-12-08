import { useNavigate } from 'react-router-dom';
import useLogin from '@hooks/useLogin';
import { webPath } from '@router/index';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import { fetchAuthLogout } from '@controllers/auth/api';
import { useExperimentStatusQuery } from '@controllers/experiment/query';
import { useBookmarkListQuery } from '@controllers/preference/query';
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
  const { isLogin } = useLogin();
  const { data: favorites = [] } = useBookmarkListQuery();
  const { data: experimentStatus } = useExperimentStatusQuery();

  const FavoriteCount = favorites?.length ?? 0;
  const AlarmCount = favorites?.filter((e) => e.isNotificationOn).length ?? 0;

  const navigate = useNavigate();

  const handleClickServiceGuide = () => {
    navigate(webPath.about());
  };

  const handleClickBusinessProposal = () => {
    window.open('mailto:humanzipyo2024@gmail.com?cc=anyany3151@naver.com');
  };

  const handleClickServiceCenter = () => {
    window.open('https://forms.gle/eus2xRNHGxbSBaAK9');
  };

  const handleClickTermUse = () => {
    navigate(webPath.term(), {
      state: { termKey: 'agreeTerm' },
    });
  };

  const handleClickTermPrivacy = () => {
    navigate(webPath.term(), {
      state: { termKey: 'agreePrivacy' },
    });
  };

  const handleLogout = async () => {
    await fetchAuthLogout();
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('provider');
    localStorage.removeItem('useremail');
    localStorage.removeItem('username');
    localStorage.removeItem('profileImg');

    window.location.href = '/';
  };

  const handleWithdraw = async () => {
    navigate(webPath.withdraw());
  };

  const [LogoutModal, openLogoutModal] = ConfirmModal({
    title: '정말 로그아웃 하시겠어요?',
    onConfirm: handleLogout,
  });

  const handleClickMyHumanzipyo = () => {
    navigate(webPath.favorites());
  };

  const handleClickMyExperiment = () => {
    navigate(webPath.lab());
  };

  const detailButtons = [
    {
      key: 'favorites',
      title: '내 인간지표',
      subtitle: '관심 종목 변동 알림 신청하기',
      onClick: handleClickMyHumanzipyo,
      items: [
        { title: '관심 종목', content: `${FavoriteCount}개` },
        { title: '변동알림', content: `${AlarmCount}개` },
      ],
    },
    {
      key: 'lab',
      title: '모의매수 실험 현황',
      subtitle: '내 투자 타이밍은 적절할까',
      onClick: handleClickMyExperiment,
      items: [
        { title: '실험 중', content: `${experimentStatus?.progressTradeCount ?? 0}개` },
        { title: '총 실험 수', content: `${experimentStatus?.totalTradeCount ?? 0}개` },
        { title: '성공률', content: `${(experimentStatus?.successRate ?? 0).toFixed(1)}%` },
      ],
    },
  ];

  const handleClickInstagram = () => {
    window.open('https://www.instagram.com/humanzipyo/');
  };

  const handleClickLinkedIn = () => {
    window.open('https://www.linkedin.com/company/humanzipyo');
  };

  const handleClickThreads = () => {
    window.open('https://www.threads.net/@humanzipyo');
  };

  const defaultButtons = [
    { text: '서비스 가이드', onClick: handleClickServiceGuide },
    { text: '비즈니스 제안', onClick: handleClickBusinessProposal },
    { text: '고객센터', onClick: handleClickServiceCenter },
    { text: '서비스 이용약관', onClick: handleClickTermUse },
    { text: '개인정보 처리방침', onClick: handleClickTermPrivacy },
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
          detailButtons.map(({ key, title, subtitle, onClick, items }) => (
            <MyPageDetailContainer onClick={onClick} key={`MYPAGE_DETAIL_${key}`}>
              <MyPageDetailTitle>
                <p>
                  {title} <span>| {subtitle}</span>
                </p>
                <RightArrowThickSVG />
              </MyPageDetailTitle>
              <MyPageDetailContents>
                {items.map((item, idx) => (
                  <MyPageDetailItem key={`MYPAGE_DETAIL_${key}_ITEM_${idx}`}>
                    <p className="title">{item.title}</p>
                    <p className="content">{item.content}</p>
                  </MyPageDetailItem>
                ))}
              </MyPageDetailContents>
            </MyPageDetailContainer>
          ))}
        <MyPageDefaultContainer>
          {defaultButtons.map((button) => (
            <MyPageDefaultItem key={`DEFAULT_${button.text}`} onClick={button.onClick}>
              {button.text}
              <RightArrowThickSVG />
            </MyPageDefaultItem>
          ))}
        </MyPageDefaultContainer>
        {isLogin && (
          <MyPageDefaultContainer>
            {authButtons.map((button) => (
              <MyPageDefaultItem className="sub" key={`AUTH_${button.text}`} onClick={button.onClick}>
                {button.text}
                <RightArrowThickSVG />
              </MyPageDefaultItem>
            ))}
          </MyPageDefaultContainer>
        )}
        <span className="divider" />
        <MyPageSNSContainer>
          <InstagramSVG onClick={handleClickInstagram} />
          <LinkedInSVG onClick={handleClickLinkedIn} />
          <ThreadSVG onClick={handleClickThreads} />
        </MyPageSNSContainer>
      </MyPageContents>
    </MyPageContainer>
  );
};

export default MyPage;
