import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectBrowser, detectPlatform } from '@utils/Detector';
import leftArrow from '../../assets/leftArrow.svg';
import IOSSafari from '../../components/PWAUsage/iOSSafari/IOSSafari';
import { BackButton, UsageContainer } from './Usage.Style';

const Usage = () => {
  const navigate = useNavigate();

  const setVisibleTime = () => {
    const now = new Date();
    const fiveMinAgo = new Date(now);

    fiveMinAgo.setHours(now.getHours() - 23);
    fiveMinAgo.setMinutes(now.getMinutes() - 55);

    localStorage.setItem('LAST_VISIT_POPUP', fiveMinAgo.toISOString());
  };

  useEffect(() => {
    setVisibleTime();
  }, []);

  return (
    <UsageContainer>
      <BackButton src={leftArrow} onClick={() => navigate(-1)} />
      {detectPlatform() === 'iOS' && detectBrowser() === 'Safari' && <IOSSafari />}
      {detectPlatform() === 'iOS' && detectBrowser() === 'Chrome' && <IOSSafari />}
      {detectPlatform() === 'Android' && <IOSSafari />}
    </UsageContainer>
  );
};

export default Usage;
