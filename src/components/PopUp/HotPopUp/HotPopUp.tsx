import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle, StyledSpan } from '../CommonPopUp.style';

const HotPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>지금 가장 HOT한 지표는?</PopUpTitle>
    <PopUpContent>
      <div>
        현재 투자자들이 <StyledSpan>가장 주목하는 지표</StyledSpan>입니다. 인간지표의 검색어 순위를 기반으로 계산됩니다.
      </div>
    </PopUpContent>
  </CommonPopUp>
);

export default HotPopUp;
