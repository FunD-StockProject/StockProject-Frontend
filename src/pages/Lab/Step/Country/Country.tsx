import { useState } from 'react';
import { STOCK_COUNTRIES, StockCountryKey } from '@ts/StockCountry';
import { NextStepProps } from '../Step';
import { StepButtonContainer } from '../Step.Style';
import { LabCountryContainer, LabTutorialCountryItemContainer, LabTutorialCountryListContainer } from './Country.Style';

const LabCountry = ({
  handlePrevStep,
  handleNextStep,
}: {
  handlePrevStep: () => void;
  handleNextStep: ({}: NextStepProps) => void;
}) => {
  const [selectedCountry, setSelectedCountry] = useState<StockCountryKey | undefined>();

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
            <img src={e.img} loading="lazy" />
            <p>{e.text}</p>
          </LabTutorialCountryItemContainer>
        ))}
      </LabTutorialCountryListContainer>
      <StepButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={() => handleNextStep({ country: selectedCountry })} disabled={!selectedCountry}>
          다음
        </button>
      </StepButtonContainer>
    </LabCountryContainer>
  );
};

export default LabCountry;
