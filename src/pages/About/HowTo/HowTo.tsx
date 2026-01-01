import CallOutTailSVG from '@assets/design/callout/callout_tail.svg?react';
import CardSVG from '@assets/design/card/card.svg?react';
import LogoWhiteSVG from '@assets/logo/logo_white.svg?react';
import SlimeSVG from '@assets/logo/slime.svg?react';
import {
  HowToContainer,
  HowToStepContainer,
  HowToStepContents,
  HowToStepDescriptionContainer,
  HowToStepDescriptionItem,
  HowToStepTitle,
  HowToTitle,
  Step1Container,
  Step1SubContainer,
  Step1SubItem,
  Step2Container,
  Step2Grid,
  Step2Item,
  Step2Row,
  Step3Container,
  Step4Container,
} from './HowTo.Style';

const Step1Contents = () => {
  return (
    <Step1Container>
      <CallOutTailSVG />
      <p>추매각 보인다 진짜</p>
      <Step1SubContainer>
        <Step1SubItem>👍 15</Step1SubItem>
        <Step1SubItem>👎 2</Step1SubItem>
      </Step1SubContainer>
    </Step1Container>
  );
};

const Step2Contents = () => {
  const messageList = [
    [
      { text: '추매각', delta: 1 },
      { text: '보인다', delta: 0 },
      { text: '진짜', delta: 0 },
    ],
    [
      { text: '상승', delta: 1 },
      { text: '기세', delta: 0 },
      { text: '진짜', delta: 0 },
    ],
    [
      { text: '이제는', delta: 0 },
      { text: '조금', delta: 0 },
      { text: '지치네요', delta: -1 },
    ],
  ];

  return (
    <Step2Container>
      <Step2Grid>
        {messageList.map((e, i) => (
          <Step2Row key={`MESSAGE_${i}`}>
            {e.map((e, i) => (
              <Step2Item key={`MESSAGE_${i}_${i}`} delta={e.delta}>
                <p>{e.text}</p>
              </Step2Item>
            ))}
          </Step2Row>
        ))}
      </Step2Grid>
    </Step2Container>
  );
};

const Step3Contents = () => {
  return (
    <Step3Container>
      <p className="message">이젠 정말 힘드네요</p>
      <span />
      <p className="result">👎 부정</p>
    </Step3Container>
  );
};

const Step4Contents = () => {
  return (
    <Step4Container>
      <CardSVG />
    </Step4Container>
  );
};

const HowToStep = [
  {
    title: '가중치 계산',
    description: [
      '투자자가 남긴 의견에 대한 추천/비추천 등의 개수를 반영해 해당 글의 영향도를 조정하기 위한 가중치를 계산해요.',
    ],
    contents: <Step1Contents />,
  },
  {
    title: '키워드/패턴 기반 점수 산출',
    description: [
      '투자자가 남긴 의견에 대한 추천/비추천 등의 개수를 반영해 해당 글의 영향도를 조정하기 위한 가중치를 계산해요.',
      '해당 글에 긍정/부정 패턴이 있는지 파악해 점수를 산출해요',
    ],
    contents: <Step2Contents />,
  },
  {
    title: '감정 분석 모델',
    description: [
      '투자자가 남긴 의견에 대한 추천/비추천 등의 개수를 반영해 해당 글의 영향도를 조정하기 위한 가중치를 계산해요.',
    ],
    contents: <Step3Contents />,
  },
  {
    title: '최종 점수 산출',
    description: ['키워드, 패턴, 감정분석 모델 점수에 각각 다른 가중치를 반영해 최종 점수를 산출해요'],
    contents: <Step4Contents />,
  },
];

const AboutHowTo = () => {
  return (
    <HowToContainer>
      <HowToTitle>
        <LogoWhiteSVG />
        점수는 어떻게 산출되나요?
      </HowToTitle>
      {HowToStep.map((step, index) => (
        <HowToStepContainer key={`HOWTO_STEP_${index}`}>
          <HowToStepTitle>
            <SlimeSVG />
            Step{index + 1}. {step.title}
          </HowToStepTitle>
          <HowToStepContents>
            {step.contents}
            <HowToStepDescriptionContainer>
              {step.description.map((e, i) => (
                <HowToStepDescriptionItem key={`STEP_${index}_${i}`}>{e}</HowToStepDescriptionItem>
              ))}
            </HowToStepDescriptionContainer>
          </HowToStepContents>
        </HowToStepContainer>
      ))}
    </HowToContainer>
  );
};

export default AboutHowTo;
