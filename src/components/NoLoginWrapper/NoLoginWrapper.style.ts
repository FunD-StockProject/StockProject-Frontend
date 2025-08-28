import styled from '@emotion/styled';
import { theme } from '@styles/themes';

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
  backdropFilter: 'blur(30px)',
  WebkitBackdropFilter: 'blur(30px)',
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
  width: '220px',
});

export const SecondaryButton = styled.button({
  width: '220px',
  ...theme.font.body18Semibold,
  color: theme.colors.sub_gray5,
  appearance: 'none',
  border: 0,
  padding: '10px 24px',
  borderRadius: '500px',
  boxSizing: 'border-box',
  background: theme.colors.sub_gray9,
});
