import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import LoadingWEBM from '@assets/Loading.webm';
import BackgroundSVG from '@assets/background.svg?react';

const LoadingContainer = styled.div(
  ({ top, bottom }: { top?: string; bottom?: string }) => ({
    top: top ?? 0,
    bottom: bottom ?? 0,
  }),
  {
    position: 'fixed',
    bottom: '96px',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.4) 0%, #101010DD 81.02%)',
    backdropFilter: 'blur(2.5px)', // Note: backdrop-filter has minimal browser support
    zIndex: 9999,

    ['>svg']: {
      position: 'absolute',
      width: '110%',
      height: 'auto',
      right: '0',
      top: '0',
    },
  },
);

const LoadingContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',

  ['>video']: {
    width: '80px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        ...theme.font.title20Semibold,
        color: theme.colors.sub_gray4,
      },

      ['&.desc']: {
        ...theme.font.body16Regular,
        color: theme.colors.sub_gray6,
      },
    },
  },
});

const Loading = ({ isLoading, title, desc }: { isLoading?: boolean; title: string; desc?: string }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <LoadingContainer bottom="96px">
      <BackgroundSVG />
      <LoadingContent>
        <video src={LoadingWEBM} autoPlay loop muted playsInline />
        <div>
          <p className="title">{title}</p>
          {desc && <p className="desc">{desc}</p>}
        </div>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default Loading;
