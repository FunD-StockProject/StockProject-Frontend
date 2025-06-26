import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import BackLogo from '@assets/backLogo.svg?react';
import KoreaFlag from '@assets/koreaFlag.svg?react';
import UsFlag from '@assets/usFlag.svg?react';

import {
  BackIcon,
  Container,
  InnerContainer,
  NavButton,
  NavButtonContainer,
  Title,
  TopBar,
  TopBarTitle,
} from '../Common.Style';
import { FlagBox, FlagButton, FlagIcon, FlagLabel } from './MarketSelection.Style';
import { webPath } from '@router/index';


const MarketSelection = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<'KOREA' | 'OVERSEA' | null>(null);

  const selectMarket = (country: 'KOREA' | 'OVERSEA') => {
    setSelectedCountry(country);
  };

  const isValid = selectedCountry !== null;

  return (
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
        {/* <Description>* 중복 선택도 가능해요!</Description> */}

        <FlagBox>
          <FlagButton selected={selectedCountry === 'KOREA'} onClick={() => selectMarket('KOREA')}>
            <FlagIcon>
              <KoreaFlag />
            </FlagIcon>
            <FlagLabel selected={selectedCountry === 'KOREA'}>국내</FlagLabel>
          </FlagButton>

          <FlagButton selected={selectedCountry === 'OVERSEA'} onClick={() => selectMarket('OVERSEA')}>
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
  );
};

export default MarketSelection;
