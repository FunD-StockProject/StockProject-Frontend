import { useNavigate } from 'react-router-dom';
import {
  StepBox,
  StepLabel,
  StepImage,
  StepDescription,
  WarningText
} from './Intro.Style';
import BackLogo from '@assets/backLogo.svg?react';
import { webPath } from '@router/index';
import { BackIcon, Container, Description, InnerContainer, NavButton, NavButtonContainer, Title, TopBar, TopBarTitle } from '../Common.Style';
import IntroImg1 from '@assets/lab/lab-intro-1.png';
import IntroImg2 from '@assets/lab/lab-intro-2.png';
import IntroImg3 from '@assets/lab/lab-intro-3.png';

const Intro = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TopBar statusRate={20}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogo />
        </BackIcon>
        <TopBarTitle>실험실 소개</TopBarTitle>
      </TopBar>
      <InnerContainer>
        <Title>
          지금부터 나의 시장 진입 <br />
          타이밍을 평가하기 위한 <br />
          포트폴리오를 생성해보아요!
        </Title>
        <Description>
          포트폴리오에 종목을 담으면, <br />
          5영업일 후 수익률을 통해 나의 시장 진입 타이밍과<br />
          잠재된 투자 심리를 분석해드릴게요
        </Description>

        <StepBox>
          <StepLabel>STEP1 | 매수하고 싶은 종목 담기</StepLabel>
          <StepImage src={IntroImg1} />
          <StepDescription>
            현재 주가와 인간지표를 확인하고,<br />
            매수하고 싶은 종목을 포트폴리오에 담아보세요
          </StepDescription>
        </StepBox>

        <StepBox>
          <StepLabel>STEP2 | 5영업일 후 결과 확인</StepLabel>
          <StepImage src={IntroImg2} />
          <StepDescription>
            5영업일 후 수익률을 통해<br />
            내 진입타이밍이 맞았는지 확인해보세요
          </StepDescription>
        </StepBox>

        <StepBox>
          <StepLabel>STEP3 | 결과지에 적힌 심리패턴 확인하기</StepLabel>
          <StepImage src={IntroImg3} />
          <StepDescription>
            나는 과연 어떤 인간 지표인지, 다른 사용자와 비교를 통해<br />
            잠재된 투자 심리패턴을 분석해드릴께요
          </StepDescription>
        </StepBox>

        <WarningText>
          (주의) 본 기능은 실제 투자가 아닌 "가상"으로 진행되는 모의매수 기능입니다.
        </WarningText>

        <NavButtonContainer>
          <NavButton onClick={() => navigate(-1)}>이전</NavButton>
          <NavButton next={true} active={true} onClick={() => navigate(webPath.labMarketSelection())}>다음</NavButton>
        </NavButtonContainer>
      </InnerContainer>
    </Container>
  );
};

export default Intro;
