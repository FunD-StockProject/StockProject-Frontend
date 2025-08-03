import { useNavigate } from 'react-router-dom';
import { StepImage } from './Intro.Style';
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

        <StepImage src={IntroImg1} />

        <StepImage src={IntroImg2} />

        <StepImage src={IntroImg3} />
        <NavButtonContainer>
          <NavButton onClick={() => navigate(-1)}>이전</NavButton>
          <NavButton next={true} active={true} onClick={() => navigate(webPath.labMarketSelection())}>다음</NavButton>
        </NavButtonContainer>
      </InnerContainer>
    </Container>
  );
};

export default Intro;
