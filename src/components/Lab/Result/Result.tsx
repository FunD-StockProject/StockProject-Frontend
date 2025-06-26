import BackLogoSVG from '@assets/backLogo.svg?react';
import { webPath } from '@router/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, TopBar, BackIcon, TopBarTitle, InnerContainer, Title, Description, NavButtonContainer, NavButton } from '../Common.Style';
import { ReportPreviewPlaceholder } from './Result.Style';
import { getBusinessDaysLater } from '@utils/getBusinessDaysLater';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isValid = true;

  const purchasedStocks = location.state?.purchasedStocks ?? null;
  const country = location.state?.country ?? null;

  console.log(purchasedStocks);
  return (
    <Container>
      <TopBar statusRate={100}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogoSVG />
        </BackIcon>
        <TopBarTitle>포트폴리오 생성하기</TopBarTitle>
      </TopBar>
      <InnerContainer>
        <Title>
          모의 매수 성공! 🎉<br />
          5영업일 뒤, {getBusinessDaysLater(new Date(), 5, country)}<br />
          결과를 알려드릴께요!
        </Title>
        <Description>
          모의매수한 종목은 언제든, <br />
          실험실 홈에서 언제든 변경할 수 있어요!
        </Description>

        <ReportPreviewPlaceholder />

        <NavButtonContainer>
          <NavButton
            next={true}
            active={isValid}
            disabled={!isValid}
            onClick={() => navigate(webPath.lab())}
          >
            매수현황 보러가기
          </NavButton>
        </NavButtonContainer>

      </InnerContainer>
    </Container>
  );
};

export default Result;
