import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import LabResultPNG from '@assets/lab/lab-result.png';
import { StepButtonContainer } from '../Step.Style';
import { LabDoneContainer } from './Done.Style';

const LabDone = () => {
  const navigate = useNavigate();

  const handleClickEscape = () => {
    navigate(webPath.lab());
  };

  return (
    <LabDoneContainer>
      <img src={LabResultPNG} />
      <StepButtonContainer>
        <button onClick={handleClickEscape}>매수현황 보러가기</button>
      </StepButtonContainer>
    </LabDoneContainer>
  );
};

export default LabDone;
