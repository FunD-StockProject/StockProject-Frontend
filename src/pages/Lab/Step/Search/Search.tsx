import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_SECTORS, StockSector } from '@ts/StockSector';
import { diffToValue } from '@utils/ScoreConvert';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { AutoCompleteStockItem, StockDetailInfo } from '@controllers/stocks/types';
import { useAutoCompleteStockQuery, usePopularStockFetchQuery } from '@controllers/stocks/query';
import AlertSVG from '@assets/icons/alert.svg?react';
import ChevronLeftNarrowSVG from '@assets/icons/chevronLeftNarrow.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import CheckCircleSelectedSVG from '@assets/lab/checkCircleSelected.svg?react';
import CheckCircleUnselectedSVG from '@assets/lab/checkCircleUnelected.svg?react';
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

const LabSearchModal = ({
  isOpenModal,
  isShowModal,
  selectedStocks,
  selectedCountry,
  handleCloseModal,
  handleClickStock,
}: {
  isOpenModal: boolean;
  isShowModal: boolean;
  selectedStocks: StockDetailInfo[];
  selectedCountry: StockCountryKey;
  handleCloseModal: () => void;
  handleClickStock: (stock: StockDetailInfo) => void;
}) => {
  const backgroundContaienrRef = useRef<HTMLDivElement>(null);

  const [popularStocks] = usePopularStockFetchQuery();
  const [value, setValue] = useState('');
  const { data: allStocks = [] } = useAutoCompleteStockQuery(value);

  const searchedStocks = useMemo(
    () => allStocks.filter((e: AutoCompleteStockItem) => e.country === selectedCountry),
    [allStocks, selectedCountry]
  );

  const handleClickOutside = (e: React.MouseEvent) => {
    if (!backgroundContaienrRef.current) return;

    if (backgroundContaienrRef.current == e.target) {
      handleCloseModal();
    }
  };

  const handleClickPopularItem = (name: string) => () => {
    setValue(name);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (!isOpenModal) return null;

  return (
    <>
      <LabSearchModalBackgroundContainer
        ref={backgroundContaienrRef}
        onClick={handleClickOutside}
        isShowModal={isShowModal}
      >
        <div>
          <LabSearchModalTitleContainer>
            <CrossSVG onClick={handleCloseModal} />
            <div>
              <input placeholder="관심 종목명을 입력해주세요" onChange={handleChangeInput} value={value} />
              <SearchSVG />
            </div>
          </LabSearchModalTitleContainer>

          <LabSearchModalContents>
            <p>{!value ? '인간지표 인기검색어' : '검색결과'}</p>
            {!value ? (
              popularStocks.map((e, i) => (
                <LabSearchModalPopularItemContainer
                  key={`POPULAR_STOCK_${e.stockId}`}
                  onClick={handleClickPopularItem(e.symbolName)}
                >
                  <p>{i + 1}</p>
                  <div>
                    <StockImage stockId={e.stockId} />
                    <p>{e.symbolName}</p>
                    <ChevronLeftNarrowSVG />
                  </div>
                </LabSearchModalPopularItemContainer>
              ))
            ) : !searchedStocks.length ? (
              <LabSearchModalResultEmptyContainer>
                <p className="title">검색결과가 업서요 😭</p>
                <p className="subtitle">다른 종목을 다시 검색해보세요</p>
              </LabSearchModalResultEmptyContainer>
            ) : (
              searchedStocks.map((e: AutoCompleteStockItem) => {
                const isSelected = selectedStocks.some((b) => b.stockId == e.stockId);

                const scoreText = `${e.score}점`;
                const diffText = `${diffToValue(e.diff)}점`;

                return (
                  <LabSearchModalResultItemContainer
                    key={`SEARCHED_RESULT_${e.stockId}`}
                    onClick={() => {
                      handleClickStock({
                        stockId: e.stockId,
                        symbolName: e.symbolName,
                        country: e.country,
                      } as StockDetailInfo);
                    }}
                  >
                    <StockImage stockId={e.stockId} />
                    <LabSearchModalResultItemInfoContainer delta={e.diff}>
                      <p className="title">{e.symbolName}</p>
                      <p className="score">
                        {scoreText}
                        <span>
                          {diffText} {e.diff > 0 ? <UpSVG /> : e.diff < 0 ? <DownSVG /> : '-'}
                        </span>
                      </p>
                    </LabSearchModalResultItemInfoContainer>
                    {isSelected ? <CheckCircleSelectedSVG /> : <CheckCircleUnselectedSVG />}
                  </LabSearchModalResultItemContainer>
                );
              })
            )}
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

const LabSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    step,
    country = 'KOREA',
    isOpenModal = false,
  } = location.state as {
    step: number;
    country: StockCountryKey;
    isOpenModal: boolean;
  };

  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [selectedStocks, setSelectedStocks] = useState<StockDetailInfo[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const { toast, showToast } = useToast();

  const enableNextStep = selectedStocks.length || selectedSectors.length;

  const handleClickStock = (stock: StockDetailInfo) => {
    setSelectedStocks((prev) => {
      if (prev.some((b) => b.stockId == stock.stockId)) return prev.filter((b) => b.stockId != stock.stockId);
      else {
        return [...prev, stock];
      }
    });
  };

  const handlePrevStep = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    navigate(webPath.labStep(), {
      state: {
        ...location.state,
        step: step + 1,
        sectors: selectedSectors,
        stocks: selectedStocks,
      },
    });
  };

  const handleClickSector = (sectorKey: string) => () => {
    setSelectedSectors((prev) => {
      if (prev.some((b) => b == sectorKey)) return prev.filter((b) => b != sectorKey);
      else {
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
      }
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
          {selectedStocks.map((e) => (
            <LabSearchSelectStockResultItemContainer key={`SELECTED_STOCK_${e.stockId}`}>
              <StockImage stockId={e.stockId} />
              <p>{e.symbolName}</p>
              <CrossSVG
                onClick={() => {
                  setSelectedStocks((prev) => prev.filter((b) => b.stockId != e.stockId));
                }}
              />
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
              isSelected={selectedSectors.some((b) => b == sector.key)}
              onClick={handleClickSector(sector.key)}
            >
              {sector.text}
            </LabSearchSelectIndustryItemContainer>
          ))}
        </LabSearchSelectIndustryContainer>
      </LabSearchSelectContainer>
      <StepButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep} disabled={!enableNextStep}>
          선택완료
        </button>
      </StepButtonContainer>
      {toast.enabled && <LabSearchToast closing={toast.closing}>{toast.message}</LabSearchToast>}
    </LabSearchContainer>
  );
};

export default LabSearch;
