import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { TermKey } from '@ts/Term';
import { detectPlatform } from '@utils/Detector';
import { openExternalLink } from '@utils/openExternalLink';
import { webPath } from '.';

const useRouter = () => {
  const navigate = useNavigate();

  const navToBack = () => navigate(-1);

  const navToHome = () => navigate(webPath.home);
  const navToStock = (name: string, country: StockCountryKey, options?: { replace?: boolean }) => {
    navigate(`${webPath.stock}?name=${name}&country=${country}`, options);
  };
  const navToFavorites = () => navigate(webPath.favorites);
  const navToShortView = () => navigate(webPath.shortView);
  const navToLab = () => navigate(webPath.lab);
  const navToMyPage = () => navigate(webPath.mypage);
  const navToNotification = () => navigate(webPath.notification);
  const navToUsage = () => navigate(webPath.usage);

  const navToEditProfile = () => navigate(webPath.editProfile);
  const navToEditProfileDone = () => navigate(webPath.editProfileDone);
  const navToWithdraw = () => navigate(webPath.withdraw);
  const navToWithdrawDone = () => navigate(webPath.withdrawDone);
  const navToRegisterDone = () => navigate(webPath.registerDone);

  const navToLabStep = (step: number) => navigate(webPath.labStep, { state: { step } });

  const navToLabRecordSheet = () => navigate(webPath.labRecordSheet);

  const navToAbout = () => navigate(webPath.about);
  const navToTerm = (termKey: TermKey) => navigate(`${webPath.term}?term=${termKey}`);

  const openBusinessProposal = () => {
    window.location.href = 'mailto:humanzipyo2024@gmail.com?cc=anyany3151@naver.com';
  };
  const openServiceCenter = () => {
    openExternalLink('https://forms.gle/eus2xRNHGxbSBaAK9');
  };
  const openInstagram = () => {
    openExternalLink('https://www.instagram.com/humanzipyo/');
  };
  const openAppDownload = () => {
    const platform = detectPlatform();

    if (platform === 'Android') {
      openExternalLink('https://play.google.com/store/apps/details?id=com.durumi99.humanzipyoapp');
      return;
    }

    if (platform === 'iOS') {
      openExternalLink('https://apps.apple.com/kr/app/%EC%9D%B8%EA%B0%84%EC%A7%80%ED%91%9C/id6752467487');
    }
  };
  const openLinkedIn = () => {
    openExternalLink('https://www.linkedin.com/company/humanzipyo');
  };
  const openThreads = () => {
    openExternalLink('https://www.threads.net/@humanzipyo');
  };

  return {
    navToBack,
    navToHome,
    navToStock,
    navToFavorites,
    navToShortView,
    navToLab,
    navToMyPage,
    navToNotification,
    navToUsage,
    navToEditProfile,
    navToEditProfileDone,
    navToWithdrawDone,
    navToAbout,
    navToTerm,
    navToWithdraw,
    navToLabStep,
    navToLabRecordSheet,
    openBusinessProposal,
    openServiceCenter,
    openInstagram,
    openAppDownload,
    openLinkedIn,
    openThreads,
    navToRegisterDone,
  };
};

export default useRouter;
