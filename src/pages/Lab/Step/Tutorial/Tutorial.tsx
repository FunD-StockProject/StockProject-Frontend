import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import LabTutorial1PNG from '@assets/lab/labTutorial1.png';
import LabTutorial2PNG from '@assets/lab/labTutorial2.png';
import LabTutorial3PNG from '@assets/lab/labTutorial3.png';
import { StepButtonContainer } from '../Step.Style';
import {
  LabTutorialContainer,
  LabTutorialItemContaienr,
  LabTutorialListContainer,
  TutorialItemTitleContainer,
} from './Tutorial.Style';

const labTutorialList = [
  {
    title: (
      <>
        매수하고 싶은 <wbr />
        종목 담기
      </>
    ),
    img: LabTutorial1PNG,
    description: (
      <>
        현재 주가와 인간지표를 확인하고, <br />
        매수하고 싶은 종목을 <wbr />
        포트폴리오에 담아보세요
      </>
    ),
  },
  {
    title: <>5영업일 후 결과 확인</>,
    img: LabTutorial2PNG,
    description: (
      <>
        5영업일 후 수익률을 통해
        <br />내 진입타이밍을 점검해보세요
      </>
    ),
  },
  {
    title: (
      <>
        결과지에 적힌 <wbr />
        심리패턴 확인하기
      </>
    ),
    img: LabTutorial3PNG,
    description: (
      <>
        나는 과연 어떤 인간 지표인지, <wbr />
        다른 사용자와 비교를 통해 <br />
        잠재된 투자 심리패턴을 분석해드려요
      </>
    ),
  },
];

const LabTutorial = () => {
  const navigate = useNavigate();

  const handlePrevStep = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    navigate(webPath.labStep(), { state: { step: 1 } });
  };

  return (
    <LabTutorialContainer>
      <LabTutorialListContainer>
        <span className="divider" />
        {labTutorialList.map((e, i) => (
          <LabTutorialItemContaienr>
            <TutorialItemTitleContainer>
              <p className="index">STEP {i + 1}</p>
              <span className="divider" />
              <p className="text">{e.title}</p>
            </TutorialItemTitleContainer>
            <img src={e.img} loading="lazy" />
            <p>{e.description}</p>
          </LabTutorialItemContaienr>
        ))}
        <p>
          (주의) 본 기능은 실제 투자가 아닌 <wbr />
          "가상"으로 진행되는 모의매수 기능입니다.
        </p>
      </LabTutorialListContainer>
      <StepButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep}>다음</button>
      </StepButtonContainer>
    </LabTutorialContainer>
  );
};

export default LabTutorial;
