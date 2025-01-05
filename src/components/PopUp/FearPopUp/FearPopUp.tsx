import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle, StyledSpan } from '../CommonPopUp.style';

const FearPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>공포지수란?</PopUpTitle>
    <PopUpContent>
      <div>
        공포지수는 시장의 7가지 요인을 분석하여
        <StyledSpan> 현재 투자자의 심리를 극단적인 공포(0)부터 극단적인 탐욕(100)</StyledSpan>에 이르기까지 가늠하는 심리지표입니다.
      </div>
    </PopUpContent>
  </CommonPopUp>
);

export default FearPopUp;
