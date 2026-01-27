import { useState } from 'react';
import useLocalStorageState from '@hooks/useLocalStorageState';
import AlarmIcon from '@assets/appDownload/appDownloadAlarm.svg?react';
import LightningIcon from '@assets/appDownload/appDownloadLightning.svg?react';
import PhoneIcon from '@assets/appDownload/appDownloadPhone.svg?react';
import {
  Backdrop,
  ButtonContainer,
  CloseButton,
  DownloadButton,
  FeatureDescription,
  FeatureItem,
  FeatureLabel,
  FeatureTextContainer,
  FeaturesContainer,
  PopupContainer,
  PopupTextContainer,
  SubTitle,
  Title,
  TitleContainer,
} from './AppInstallPopUp.style';

interface AppInstallPopUpProps {
  onClose?: () => void;
  onDownload?: () => void;
}

const AppInstallPopUp = ({ onClose, onDownload }: AppInstallPopUpProps) => {
  const [lastShown, setLastShown] = useLocalStorageState<string>('app_install_popup_last_shown');
  const [showPopUp, setShowPopUp] = useState(
    (() => {
      if (!lastShown) {
        return true;
      }

      const diff = new Date().getTime() - new Date(lastShown).getTime();
      // 24시간 (1일) 지났으면 다시 보여주기
      if (diff < 1000 * 60 * 60 * 24) {
        return false;
      }

      return true;
    })(),
  );

  const handleClose = () => {
    setLastShown(new Date().toISOString());
    setShowPopUp(false);
    onClose?.();
  };

  const handleDownload = () => {
    setShowPopUp(false);
    onDownload?.();
    // TODO: 실제 앱 다운로드 링크로 이동
    // 예: window.location.href = 'https://apps.apple.com/...' 또는 'https://play.google.com/...'
  };

  const handleBackdropClick = () => {
    handleClose();
  };

  if (!showPopUp) {
    return null;
  }

  return (
    <Backdrop onClick={handleBackdropClick}>
      <PopupContainer onClick={(e) => e.stopPropagation()}>
        <PopupTextContainer>
          <TitleContainer>
            <SubTitle>앱에서 더 많은 기능을 경험해보세요!</SubTitle>
            <Title>인간지표 앱 출시!</Title>
          </TitleContainer>

          <FeaturesContainer>
            <FeatureItem>
              <AlarmIcon />
              <FeatureTextContainer>
                <FeatureLabel>알림 기능으로</FeatureLabel>
                <FeatureDescription>시장 변화를 놓치지 않고!</FeatureDescription>
              </FeatureTextContainer>
            </FeatureItem>

            <FeatureItem>
              <LightningIcon />
              <FeatureTextContainer>
                <FeatureLabel>더 쉽고 빠르게</FeatureLabel>
                <FeatureDescription>지표를 확인하고!</FeatureDescription>
              </FeatureTextContainer>
            </FeatureItem>

            <FeatureItem>
              <PhoneIcon />
              <FeatureTextContainer>
                <FeatureLabel>앱 전용 기능까지</FeatureLabel>
                <FeatureDescription>숏뷰기능으로 더 유용하게!</FeatureDescription>
              </FeatureTextContainer>
            </FeatureItem>
          </FeaturesContainer>
        </PopupTextContainer>

        <ButtonContainer>
          <CloseButton onClick={handleClose}>닫기</CloseButton>
          <DownloadButton onClick={handleDownload}>앱 다운받기</DownloadButton>
        </ButtonContainer>
      </PopupContainer>
    </Backdrop>
  );
};

export default AppInstallPopUp;
