import { theme } from '@styles/themes';
import AntVoicePNG from '@assets/design/antVoice.png';
import CommonPopUp from '../CommonPopUp';
import { PopUpTitle } from '../CommonPopUp.style';

const AntiVoicePopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>자주 언급되는 단어란?</PopUpTitle>
    <img src={AntVoicePNG} />
    <div
      style={{
        margin: '0',
        ...theme.font.detail12Semibold,
        color: theme.colors.sub_gray11,
        padding: '16px 12px',
        background: theme.colors.sub_white,
        borderRadius: '8px',
      }}
    >
      각종 커뮤니티 댓글을 한눈에 볼 수 있는 워드클라우드입니다. 크기가 클수록 각종 커뮤니티에서 가장 많이 언급된
      단어입니다.
    </div>
  </CommonPopUp>
);

export default AntiVoicePopUp;
