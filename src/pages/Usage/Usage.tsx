import { useEffect } from 'react';
import { detectPlatform } from '@utils/Detector';
import useLocalStorageState from '@hooks/useLocalStorageState';
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
  const [, setLastVisit] = useLocalStorageState<string>('last_visit_page');

  useEffect(() => {
    setLastVisit(new Date(new Date().getTime() - (new Date().getTime() % (1000 * 60 * 60 * 24))).toDateString());
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
