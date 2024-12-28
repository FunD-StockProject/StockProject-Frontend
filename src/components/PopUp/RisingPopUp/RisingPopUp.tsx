import CommonPopUp from '../CommonPopUp';
import { PopUpContent, PopUpTitle, StyledSpan } from '../CommonPopUp.style';

const RisingPopUp = ({ onClose }: { onClose: () => void }) => (
  <CommonPopUp onClose={onClose}>
    <PopUpTitle>지금 민심 떡상중인 지표는?</PopUpTitle>
    <PopUpContent>
      <div>
        현재 개미들의 민심이 <StyledSpan>긍정적으로 급상승</StyledSpan>중인 종목입니다. 다양한 커뮤니티 데이터를 분석해 인간지표 점수를 계산했습니다.
      </div>
    </PopUpContent>
  </CommonPopUp>
);

export default RisingPopUp;
