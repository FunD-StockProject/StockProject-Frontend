import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STOCK_COUNTRIES, StockCountryKey } from '@ts/StockCountry';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';

const LabCountry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<StockCountryKey>();

  const handlePrevStep = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    navigate(webPath.labPurchase(), {
      state: {
        ...location.state,
        step: 2,
        country: selectedCountry,
      },
    });
  };

  const handleClickSelectCountry = (country: StockCountryKey) => () => {
    setSelectedCountry(country);
  };

  return (
    <LabCountryContainer>
      <LabCountryTitleContainer>
        <p className="title">
          어느 나라 시장의
          <br />
          기업을 매수하고 싶나요?
        </p>
        <p className="desc">* 국가를 하나만 선택해주세요!</p>
      </LabCountryTitleContainer>
      <LabTutorialCountryListContainer>
        {STOCK_COUNTRIES.map((e) => (
          <LabTutorialCountryItemContainer
            key={`SELECT_COUNTRY_${e.key}`}
            onClick={handleClickSelectCountry(e.key)}
            canNext={!!selectedCountry}
            isSelected={selectedCountry == e.key}
          >
            <img src={e.img} />
            <p>{e.text}</p>
          </LabTutorialCountryItemContainer>
        ))}
      </LabTutorialCountryListContainer>
      <LabTutorialButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep} disabled={!selectedCountry}>
          다음
        </button>
      </LabTutorialButtonContainer>
    </LabCountryContainer>
  );
};

const LabTutorialButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  marginTop: 'auto',

  ['>button']: {
    width: '100%',
    padding: '10px 0px',
    ...theme.font.body18Semibold,
    margin: '0',
    border: 'none',
    borderRadius: '8px',

    [':first-of-type']: {
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray5,
    },

    [':last-of-type']: {
      background: theme.colors.sub_blue6,
      color: theme.colors.sub_white,

      ['&:disabled']: {
        background: theme.colors.sub_gray8,
        color: theme.colors.sub_black,
      },
    },
  },
});

const LabTutorialCountryItemContainer = styled.div(
  ({ canNext, isSelected }: { canNext: boolean; isSelected: boolean }) => ({
    opacity: canNext && !isSelected ? 0.5 : 1,
    background: canNext && isSelected ? theme.colors.sub_blue6 : theme.colors.sub_gray11,
    ['>p']: {
      color: canNext && isSelected ? theme.colors.sub_white : theme.colors.sub_gray6,
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    borderRadius: '10px',
    alignItems: 'center',
    width: '100%',

    ['>img']: {
      width: '80px',
    },

    ['>p']: {
      margin: '0',
      ...theme.font.body16Medium,
    },
  },
);

const LabTutorialCountryListContainer = styled.div({
  display: 'flex',
  gap: '20px',
});

const LabCountryTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.desc']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const LabCountryContainer = styled.div({
  padding: '32px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  flexGrow: '1',

  ['>span.divider']: {
    height: '4px',
    width: '100%',
    background: theme.colors.sub_gray11,
  },
});

export default LabCountry;
