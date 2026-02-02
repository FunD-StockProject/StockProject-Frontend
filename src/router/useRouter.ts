import { useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { TermKey } from '@ts/Term';
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

  const openBusinessProposal = () => window.open('mailto:humanzipyo2024@gmail.com?cc=anyany3151@naver.com');
  const openServiceCenter = () => window.open('https://forms.gle/eus2xRNHGxbSBaAK9');
  const openInstagram = () => window.open('https://www.instagram.com/humanzipyo/');
  const openLinkedIn = () => window.open('https://www.linkedin.com/company/humanzipyo');
  const openThreads = () => window.open('https://www.threads.net/@humanzipyo');

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
    openLinkedIn,
    openThreads,
    navToRegisterDone,
  };
};

export default useRouter;
