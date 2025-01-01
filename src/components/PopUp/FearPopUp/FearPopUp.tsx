import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle, StyledSpan } from '../CommonPopUp.style';

const FearPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>공포지수란?</PopUpTitle>
    <PopUpContent>
      <div>
        공포지수는 시장 변동성과 투자자들의 두려움을 나타내며, S&P 500 옵션의 향후 30일 예상 변동성 등을 기반으로 계산됩니다.
        <br />
        <StyledSpan>공포지수가 높으면 시장 불확실성이 크고 공포가 확산된 상태, 낮으면 시장이 안정적이고 낙관적인 상태를 뜻합니다. </StyledSpan>
      </div>
    </PopUpContent>
  </CommonPopUp>
);

export default FearPopUp;
