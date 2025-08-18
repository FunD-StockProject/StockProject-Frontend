import styled from "@emotion/styled";
import { theme } from "@styles/themes";

export const Overlay = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  zIndex: 50,
  color: theme.colors.sub_black,
  // 배경 반투명
  // background: 'rgba(255, 255, 255, 0.90)',

  // 블러 효과 (투명 배경 위에 적용됨)
  backdropFilter: 'blur(10px)',

  // 사파리 지원용
  WebkitBackdropFilter: 'blur(10px)',
});


export const Title = styled.div({
  ...theme.font.title20Semibold,
  color: theme.colors.grayscale20,
  textAlign: 'center',
  margin: '0 0 12px 0',
});

export const Description = styled.div({
  ...theme.font.body14Medium,
  color: theme.colors.grayscale40,
  textAlign: 'center',
  margin: '0 0 20px 0',
});


export const PrimaryButton = styled.button({
  ...theme.font.body18Semibold,
  color: theme.colors.sub_gray11,
  appearance: 'none',
  border: 0,
  padding: '10px 24px',
  borderRadius: '500px',
  boxSizing: 'border-box',
  background: theme.colors.sub_white,
});