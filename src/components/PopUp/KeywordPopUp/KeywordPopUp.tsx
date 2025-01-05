import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle, StyledSpan } from '../CommonPopUp.style';

const KeywordPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>가장 많이 언급되고 있는 키워드란?</PopUpTitle>
    <PopUpContent>
      <div>
        인간지표는 다양한 커뮤니티에서 수집한 데이터 기반의 워드클라우드(개미들의 목소리)를 제공합니다.
        <StyledSpan>현재 개미들이 가장 많이 언급하는 단어를 한눈에 확인</StyledSpan>할 수 있습니다.
      </div>
    </PopUpContent>
  </CommonPopUp>
);

export default KeywordPopUp;
