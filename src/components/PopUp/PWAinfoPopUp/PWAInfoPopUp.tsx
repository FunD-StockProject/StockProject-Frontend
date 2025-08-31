import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useIsMobile';
import { webPath } from '@router/index';
import PWAPNG from '@assets/PWA/PWA.png';
import CrossSVG from '@assets/icons/cross.svg?react';
import {
  Backdrop,
  PWAInfoButtonContainer,
  PWAInfoContainer,
  PWAInfoContents,
  PWAInfoTextContainer,
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
          <CrossSVG onClick={closePopUp} />
          <PWAInfoContents>
            <PWAInfoTextContainer>
              <p className="title">
                1초만에 <br />
                앱처럼 사용하기
              </p>
              <p className="description">
                누구보다 편하게 <br />
                인간지표를 누려보세요.
              </p>
            </PWAInfoTextContainer>
            <img src={PWAPNG} width={'140px'} />
          </PWAInfoContents>
          <PWAInfoButtonContainer>
            <button className="white" onClick={closePopUp24Hours}>
              24시간 동안 안보기
            </button>
            <button className="blue" onClick={confirmClick}>
              사용법 보기
            </button>
          </PWAInfoButtonContainer>
        </PWAInfoContainer>
      </>
    )
  );
};

export default PWAInfoPopUp;
