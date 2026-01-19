import { useSocialAuth } from '@hooks/useSocialAuth';
import BlueAlert from '@assets/blueAlert.svg?react';
import Loading from '@assets/loading.png';
import { OAuthCallbackContainer, StatusDesc, StatusTitle } from './OAuthCallback.Style';

const OAuthCallback = () => {
  const { error } = useSocialAuth();

  return (
    <OAuthCallbackContainer>
      {error ? (
        <>
          <BlueAlert />
          <StatusTitle>앗! 로그인에 실패했어요 😭</StatusTitle>
          <StatusDesc>로그인을 다시 시도해주세요</StatusDesc>
        </>
      ) : (
        <>
          <img src={Loading} alt="Loading" />
          <StatusTitle>잠시만 기다려주세요</StatusTitle>
          <StatusDesc>로그인 정보를 불러오고 있어요</StatusDesc>
        </>
      )}
    </OAuthCallbackContainer>
  );
};

export default OAuthCallback;
