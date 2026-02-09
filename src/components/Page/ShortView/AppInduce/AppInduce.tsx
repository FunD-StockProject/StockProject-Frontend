import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import ShortViewAppPNG from '@assets/design/shortViewApp.png';

const AppInduceContainer = styled.div({
  width: '100%',
  height: 'calc(100% - 96px)',
  position: 'fixed',
  background: 'linear-gradient(180deg, rgba(16, 16, 16, 0.4) 0%, #101010 47.97%)',
  backdropFilter: 'blur(2.5px)',
  zIndex: '10',
  top: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: '20px',
  boxSizing: 'border-box',
});

const AppInduceTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '36px 0',

  ['>p']: {
    margin: '0',
    textAlign: 'center',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.description']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
    },
  },
});

const AppInduceContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '300px',
  padding: '0 16px',
  boxSizing: 'border-box',
  alignItems: 'center',

  ['>img']: {
    width: '215px',
    height: 'auto',
    filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.8))',
  },

  ['button']: {
    position: 'relative',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray11,
    background: theme.colors.sub_white,
    borderRadius: '999px',
    padding: '10px 28px',
    border: 'none',
    width: '100%',
  },

  ['>p']: {
    ...theme.font.body14Regular,
    color: theme.colors.sub_gray6,
    margin: '12px 0 0',
  },
});

const ShortViewAppInduce = () => {
  const handleDownload = () => {
    // TODO: 실제 앱 다운로드 링크로 이동
    // 예: window.location.href = 'https://apps.apple.com/...' 또는 'https://play.google.com/...'
  };

  return (
    <AppInduceContainer>
      <AppInduceTitle>
        <p className="title">
          인간지표 앱을 설치하고
          <br /> 더 다양한 기능을 사용해보세요!
        </p>
        <p className="description">숏뷰 기능은 앱에서만 사용가능해요</p>
      </AppInduceTitle>
      <AppInduceContent>
        <img
          style={{
            width: '215px',
          }}
          src={ShortViewAppPNG}
        />
        <button onClick={handleDownload}>앱 다운로드 바로가기</button>
        <p>괜찮아요 모바일 웹으로 볼게요</p>
      </AppInduceContent>
    </AppInduceContainer>
  );
};

export default ShortViewAppInduce;
