import { MESSAGE_TYPES } from '@config/webview';
import useAuthInfo from '@hooks/useAuthInfo';
import useRouter from '@router/useRouter';
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
  const { isLogin, accessToken, clearAuthInfo } = useAuthInfo();
  const { data: favorites = [] } = useBookmarkListQuery();
  const { data: experimentStatus } = useExperimentStatusQuery();

  const FavoriteCount = favorites?.length ?? 0;
  const AlarmCount = favorites?.filter((e) => e.isNotificationOn).length ?? 0;

  const {
    navToAbout,
    navToTerm,
    navToWithdraw,
    navToFavorites,
    navToLab,
    openBusinessProposal,
    openServiceCenter,
    openInstagram,
    openLinkedIn,
    openThreads,
  } = useRouter();

  const handleLogout = async () => {
    const isWebView = !!(window as any).ReactNativeWebView;

    if (isWebView) {
      // WebView: 앱에 로그아웃 메시지 전송 (앱이 모든 로그아웃 처리)
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: MESSAGE_TYPES.LOGOUT,
          token: accessToken,
        }),
      );
      // 앱에서 처리 후 웹뷰를 새로고침하거나 홈으로 이동시킬 것
    } else {
      // 브라우저: 웹에서 직접 로그아웃 처리
      await fetchAuthLogout();
    }

    clearAuthInfo();
    window.location.href = '/';
  };

  const [LogoutModal, openLogoutModal] = ConfirmModal({
    title: '정말 로그아웃 하시겠어요?',
    onConfirm: handleLogout,
  });

  const detailButtons = [
    {
      key: 'favorites',
      title: '내 인간지표',
      subtitle: '관심 종목 변동 알림 신청하기',
      onClick: navToFavorites,
      items: [
        { title: '관심 종목', content: `${FavoriteCount}개` },
        { title: '변동알림', content: `${AlarmCount}개` },
      ],
    },
    {
      key: 'lab',
      title: '모의매수 실험 현황',
      subtitle: '내 투자 타이밍은 적절할까',
      onClick: navToLab,
      items: [
        { title: '실험 중', content: `${experimentStatus?.progressTradeCount ?? 0}개` },
        { title: '총 실험 수', content: `${experimentStatus?.totalTradeCount ?? 0}개` },
        { title: '성공률', content: `${(experimentStatus?.successRate ?? 0).toFixed(1)}%` },
      ],
    },
  ];

  const defaultButtons = [
    { text: '서비스 가이드', onClick: navToAbout },
    { text: '비즈니스 제안', onClick: openBusinessProposal },
    { text: '고객센터', onClick: openServiceCenter },
    { text: '서비스 이용약관', onClick: () => navToTerm('agreeTerm') },
    { text: '개인정보 처리방침', onClick: () => navToTerm('agreePrivacy') },
  ];

  const authButtons = [
    { text: '로그아웃', onClick: openLogoutModal },
    { text: '계정탈퇴', onClick: navToWithdraw },
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
          <InstagramSVG onClick={openInstagram} />
          <LinkedInSVG onClick={openLinkedIn} />
          <ThreadSVG onClick={openThreads} />
        </MyPageSNSContainer>
      </MyPageContents>
    </MyPageContainer>
  );
};

export default MyPage;
