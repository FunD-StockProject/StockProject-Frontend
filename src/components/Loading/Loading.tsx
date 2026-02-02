import LoadingMOV from '@assets/Loading.mov';
import LoadingWEBM from '@assets/Loading.webm';
import BackgroundSVG from '@assets/background.svg?react';
import { LoadingContainer, LoadingContent } from './Loading.Style';

const Loading = ({ isLoading, title, desc }: { isLoading?: boolean; title: string; desc?: string }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <LoadingContainer bottom="96px">
      <BackgroundSVG />
      <LoadingContent>
        <video autoPlay loop muted playsInline preload="auto">
          <source src={LoadingMOV} type='video/quicktime; codecs="hvc1"' />
          <source src={LoadingWEBM} type="video/webm" />
          <p>브라우저가 비디오 태그를 지원하지 않습니다.</p>
        </video>
        <div>
          <p className="title">{title}</p>
          {desc && <p className="desc">{desc}</p>}
        </div>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading;
