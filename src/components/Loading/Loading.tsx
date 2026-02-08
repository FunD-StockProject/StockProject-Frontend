import BackgroundSVG from '@assets/background.svg?react';
import LoadingGIF from '@assets/loading.gif';
import { LoadingContainer, LoadingContent } from './Loading.Style';

const Loading = ({ isLoading, title, desc }: { isLoading?: boolean; title: string; desc?: string }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <LoadingContainer bottom="96px">
      <BackgroundSVG />
      <LoadingContent>
        <img src={LoadingGIF} />
        <div>
          <p className="title">{title}</p>
          {desc && <p className="desc">{desc}</p>}
        </div>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading;
