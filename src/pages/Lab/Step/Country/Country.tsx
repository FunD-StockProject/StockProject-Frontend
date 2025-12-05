import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STOCK_COUNTRIES, StockCountryKey } from '@ts/StockCountry';
import { webPath } from '@router/index';
import { StepButtonContainer } from '../Step.Style';
import { LabCountryContainer, LabTutorialCountryItemContainer, LabTutorialCountryListContainer } from './Country.Style';

const LabCountry = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCountry, setSelectedCountry] = useState<StockCountryKey>();

  const handlePrevStep = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    navigate(webPath.labStep(), {
      state: {
        ...location.state,
        step: 2,
        country: selectedCountry,
      },
    });
  };

  const handleClickSelectCountry = (country: StockCountryKey) => () => {
    setSelectedCountry((prev) => (prev == country ? undefined : country));
  };

  return (
    <LabCountryContainer>
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
      <StepButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep} disabled={!selectedCountry}>
          다음
        </button>
      </StepButtonContainer>
    </LabCountryContainer>
  );
};

export default LabCountry;
