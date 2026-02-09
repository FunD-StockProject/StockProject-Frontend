import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_SECTORS, StockSector } from '@ts/StockSector';
import { diffToValue } from '@utils/ScoreConvert';
import useToast from '@hooks/useToast';
import StockImage from '@components/Common/StockImage';
import { useAutoCompleteStockQuery, usePopularStockFetchQuery } from '@controllers/stocks/query';
import { AutoCompleteStockItem, StockDetailInfo } from '@controllers/stocks/types';
import AlertSVG from '@assets/icons/alert.svg?react';
import ChevronLeftNarrowSVG from '@assets/icons/chevronLeftNarrow.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import CheckCircleSelectedSVG from '@assets/lab/checkCircleSelected.svg?react';
import CheckCircleUnselectedSVG from '@assets/lab/checkCircleUnelected.svg?react';
import { NextStepProps } from '../Step';
import { StepButtonContainer } from '../Step.Style';
import {
  LabSearchContainer,
  LabSearchModalBackgroundContainer,
  LabSearchModalContents,
  LabSearchModalPopularItemContainer,
  LabSearchModalResultButtonContainer,
  LabSearchModalResultEmptyContainer,
  LabSearchModalResultItemContainer,
  LabSearchModalResultItemInfoContainer,
  LabSearchModalTitleContainer,
  LabSearchSelectContainer,
  LabSearchSelectIndustryContainer,
  LabSearchSelectIndustryItemContainer,
  LabSearchSelectStockInputContainer,
  LabSearchSelectStockResultContainer,
  LabSearchSelectStockResultItemContainer,
  LabSearchToast,
} from './Search.Style';

interface LabSearchModalProps {
  isOpenModal: boolean;
  isShowModal: boolean;
  selectedStocks: StockDetailInfo[];
  selectedCountry: StockCountryKey;
  handleCloseModal: () => void;
  handleClickStock: (stock: StockDetailInfo) => void;
}

