import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectPlatform } from '@utils/Detector';
import Android from '@components/PWAUsage/Android/Android';
import leftArrow from '../../assets/leftArrow.svg';
import IOS from '../../components/PWAUsage/iOS/IOS';
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
      {detectPlatform() === 'iOS' && <IOS />}
      {detectPlatform() === 'Android' && <Android />}
    </UsageContainer>
  );
};

export default Usage;
