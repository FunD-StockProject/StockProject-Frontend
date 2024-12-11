import {
  Backdrop,
  CloseButton,
  ConfirmButton,
  PopUpContainer,
  PopUpContent,
  PopUpDetail,
  PopUpDetailContainer,
  PopUpDetailNumber,
  PopUpDetailWord,
  PopUpImage,
  PopUpTitle,
} from './AntVoicePopUp.style';

const AntiVoicePopUp = ({ onClose }: { onClose: () => void }) => (
  <>
    <Backdrop onClick={onClose} />
    <PopUpContainer>
      <CloseButton onClick={onClose}>✕</CloseButton>
      <PopUpTitle>개미들의 목소리란?</PopUpTitle>
      <PopUpContent>
        각종 커뮤니티의 댓글을 한눈에 볼 수 있는 워드클라우드에요.
        <PopUpImage>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>1</PopUpDetailNumber>
            <PopUpDetailWord>
              가장 많이
              <br /> 언급된 단어
            </PopUpDetailWord>
          </div>

          <div>
            <PopUpDetailNumber color={'grayscale80'}>2</PopUpDetailNumber>
            <PopUpDetailWord color={'grayscale60'} fontSize={30} textAlign={'right'}>
              상대적으로 적게
              <br /> 언급된 단어
            </PopUpDetailWord>
          </div>
        </PopUpImage>
        <PopUpDetailContainer>
          <PopUpDetail>
            <PopUpDetailNumber>1</PopUpDetailNumber>
            <span>단어의 색이 ‘파란색’이면 긍정적으로 언급된 단어예요.</span>
          </PopUpDetail>
          <PopUpDetail>
            <PopUpDetailNumber>2</PopUpDetailNumber>
            <span>크기가 클수록 각종 커뮤니티에서 가장 많이 언급된 단어예요.</span>
          </PopUpDetail>
        </PopUpDetailContainer>
      </PopUpContent>
      <ConfirmButton onClick={onClose}>이해했어요</ConfirmButton>
    </PopUpContainer>
  </>
);

export default AntiVoicePopUp;
