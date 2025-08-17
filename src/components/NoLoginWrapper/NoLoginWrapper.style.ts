import styled from "@emotion/styled";
import { theme } from "@styles/themes";

export const Overlay = styled.div({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  zIndex: 50,
  color: theme.colors.sub_black,
  background: 'rgba(255, 255, 255, 0.9)',
});


export const Title = styled.div({
  textAlign: 'center',
  margin: '0 0 12px 0',
});

export const Description = styled.div({
  textAlign: 'left',
  margin: '0 0 20px 0',
});


export const PrimaryButton = styled.button({
  appearance: 'none',
  border: 0,
  margin: '0 50px',
  padding: '14px 16px',
  width: 'calc(100% - 80px)',
  boxSizing: 'border-box',
  background: theme.colors.sub_gray4,
});