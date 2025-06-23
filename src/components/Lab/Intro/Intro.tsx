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
          지금부터 모의매수를 위한<br />
          나만의 포트폴리오를 생성해봐요!
        </Title>

        <Description>
          관심 종목을 설정하면,<br />
          수익률(5영업일 기준)을 자동 예측하여<br />
          나의 투자심리 유형을 분석해드려요
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
