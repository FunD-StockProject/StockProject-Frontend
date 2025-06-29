import { useNavigate } from 'react-router-dom';
import {
  StepBox,
  StepLabel,
  StepImage,
} from './Intro.Style';
import BackLogo from '@assets/backLogo.svg?react';
import { webPath } from '@router/index';
import { BackIcon, Container, Description, InnerContainer, NavButton, NavButtonContainer, Title, TopBar, TopBarTitle } from '../Common.Style';

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
          안녕하세요, 000님<br />
          지금부터 나의 시장 진입 타이밍을 <br />
          평가하기 위한 포트폴리오를 생성해보아요!"
        </Title>
        <Description>
          포트폴리오에 종목을 담으면, <br />
          5영업일 후 수익률을 통해 나의 시장 진입 타이밍과<br />
          잠재된 투자 심리를 분석해드릴게요
        </Description>

        <StepBox>
          <StepLabel>STEP1</StepLabel>
          <StepImage>STEP 1 이미지 예정</StepImage>
        </StepBox>

        <StepBox>
          <StepLabel>STEP2</StepLabel>
          <StepImage>STEP 2 콘텐츠 예정</StepImage>
        </StepBox>

        <StepBox>
          <StepLabel>STEP3</StepLabel>
          <StepImage>STEP 3 콘텐츠 예정</StepImage>
        </StepBox>
        <NavButtonContainer>
          <NavButton onClick={() => navigate(-1)}>이전</NavButton>
          <NavButton next={true} active={true} onClick={() => navigate(webPath.labMarketSelection())}>다음</NavButton>
        </NavButtonContainer>
      </InnerContainer>
    </Container>
  );
};

export default Intro;
