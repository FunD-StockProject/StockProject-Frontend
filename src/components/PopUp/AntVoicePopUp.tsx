import { theme } from '@styles/themes';
import {
  Backdrop,
  CloseButton,
  ConfirmButton,
  PopUpContainer,
  PopUpContent,
  PopUpDetail,
  PopUpDetailContainer,
  PopUpDetailNumber,
  PopUpImage,
  PopUpTitle,
} from './AntVoicePopUp.style';

const AntiVoicePopUp = ({ onClose }: { onClose: () => void }) => (
  <>
    <Backdrop onClick={onClose} />
    <PopUpContainer>
      <CloseButton onClick={onClose}>✖</CloseButton>
      <PopUpTitle>개미들의 목소리란?</PopUpTitle>
      <PopUpContent>
        각종 커뮤니티의 댓글을 한눈에 볼 수 있는 워드클라우드에요.
        <PopUpImage>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>1</PopUpDetailNumber>
            <p style={{ color: theme.colors.primary30 }}>긍정단어</p>
          </div>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>2</PopUpDetailNumber>
            <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 0 }}>
              <span style={{ fontSize: '30px' }}>
                가장많이 <br />
                언급된 단어
              </span>
              <span style={{ color: theme.colors.grayscale60, fontSize: '8px' }}>상대적으로 적게 언급된 단어</span>
            </p>
          </div>
          <div>
            <PopUpDetailNumber color={'grayscale80'}>3</PopUpDetailNumber>
            <p style={{ color: '#FF6058' }}>부정단어</p>
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
          <PopUpDetail>
            <PopUpDetailNumber>3</PopUpDetailNumber>
            <span>단어의 색이 ‘빨간색’이면 부정적으로 언급된 단어예요.</span>
          </PopUpDetail>
        </PopUpDetailContainer>
      </PopUpContent>
      <ConfirmButton onClick={onClose}>이해했어요</ConfirmButton>
    </PopUpContainer>
  </>
);

export default AntiVoicePopUp;
