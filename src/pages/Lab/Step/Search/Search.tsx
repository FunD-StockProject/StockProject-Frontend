import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { fetchAutoComplete } from '@controllers/api';
import { StockDetailInfo } from '@controllers/api.Type';
import { useAutoComplete, usePopularStockFetchQuery } from '@controllers/query';
import { theme } from '@styles/themes';
import AlertSVG from '@assets/icons/alert.svg?react';
import ChevronLeftNarrowSVG from '@assets/icons/chevronLeftNarrow.svg?react';
import CrossSVG from '@assets/icons/cross.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import CheckCircleSelectedSVG from '@assets/lab/checkCircleSelected.svg?react';
import CheckCircleUnselectedSVG from '@assets/lab/checkCircleUnelected.svg?react';
import { KOREA_SECTORS, OVERSEA_SECTORS, StockSector } from '@ts/StockSector';

const getSectorsByCountry = (country: StockCountryKey): StockSector[] => {
  if (country === 'KOREA') return KOREA_SECTORS;
  if (country === 'OVERSEA') return OVERSEA_SECTORS;
  return [];
};

const LabSearchModal = ({
  isOpenModal,
  isShowModal,
  selectedStocks,
  handleCloseModal,
  handleClickStock,
}: {
  isOpenModal: boolean;
  isShowModal: boolean;
  selectedStocks: StockDetailInfo[];
  handleCloseModal: () => void;
  handleClickStock: (stock: StockDetailInfo) => void;
}) => {
  const backgroundContaienrRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (!backgroundContaienrRef.current) return;

    if (backgroundContaienrRef.current == e.target) {
      handleCloseModal();
    }
  };

  const [popularStocks] = usePopularStockFetchQuery();
  const [value, setValue] = useState('');

  const handleClickPopularItem = (name: string) => () => {
    setValue(name);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [searchedStocks, setSearchedStocks] = useAutoComplete(fetchAutoComplete, 'symbolName');

  useEffect(() => {
    setSearchedStocks(value);
  }, [value]);

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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: '1',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <p
                  style={{
                    margin: '0',
                    ...theme.font.body16Medium,
                    color: theme.colors.sub_gray7,
                  }}
                >
                  검색결과가 업서요 😭
                </p>
                <p
                  style={{
                    margin: '0',
                    ...theme.font.body14Medium,
                    color: theme.colors.sub_gray6,
                  }}
                >
                  다른 종목을 다시 검색해보세요
                </p>
              </div>
            ) : (
              searchedStocks.map((e) => {
                const isSelected = selectedStocks.some((b) => b.stockId == e.stockId);

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
                    <div>
                      <p className="title">{e.symbolName}</p>
                      <p>
                        <span></span>
                      </p>
                    </div>
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

const LabSearchModalResultButtonContainer = styled.div({
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  padding: '28px 20px',
  boxSizing: 'border-box',
  zIndex: '100',

  ['>button']: {
    background: theme.colors.sub_blue6,
    color: theme.colors.sub_white,
    width: '100%',
    border: 'none',
    borderRadius: '8px',
    padding: '10px',
    ...theme.font.body18Semibold,

    [':disabled']: {
      background: theme.colors.sub_gray8,
      color: theme.colors.sub_black,
    },
  },
});

const LabSearchModalResultItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  boxSizing: 'border-box',

  ['>img']: {
    width: '60px',
    height: '60px',
    aspectRatio: '1 / 1',
    borderRadius: '100%',
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    overflow: 'hidden',

    ['>p']: {
      margin: '0',
      ['&.title']: {
        ...theme.font.body18Semibold,
        color: theme.colors.sub_gray1,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },
  },

  ['>svg']: {
    flexShrink: '0',
    marginLeft: 'auto',
  },
});

const LabSearchModalContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  background: theme.colors.sub_black,
  padding: '0 20px 96px',
  flexGrow: '1',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
  },
});

const LabSearchModalPopularItemContainer = styled.div({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_blue6,
  },

  ['>div']: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',

    ['>img']: {
      width: '32px',
      height: '32px',
      aspectRatio: '1 / 1',
      borderRadius: '100%',
    },

    ['>p']: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0',
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray1,
    },

    ['>svg']: {
      flexShrink: '0',
      height: '24px',
      fill: theme.colors.sub_gray7,
      marginLeft: 'auto',
    },
  },
});

const LabSearchModalTitleContainer = styled.div({
  display: 'flex',
  gap: '16px',
  alignItems: 'center',
  padding: '0 20px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    flexShrink: '0',
    fill: theme.colors.sub_gray4,
  },

  ['>div']: {
    background: theme.colors.sub_gray11,
    borderRadius: '8px',
    display: 'flex',
    gap: '6px',
    padding: '10px 16px',
    minWidth: '0',

    ['>input']: {
      border: 'none',
      background: 'none',
      ...theme.font.body16Medium,
      color: theme.colors.sub_gray2,
      minWidth: '0',
      outline: 'none',

      ['::placeholder']: {
        color: theme.colors.sub_gray7,
      },
    },

    ['>svg']: {
      width: '20px',
      height: 'auto',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
      flexShrink: '0',
      fill: theme.colors.sub_gray8,
    },
  },
});

const LabSearchModalBackgroundContainer = styled.div(
  ({ isShowModal }: { isShowModal: boolean }) => ({
    background: isShowModal ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
    backdropFilter: isShowModal ? 'blur(2px)' : '',

    ['>div']: {
      bottom: isShowModal ? '0' : '-100%',
    },
  }),
  {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: '0',
    zIndex: '100',
    transition: 'all 0.2s ease-in-out',
    overflow: 'scroll',

    ['>div']: {
      background: theme.colors.sub_black,
      position: 'absolute',
      height: 'calc(100vh - 96px)',
      width: '100%',
      border: `1px solid ${theme.colors.sub_gray10}`,
      borderRadius: '16px 16px 0 0',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease-in-out',
      padding: '30px 0px',
      gap: '36px',
      display: 'flex',
      flexDirection: 'column',
    },
  },
);

const LabSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { step, country } = location.state;
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]); // 섹터 키 배열
  const [selectedStocks, setSelectedStocks] = useState<StockDetailInfo[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const isOpenModal = location.state?.isOpenModal;
  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectors = getSectorsByCountry(country as StockCountryKey);

  const handleClickStock = (stock: StockDetailInfo) => {
    console.log(stock);
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
    navigate(webPath.labPurchase(), {
      state: {
        ...location.state,
        step: step + 1,
        sectors: selectedSectors,
        stocks: selectedStocks,
      },
    });
  };

  const { toast, showToast } = useToast();

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
    showModalTimeoutRef.current = setTimeout(() => {
      setIsShowModal(true);
    }, 0);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
    showModalTimeoutRef.current = setTimeout(() => {
      navigate(-1);
    }, 100);
  };

  return (
    <LabSearchContainer>
      <LabSearchModal
        isOpenModal={isOpenModal}
        isShowModal={isShowModal}
        selectedStocks={selectedStocks}
        handleCloseModal={handleCloseModal}
        handleClickStock={handleClickStock}
      />
      <LabSearchTitleContainer>
        <p className="title">
          포트폴리오에 담고 싶은
          <br />
          종목이 있나요?
        </p>
        <p className="desc">
          * 검색으로 종목을 직접 추가할 수 있어요.
          <br />* 원하는 특정 종목이 없가면,
          <br />
          관심 있는 산업을 최대 3개까지 선택해주세요.
        </p>
      </LabSearchTitleContainer>
      <span className="divider" />
      <LabSearchSelectContainer>
        <p>관심 종목</p>
        <LabSearchSelectStockContainer onClick={handleOpenModal}>
          <p>종목명 or TICKER를 입력해주세요</p>
          <SearchSVG />
        </LabSearchSelectStockContainer>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          {selectedStocks.map((e) => (
            <div
              style={{
                background: theme.colors.sub_blue6,
                borderRadius: '999px',
                display: 'flex',
                gap: '8px',
                padding: '6px 12px',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              <StockImage
                style={{
                  borderRadius: '999px',
                  width: '24px',
                  height: '24px',
                }}
                stockId={e.stockId}
              />
              <p
                style={{
                  whiteSpace: 'nowrap',
                  margin: '0',
                  ...theme.font.body14Semibold,
                  color: theme.colors.sub_white,
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {e.symbolName}
              </p>
              <CrossSVG
                style={{
                  width: '16px',
                  height: 'auto',
                  aspectRatio: '1 / 1',
                  fill: theme.colors.sub_gray4,
                }}
                onClick={() => {
                  setSelectedStocks((prev) => prev.filter((b) => b.stockId != e.stockId));
                }}
              />
            </div>
          ))}
        </div>
      </LabSearchSelectContainer>
      <LabSearchSelectContainer>
        <p>관심 산업</p>
        <LabSearchSelectIndustryContainer>
          {sectors.map((sector: StockSector) => (
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
      <LabSearchButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep} disabled={!(selectedStocks.length || selectedSectors.length)}>
          선택완료
        </button>
      </LabSearchButtonContainer>
      {toast.enabled && <LabSearchToast closing={toast.closing}>{toast.message}</LabSearchToast>}
    </LabSearchContainer>
  );
};

const LabSearchToast = styled.div(
  ({ closing }: { closing: boolean }) => ({
    opacity: closing ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out',
  }),
  {
    position: 'fixed',
    bottom: '110px',
    background: 'rgba(0, 0, 0, 0.75)',
    left: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    border: '1px solid rgba(73, 80, 87, 0.5)',
    padding: '12px 16px',
    boxSizing: 'border-box',
    backdropFilter: 'blur(5px)',
    boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.5)',
    gap: '10px',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',

      fill: theme.colors.sub_blue6,
    },

    ['>p']: {
      margin: '0',
      ...theme.font.detail12Semibold,
      color: theme.colors.sub_gray2,

      ['&.cancel']: {
        color: theme.colors.sub_gray5,
        textDecoration: 'underline',
        marginLeft: 'auto',
        cursor: 'pointer',
      },
    },
  },
);

const LabSearchButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  marginTop: 'auto',
  padding: '0 20px',

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

const LabSearchSelectIndustryItemContainer = styled.p(
  ({ isSelected }: { isSelected: boolean }) => ({
    background: isSelected ? theme.colors.sub_blue6 : theme.colors.sub_gray10,
    color: isSelected ? theme.colors.sub_white : theme.colors.sub_gray6,
  }),
  {
    whiteSpace: 'nowrap',
    borderRadius: '999px',
    padding: '8px 16px',
    margin: '0',
    ...theme.font.body16Medium,
  },
);

const LabSearchSelectIndustryContainer = styled.div({
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  padding: '20px 12px',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '8px',
});

const LabSearchSelectStockContainer = styled.div({
  background: theme.colors.sub_gray11,
  borderRadius: '8px',
  padding: '10px 16px',
  display: 'flex',
  gap: '4px',
  ['>p']: {
    color: theme.colors.sub_gray7,
    margin: '0',
    ...theme.font.body16Medium,
    width: '100%',
  },

  ['>svg']: {
    flexShrink: '0',
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray7,
  },
});

const LabSearchSelectContainer = styled.div({
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
  },
});

const LabSearchTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '0 20px',

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

const LabSearchContainer = styled.div({
  padding: '32px 0',
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

export default LabSearch;
