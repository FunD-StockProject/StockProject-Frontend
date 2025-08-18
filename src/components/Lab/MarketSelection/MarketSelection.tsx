import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import BackLogo from '@assets/backLogo.svg?react';
import KoreaFlag from '@assets/koreaFlag.svg?react';
import UsFlag from '@assets/usFlag.svg?react';

import {
  BackIcon,
  Container,
  Description,
  InnerContainer,
  NavButton,
  NavButtonContainer,
  Title,
  TopBar,
  TopBarTitle,
} from '../Common.Style';
import { FlagBox, FlagButton, FlagIcon, FlagLabel } from './MarketSelection.Style';
import { webPath } from '@router/index';
import NoLoginWrapper from '@components/NoLoginWrapper/NoLoginWrapper';


const MarketSelection = () => {
  const isLogin = !!localStorage.getItem('access_token');
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<'KOREA' | 'OVERSEA' | null>(null);

  const selectMarket = (country: 'KOREA' | 'OVERSEA') => {
    setSelectedCountry(country);
  };

  const isValid = selectedCountry !== null;

  return (
    <>
      {!isLogin &&
        <NoLoginWrapper
          title={
            <>
              지금 로그인을 하고
              <br />나의 매수 타이밍을 실험해보세요
            </>
          }
          description={
            <>
              👋 로그인을 하면 포트폴리오를 생성하여 진입 타이밍과
              <br />숨겨진 투자 심리를 분석한 보고서를 받아볼 수 있어요
            </>
          }
          buttonText="회원가입 / 로그인 하기"
          SecondaryButtonText='홈으로 가기'
        />}
      <Container>
        <TopBar statusRate={40}>
          <BackIcon onClick={() => navigate(-1)}>
            <BackLogo />
          </BackIcon>
          <TopBarTitle>포트폴리오 생성하기</TopBarTitle>
        </TopBar>
        <InnerContainer>
          <Title>
            어느 나라 시장의 <br />
            기업을 매수하고 싶나요?
          </Title>
          <Description>* 국가 하나만 선택해주세요!</Description>

          <FlagBox>
            <FlagButton
              selected={selectedCountry === 'KOREA'}
              dimmed={selectedCountry !== null && selectedCountry !== 'KOREA'}
              onClick={() => selectMarket('KOREA')}
            >
              <FlagIcon>
                <KoreaFlag />
              </FlagIcon>
              <FlagLabel selected={selectedCountry === 'KOREA'}>국내</FlagLabel>
            </FlagButton>

            <FlagButton
              selected={selectedCountry === 'OVERSEA'}
              dimmed={selectedCountry !== null && selectedCountry !== 'OVERSEA'}
              onClick={() => selectMarket('OVERSEA')}
            >
              <FlagIcon>
                <UsFlag />
              </FlagIcon>
              <FlagLabel selected={selectedCountry === 'OVERSEA'}>해외</FlagLabel>
            </FlagButton>
          </FlagBox>

          <NavButtonContainer>
            <NavButton onClick={() => navigate(-1)}>이전</NavButton>
            <NavButton
              next={true}
              active={isValid}
              disabled={!isValid}
              onClick={() => {
                navigate(webPath.labStockSelection(), { state: { country: selectedCountry } });
              }}
            >
              다음
            </NavButton>
          </NavButtonContainer>
        </InnerContainer>
      </Container >
    </>
  );
};

export default MarketSelection;
