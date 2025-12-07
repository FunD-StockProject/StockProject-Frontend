import { useLocation, useNavigate } from 'react-router-dom';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import LabCountry from './Country/Country';
import LabDone from './Done/Done';
import LabPurchase from './Purchase/Purchase';
import LabSearch from './Search/Search';
import { StepContainer, StepHeaderContainer, StepHeaderContents, StepTitleContainer } from './Step.Style';
import LabTutorial from './Tutorial/Tutorial';

const MAX_STEP = 4;

const LabStepHeader = ({ step }: { step: number }) => {
  const navigate = useNavigate();

  const title = step == 0 ? '실험실 소개' : '포트폴리오 생성하기';

  const handleBefore = () => {
    navigate(-1);
  };

  return (
    <StepHeaderContainer stepPercent={(step / MAX_STEP) * 100}>
      <StepHeaderContents>
        <ArrowLeftSVG onClick={handleBefore} />
        <p>{title}</p>
      </StepHeaderContents>
      <span className="divider" />
    </StepHeaderContainer>
  );
};

const stepText = [
  {
    title: '지금부터 나의 시장 진입\n타이밍을 평가하기 위한\n포트폴리오를 생성해보아요!',
    description:
      '* 포트폴리오에 종목을 담으면,\n5영업일 후 수익률을 통해 나의 시장 진입 타이밍과\n잠재된 투자 심리를 분석해드릴게요',
  },
  {
    title: '어느 나라 시장의\n기업을 매수하고 싶나요?',
    description: '* 국가를 하나만 선택해주세요!',
  },
  {
    title: '포트폴리오에 담고 싶은\n종목이 있나요?',
    description:
      '* 검색으로 종목을 직접 추가할 수 있어요. \n* 원하는 특정 종목이 없다다면, \n관심 있는 산업을 최대 3개까지 선택해주세요.',
  },
  {
    title: '관심있는 종목을 \n매수해주세요',
    description: '* 현재 화면에 노출되는 가격으로 매수됩니다',
  },
  {
    title: '모의 매수 성공! 🎉 \n5영업일 뒤, 결과를 알려드릴께요!',
    description: '모의매수한 종목은 언제든, \n실험실 홈에서 언제든 변경할 수 있어요!',
  },
];

const LabStep = () => {
  const location = useLocation();
  const { step } = location.state ?? {};

  return (
    <>
      {!!step && (
        <NoLoginWrapper
          title={
            <>
              지금 로그인을 하고 <br />
              나의 매수 타이밍을 실험해보세요
            </>
          }
          description={
            <>
              👋 로그인을 하면 포트폴리오를 생성하여 진입 타이밍과 <br />
              숨겨진 투자 심리를 분석한 보고서를 받아볼 수 있어요
            </>
          }
          buttonText="회원가입/로그인 하기"
          SecondaryButtonText="홈으로 가기"
          hasHeader
          hasNavbar
        />
      )}
      <LabStepHeader step={step} />
      <StepContainer>
        <StepTitleContainer>
          <p className="title">{stepText[step].title}</p>
          <p className="description">{stepText[step].description}</p>
        </StepTitleContainer>
        {step == 0 ? (
          <LabTutorial />
        ) : step == 1 ? (
          <LabCountry />
        ) : step == 2 ? (
          <LabSearch />
        ) : step == 3 ? (
          <LabPurchase />
        ) : (
          <LabDone />
        )}
      </StepContainer>
    </>
  );
};

export default LabStep;
