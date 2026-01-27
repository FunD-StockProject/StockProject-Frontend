import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Backdrop = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const PopupContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px 20px 16px',
  gap: '28px',
  width: '324px',
  background: theme.colors.sub_white,
  borderRadius: '20px',
  zIndex: 1000,
  boxSizing: 'border-box',
});

const PopupTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 0,
  gap: '12px',
  width: '284px',
});

const TitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: 0,
  gap: '2px',
  width: '284px',
});

const SubTitle = styled.p({
  margin: 0,
  width: '284px',
  fontFamily: 'Pretendard',
  ...theme.font.body16Medium,
  color: theme.colors.sub_gray7,
});

const Title = styled.h2({
  margin: 0,
  width: '284px',
  fontFamily: 'Pretendard',
  ...theme.font.title20Semibold,
  color: theme.colors.sub_gray8,
});

const FeaturesContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  gap: '10px',
  width: '284px',
  borderRadius: '5px',
});

const FeatureItem = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 0,
  gap: '10px',
  width: '284px',
});

const IconWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  gap: '10px',
  width: '32px',
  height: '32px',
  background: theme.colors.sub_blue5,
  borderRadius: '500px',
  flexShrink: 0,

  ['svg']: {
    width: '18px',
    height: '18px',
    fill: theme.colors.sub_gray1,
  },
});

const FeatureTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: 0,
  flex: 1,
});

const FeatureLabel = styled.p({
  margin: 0,
  fontFamily: 'Pretendard',
  ...theme.font.detail12Medium,
  color: theme.colors.sub_gray7,
});

const FeatureDescription = styled.p({
  margin: 0,
  fontFamily: 'Pretendard',
  ...theme.font.body14Semibold,
  color: theme.colors.sub_gray10,
});

const ButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  gap: '12px',
  width: '284px',
});

const CloseButton = styled.button({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 0px',
  gap: '10px',
  width: '135px',
  height: '48px',
  background: theme.colors.sub_gray2,
  borderRadius: '500px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  ...theme.font.body18Semibold,
  textAlign: 'center',
  color: theme.colors.sub_gray8,
  outline: 'none',

  ['&:active']: {
    transform: 'scale(0.98)',
  },
});

const DownloadButton = styled.button({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 0px',
  gap: '10px',
  width: '137px',
  height: '48px',
  background: theme.colors.sub_blue6,
  borderRadius: '500px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  ...theme.font.body18Semibold,
  textAlign: 'center',
  color: theme.colors.grayscale10,
  outline: 'none',

  ['&:active']: {
    transform: 'scale(0.98)',
  },
});

export {
  Backdrop,
  PopupContainer,
  PopupTextContainer,
  TitleContainer,
  SubTitle,
  Title,
  FeaturesContainer,
  FeatureItem,
  IconWrapper,
  FeatureTextContainer,
  FeatureLabel,
  FeatureDescription,
  ButtonContainer,
  CloseButton,
  DownloadButton,
};
