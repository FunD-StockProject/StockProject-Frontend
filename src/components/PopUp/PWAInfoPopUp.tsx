import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useIsMobile';
import { webPath } from '@router/index';
import { ImgDiv } from '@components/Common/Common';
import PWAPNG from '@assets/PWA.png';
import {
  Backdrop,
  ButtonContainer,
  Close24HourButton,
  CloseButton,
  ConfirmButton,
  DetailContainer,
  HeaderText,
  NormalText,
  PWAInfoContainer,
  TextArea,
} from './PWAinfoPopUp.style';

const PWAInfoPopUp = ({}: {}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const VISITED = localStorage.getItem('LAST_VISIT_POPUP'); // 마지막 방문 시간을 로컬 스토리지에서 가져옴

    const handleMainPop = () => {
      if (VISITED) {
        const lastVisit = new Date(VISITED);
        const diff = today.getTime() - lastVisit.getTime();
        const diffHours = diff / (1000 * 60 * 60);

        if (diffHours < 24) {
          return;
        }
      }

      setShowPopUp(true);
    };

    handleMainPop();
  }, []);

  const closePopUp24Hours = () => {
    const today = new Date();
    localStorage.setItem('LAST_VISIT_POPUP', today.toISOString());
    setShowPopUp(false);
  };

  const closePopUp = () => {
    setShowPopUp(false);
  };

  const confirmClick = () => {
    setShowPopUp(false);
    navigate(webPath.usage());
  };

  return (
    isMobile &&
    showPopUp && (
      <>
        <Backdrop onClick={closePopUp} />
        <PWAInfoContainer>
          <CloseButton onClick={closePopUp}>✕</CloseButton>
          <DetailContainer>
            <TextArea>
              <HeaderText>
                1초만에
                <br /> 앱처럼 사용하기
              </HeaderText>
              <NormalText>
                누구보다 편하게
                <br />
                인간지표를 누려보세요.
              </NormalText>
            </TextArea>
            <ImgDiv src={PWAPNG} width={'140px'} />
          </DetailContainer>
          <ButtonContainer>
            <Close24HourButton onClick={closePopUp24Hours}>24시간 동안 안보기</Close24HourButton>
            <ConfirmButton onClick={confirmClick}>사용법 보기</ConfirmButton>
          </ButtonContainer>
        </PWAInfoContainer>
      </>
    )
  );
};

export default PWAInfoPopUp;