const LabSearchModal = ({
  isOpenModal,
  isShowModal,
  selectedStocks,
  selectedCountry,
  handleCloseModal,
  handleClickStock,
}: LabSearchModalProps) => {
  const backgroundContainerRef = useRef<HTMLDivElement>(null);
  const [popularStocks] = usePopularStockFetchQuery();
  const [value, setValue] = useState('');
  const { data: allStocks = [] } = useAutoCompleteStockQuery(value);

  const searchedStocks = useMemo(
    () => allStocks.filter((stock: AutoCompleteStockItem) => stock.country === selectedCountry),
    [allStocks, selectedCountry],
  );

  const hasSearchValue = !!value;
  const hasSearchResults = searchedStocks.length > 0;

  const handleClickOutside = (e: React.MouseEvent) => {
    if (backgroundContainerRef.current === e.target) {
      closeModal();
    }
  };

  const handleClickPopularItem = (name: string) => {
    setValue(name);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const closeModal = () => {
    setValue('');
    handleCloseModal();
  };

  const renderDiffIcon = (diff: number) => {
    if (diff > 0) return <UpSVG />;
    if (diff < 0) return <DownSVG />;
    return '-';
  };

  const renderSearchResults = () => {
    if (!hasSearchResults) {
      return (
        <LabSearchModalResultEmptyContainer>
          <p className="title">검색결과가 없어요 😭</p>
          <p className="subtitle">다른 종목을 다시 검색해보세요</p>
        </LabSearchModalResultEmptyContainer>
      );
    }

    return searchedStocks.map((stock: AutoCompleteStockItem) => {
      const isSelected = selectedStocks.some((s) => s.stockId === stock.stockId);
      const scoreText = `${stock.score}점`;
      const diffText = `${diffToValue(stock.diff)}점`;

      return (
        <LabSearchModalResultItemContainer
          key={`SEARCHED_RESULT_${stock.stockId}`}
          onClick={() => {
            handleClickStock({
              stockId: stock.stockId,
              symbolName: stock.symbolName,
              country: stock.country,
            } as StockDetailInfo);
          }}
        >
          <StockImage stockId={stock.stockId} />
          <LabSearchModalResultItemInfoContainer delta={stock.diff}>
            <p className="title">{stock.symbolName}</p>
            <p className="score">
              {scoreText}
              <span>
                {diffText} {renderDiffIcon(stock.diff)}
              </span>
            </p>
          </LabSearchModalResultItemInfoContainer>
          {isSelected ? <CheckCircleSelectedSVG /> : <CheckCircleUnselectedSVG />}
        </LabSearchModalResultItemContainer>
      );
    });
  };

  const renderPopularStocks = () => {
    return popularStocks.map((stock, index) => (
      <LabSearchModalPopularItemContainer
        key={`POPULAR_STOCK_${stock.stockId}`}
        onClick={() => handleClickPopularItem(stock.symbolName)}
      >
        <p>{index + 1}</p>
        <div>
          <StockImage stockId={stock.stockId} />
          <p>{stock.symbolName}</p>
          <ChevronLeftNarrowSVG />
        </div>
      </LabSearchModalPopularItemContainer>
    ));
  };

  if (!isOpenModal) return null;

  return (
    <>
      <LabSearchModalBackgroundContainer
        ref={backgroundContainerRef}
        onClick={handleClickOutside}
        isShowModal={isShowModal}
      >
        <div>
          <LabSearchModalTitleContainer>
            <CrossSVG onClick={closeModal} />
            <div>
              <input placeholder="관심 종목명을 입력해주세요" onChange={handleChangeInput} value={value} />
              <SearchSVG />
            </div>
          </LabSearchModalTitleContainer>

          <LabSearchModalContents>
            <p>{hasSearchValue ? '검색결과' : '인간지표 인기검색어'}</p>
            {hasSearchValue ? renderSearchResults() : renderPopularStocks()}
          </LabSearchModalContents>
        </div>
      </LabSearchModalBackgroundContainer>
      {value && (
        <LabSearchModalResultButtonContainer>
          <button disabled={!selectedStocks.length} onClick={handleCloseModal}>
            선택하기 {selectedStocks.length}
          </button>
        </LabSearchModalResultButtonContainer>
      )}
    </>
  );
};

interface LabSearchLocationState {
  step: number;
  country: StockCountryKey;
  isOpenModal: boolean;
}

const LabSearch = ({
  handlePrevStep,
  handleNextStep,
}: {
  handlePrevStep: () => void;
  handleNextStep: ({}: NextStepProps) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { country = 'KOREA', isOpenModal = false } = (location.state as LabSearchLocationState) || {};

  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [selectedStocks, setSelectedStocks] = useState<StockDetailInfo[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const { toast, showToast } = useToast();

  const enableNextStep = !!(selectedStocks.length || selectedSectors.length);

  const handleClickStock = (stock: StockDetailInfo) => {
    setSelectedStocks((prev) => {
      const isAlreadySelected = prev.some((s) => s.stockId === stock.stockId);
      if (isAlreadySelected) {
        return prev.filter((s) => s.stockId !== stock.stockId);
      }
      return [...prev, stock];
    });
  };

  const handleRemoveStock = (stockId: number) => {
    setSelectedStocks((prev) => prev.filter((s) => s.stockId !== stockId));
  };

  const handleClickSector = (sectorKey: string) => {
    setSelectedSectors((prev) => {
      const isAlreadySelected = prev.some((s) => s === sectorKey);

      if (isAlreadySelected) {
        return prev.filter((s) => s !== sectorKey);
      }

      if (prev.length >= 3) {
        showToast(
          <>
            <AlertSVG />
            <p>산업은 최대 3개까지만 선택할 수 있어요!</p>
          </>,
        );
        return prev;
      }

      return [...prev, sectorKey];
    });
  };

  const handleOpenModal = () => {
    navigate('.', {
      state: {
        ...location.state,
        isOpenModal: true,
      },
    });
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    showModalTimeoutRef.current = setTimeout(() => {
      navigate(-1);
    }, 100);
  };

  useEffect(() => {
    if (isOpenModal) {
      showModalTimeoutRef.current = setTimeout(() => {
        setIsShowModal(true);
      }, 0);
    }

    return () => {
      if (showModalTimeoutRef.current) {
        clearTimeout(showModalTimeoutRef.current);
      }
    };
  }, [isOpenModal]);

  return (
    <LabSearchContainer>
      <LabSearchModal
        isOpenModal={isOpenModal}
        isShowModal={isShowModal}
        selectedStocks={selectedStocks}
        selectedCountry={country}
        handleCloseModal={handleCloseModal}
        handleClickStock={handleClickStock}
      />
      <LabSearchSelectContainer>
        <p>관심 종목</p>
        <LabSearchSelectStockInputContainer onClick={handleOpenModal}>
          <p>종목명 or TICKER를 입력해주세요</p>
          <SearchSVG />
        </LabSearchSelectStockInputContainer>
        <LabSearchSelectStockResultContainer>
          {selectedStocks.map((stock) => (
            <LabSearchSelectStockResultItemContainer key={`SELECTED_STOCK_${stock.stockId}`}>
              <StockImage stockId={stock.stockId} />
              <p>{stock.symbolName}</p>
              <CrossSVG onClick={() => handleRemoveStock(stock.stockId)} />
            </LabSearchSelectStockResultItemContainer>
          ))}
        </LabSearchSelectStockResultContainer>
      </LabSearchSelectContainer>
      <LabSearchSelectContainer>
        <p>관심 산업</p>
        <LabSearchSelectIndustryContainer>
          {STOCK_SECTORS[country].map((sector: StockSector) => (
            <LabSearchSelectIndustryItemContainer
              key={sector.key}
              isSelected={selectedSectors.some((s) => s === sector.key)}
              onClick={() => handleClickSector(sector.key)}
            >
              {sector.text}
            </LabSearchSelectIndustryItemContainer>
          ))}
        </LabSearchSelectIndustryContainer>
      </LabSearchSelectContainer>
      <StepButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button
          onClick={() => handleNextStep({ stocks: selectedStocks, sectors: selectedSectors })}
          disabled={!enableNextStep}
        >
          선택완료
        </button>
      </StepButtonContainer>
      {toast.enabled && <LabSearchToast closing={toast.closing}>{toast.message}</LabSearchToast>}
    </LabSearchContainer>
  );
};

export default LabSearch;
