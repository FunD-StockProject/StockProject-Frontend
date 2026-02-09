import AntVoicePNG from '@assets/design/antVoice.png';
import { ModalContainer, ModalContent, ModalTitleContainer } from '../CenterTutotial.Style';
import { AntVoiceDescription, AntVoiceImage } from './AboutAntVoice.Style';

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
