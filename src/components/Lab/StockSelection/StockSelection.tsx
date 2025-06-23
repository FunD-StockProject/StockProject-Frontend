import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import BackLogo from '@assets/backLogo.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';

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

import {
  Section,
  SectionTitle,
  SearchBar,
  SearchInput,
  IndustryBox,
  IndustryTag,
  SearchIconWrapper,
} from './StockSelection.Style';


const StockSelection = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const market = location.state?.market ?? null;
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const toggleIndustry = (label: string) => {
    setSelectedIndustries(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const isValid = selectedIndustries.length > 0;

  return (
    <Container>
      <TopBar statusRate={60}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogo />
        </BackIcon>
        <TopBarTitle>종목 선택</TopBarTitle>
      </TopBar>
      <InnerContainer>
        <Title>
          구체적으로 관심있는 <br />
          종목/산업이 있다면 모두 선택해주세요
        </Title>
        <Description>* 중복 선택도 가능해요!</Description>

        <Section>
          <SectionTitle>관심 종목</SectionTitle>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="종목명 or TICKER를 입력해주세요"
            />
            <SearchIconWrapper>
              <SearchIcon width={16} height={16} />
            </SearchIconWrapper>
          </SearchBar>
        </Section>

        <Section>
          <SectionTitle>관심 산업</SectionTitle>
          <IndustryBox>
            {[
              '전기전자', '기계장비', '금속', '음식료 담배', '제약', '운송장비',
              '유통', '기타금융', '화학', '증권', '이외산업',
            ].map((label) => (

              <IndustryTag
                key={label}
                selected={selectedIndustries.includes(label)}
                onClick={() => toggleIndustry(label)}
              >
                {label}
              </IndustryTag>
            ))}
          </IndustryBox>
        </Section>

        <NavButtonContainer>
          <NavButton onClick={() => navigate(-1)}>이전</NavButton>
          <NavButton
            next={true}
            active={isValid}
            disabled={!isValid}
            onClick={() => navigate('/lab/market-selection')}
          >
            선택완료
          </NavButton>
        </NavButtonContainer>
      </InnerContainer>
    </Container>
  );
};

export default StockSelection;
