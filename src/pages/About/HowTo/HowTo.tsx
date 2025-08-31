import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import CallOutTailSVG from '@assets/design/callout/callout_tail.svg?react';
import CardSVG from '@assets/design/card/card.svg?react';
import LogoWhiteSVG from '@assets/logo/logo_white.svg?react';
import SlimeSVG from '@assets/logo/slime.svg?react';

const Step1Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  marginBottom: '10px',
  background: 'rgba(255, 255, 255, 0.16)',
  flexGrow: 1,
  padding: '12px',
  borderRadius: '28px',

  ['>svg']: {
    position: 'absolute',
    top: '100%',
    right: '28px',
    height: '10px',
    fill: 'rgba(255, 255, 255, 0.16)',
  },

  ['>p']: {
    margin: '0',
    fontSize: '10px',
    fontWeight: '400',
    color: theme.colors.sub_white,
  },
});

const Step1SubContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3px',
});

const Step1SubItem = styled.span({
  fontSize: '9px',
  fontWeight: '600',
  color: theme.colors.sub_black,
  background: theme.colors.sub_white,
  border: `1px solid ${theme.colors.sub_black}`,
  borderRadius: '999px',
  padding: '2px 4px',
  width: '32px',
  textAlign: 'center',
});

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

const Step2Container = styled.div({
  flexGrow: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
});

const Step2Contents = () => {
  return (
    <Step2Container>
      <CallOutTailSVG />
      <p>추매각 보인다 진짜</p>
    </Step2Container>
  );
};

const Step3Container = styled.div({
  flexGrow: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
});

const Step3Contents = () => {
  return (
    <Step3Container>
      <CallOutTailSVG />
      <p>추매각 보인다 진짜</p>
    </Step3Container>
  );
};

const Step4Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  flexGrow: 1,

  ['>svg']: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(-50%)',
  },
});

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
    description: [
      '투자자가 남긴 의견에 대한 추천/비추천 등의 개수를 반영해 해당 글의 영향도를 조정하기 위한 가중치를 계산해요.',
    ],
    contents: <Step4Contents />,
  },
];

const HowToContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '28px 20px',
  background: theme.colors.sub_blue6,
});

const HowToTitle = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  ...theme.font.title20Semibold,
  color: theme.colors.sub_white,
  whiteSpace: 'nowrap',

  ['>svg']: {
    flexShrink: 0,
    height: '17px',
    width: 'auto',
  },
});

const HowToStepContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '11px 12px',
  background: theme.colors.sub_black,
  borderRadius: '8px',
});

const HowToStepTitle = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  background: theme.colors.sub_white,
  padding: '4px 12px',
  marginRight: 'auto',
  borderRadius: '8px',

  ...theme.font.detail12Semibold,
  color: theme.colors.primary90,
});

const HowToStepContents = styled.div({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

const HowToStepDescriptionContainer = styled.div({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const HowToStepDescriptionItem = styled.span({
  padding: '10px',
  wordBreak: 'keep-all',
  textAlign: 'center',
  borderRadius: '4px',
  border: `1px solid ${theme.colors.sub_gray7}`,

  ...theme.font.detail12Medium,
  color: theme.colors.sub_white,
});

const AboutHowTo = () => {
  return (
    <HowToContainer>
      <HowToTitle>
        <LogoWhiteSVG />
        점수는 어떻게 산출되나요?
      </HowToTitle>
      {HowToStep.map((step, index) => (
        <HowToStepContainer>
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
