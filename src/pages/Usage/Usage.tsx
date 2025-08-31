import { useEffect } from 'react';
import { detectPlatform } from '@utils/Detector';
import AddToHomeAndroidPNG from '@assets/PWA/Android/AddToHome.png';
import ShareButtonAndroidPNG from '@assets/PWA/Android/ShareButton.png';
import AddToHomeIOSPNG from '@assets/PWA/IOS/AddToHome.png';
import ShareButtonIOSPNG from '@assets/PWA/IOS/ShareButton.png';
import RunAppPNG from '@assets/PWA/RunApp.png';
import {
  UsageContainer,
  UsageStepContainer,
  UsageStepItemContainer,
  UsageStepItemTitle,
  UsageTitle,
} from './Usage.Style';

const Usage = () => {
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

  const isIOS = detectPlatform() === 'iOS';

  const usageSteps = [
    {
      title: isIOS ? 'safari 접속, 하단 공유 버튼 탭' : 'chrome 접속, 상단 우측 버튼 탭',
      image: isIOS ? ShareButtonIOSPNG : ShareButtonAndroidPNG,
    },
    {
      title: '홈 화면에 추가',
      image: isIOS ? AddToHomeIOSPNG : AddToHomeAndroidPNG,
    },
    {
      title: '생성된 앱 실행',
      image: RunAppPNG,
    },
  ];

  return (
    <UsageContainer>
      <UsageTitle>
        홈화면에 앱을 <br />
        추가하세요.
      </UsageTitle>
      <UsageStepContainer>
        {usageSteps.map((step, index) => (
          <UsageStepItemContainer key={index}>
            <UsageStepItemTitle>
              <p className="index">{index + 1}</p>
              <p className="title">{step.title}</p>
            </UsageStepItemTitle>
            <img src={step.image} />
          </UsageStepItemContainer>
        ))}
      </UsageStepContainer>
    </UsageContainer>
  );
};

export default Usage;
