import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@hooks/useIsMobile';
import useLocalStorageState from '@hooks/useLocalStorageState';
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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [lastVisit, setLastVisit] = useLocalStorageState<string>('last_visit_page');
  const [showPopUp, setShowPopUp] = useState(
    (() => {
      if (!lastVisit) {
        return true;
      }

      const diff = new Date().getTime() - new Date(lastVisit).getTime();
      if (diff < 1000 * 60 * 60 * 24) {
        return false;
      }

      return true;
    })(),
  );

  const closePopUp24Hours = () => {
    setLastVisit(new Date(new Date().getTime() - (new Date().getTime() % (1000 * 60 * 60 * 24))).toDateString());
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
            <img src={PWAPNG} loading="lazy" width={'140px'} />
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
