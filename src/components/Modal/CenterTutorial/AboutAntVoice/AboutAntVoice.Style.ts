import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const AntVoiceImage = styled.img({
  width: 'auto',
  objectFit: 'cover',
  margin: '0 16px',
  boxSizing: 'border-box',
});

const AntVoiceDescription = styled.div({
  ...theme.font.detail12Semibold,
  color: theme.colors.sub_gray11,
  padding: '16px 12px',
  background: theme.colors.sub_white,
  borderRadius: '8px',
  margin: '0 16px',
  wordBreak: 'keep-all',
});

export { AntVoiceImage, AntVoiceDescription };
