import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import AntVoicePNG from '@assets/design/antVoice.png';
import { ModalContainer, ModalContent, ModalTitleContainer } from '../CenterTutotial.Style';

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

const AboutAntVoice = () => {
  return (
    <ModalContainer>
      <ModalTitleContainer>
        <p>자주 언급되는 단어란?</p>
      </ModalTitleContainer>
      <ModalContent>
        <AntVoiceImage src={AntVoicePNG} />
        <AntVoiceDescription>
          각종 커뮤니티 댓글을 한눈에 볼 수 있는 워드클라우드입니다. 크기가 클수록 각종 커뮤니티에서 가장 많이 언급된
          단어입니다.
        </AntVoiceDescription>
      </ModalContent>
    </ModalContainer>
  );
};

export default AboutAntVoice;
