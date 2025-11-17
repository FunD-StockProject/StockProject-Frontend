import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { deltaScoreToColor, diffToValue } from '@utils/ScoreConvert';
import { useQueryComponent } from '@hooks/useQueryComponent';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { StockDetailInfo } from '@controllers/api.Type';
import { useStockIdSearchQuery } from '@controllers/query';
import { useBuyExperimentMutation } from '@controllers/query/portfolio';
import { theme } from '@styles/themes';
import CheckSVG from '@assets/icons/check.svg?react';

const LabPurchase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { step, stocks, industries } = location.state;

  const stockInfos: StockDetailInfo[] =
    stocks
      ?.map(
        (stock: StockDetailInfo) =>
          useQueryComponent({
            query: useStockIdSearchQuery(stock.stockId, stock.country),
          })[0],
      )
      .filter(Boolean) ?? [];

  console.log(stockInfos);

  const handlePrevStep = () => {
    navigate(-1);
  };

  const handleNextStep = () => {
    navigate(webPath.labPurchase(), {
      state: {
        ...location.state,
        step: step + 1,
      },
    });
  };

  const [selectedIndustry, setSelectedIndustry] = useState<string>('');

  const [purchased, setPurchased] = useState<number[]>([]);
  const { mutate: buyExperiment } = useBuyExperimentMutation();

  const { toast, showToast } = useToast();

  return (
    <LabPurchaseContainer>
      <LabPurchaseTitleContainer>
        <p className="title">
          관심있는 종목을 <br />
          매수해주세요
        </p>
        <p className="desc">* 현재 화면에 노출되는 가격으로 매수됩니다.</p>
      </LabPurchaseTitleContainer>
      <span className="divider" />
      <LabPurchaseContents>
        <p>내가 선택한 종목</p>
        <div className="grid">
          {stockInfos.map((e) => {
            const disabled = purchased.some((b) => b == e.stockId);
            return (
              <div>
                <div>
                  <StockImage stockId={e.stockId} />
                  <p>{e.symbolName}</p>
                  <div>
                    <LabPurchaseDeltaText delta={e.priceDiff} className="price">
                      {priceToText(e.price, e.country)}{' '}
                      <span>({diffToValue(Number(e.priceDiffPerCent.toFixed(1)))}%)</span>
                    </LabPurchaseDeltaText>
                    <LabPurchaseDeltaText delta={e.scoreDiff} className="score">
                      {e.score}점 <span>{diffToValue(e.scoreDiff)}점</span>
                    </LabPurchaseDeltaText>
                  </div>
                </div>
                <button
                  disabled={disabled}
                  onClick={() => {
                    buyExperiment({ stockId: e.stockId, country: e.country });

                    showToast(
                      <>
                        <CheckSVG />
                        <p>
                          {e.symbolName} {priceToText(e.price, e.country)}(으)로 매수 완료되었습니다.
                        </p>
                      </>,
                    );
                    setPurchased((prev) => [...prev, e.stockId]);
                  }}
                >
                  {disabled ? '매수완료' : '매수하기'}
                </button>
              </div>
            );
          })}
        </div>
      </LabPurchaseContents>
      <LabPurchaseContents>
        <p>내 관심 산업별 추천종목</p>
        <div className="category">
          {industries.map((e: string) => (
            <p className={selectedIndustry == e ? 'selected' : ''} onClick={() => setSelectedIndustry(e)}>
              {e}
            </p>
          ))}
        </div>
        <div className="grid">
          {/* {stockInfos.map((e) => (
            <div>
              <div>
                <StockImage stockId={e.stockId} />
                <p>{e.symbolName}</p>
                <div>
                  <LabPurchaseDeltaText delta={e.priceDiff} className="price">
                    {priceToText(e.price, e.country)}{' '}
                    <span>({diffToValue(Number(e.priceDiffPerCent.toFixed(1)))}%)</span>
                  </LabPurchaseDeltaText>
                  <LabPurchaseDeltaText delta={e.scoreDiff} className="score">
                    {e.score}점 <span>{diffToValue(e.scoreDiff)}점</span>
                  </LabPurchaseDeltaText>
                </div>
              </div>
              <button>매수하기</button>
            </div>
          ))} */}
        </div>
      </LabPurchaseContents>
      <LabPurchaseButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep} disabled={!purchased.length}>
          다음
        </button>
      </LabPurchaseButtonContainer>
      {toast.enabled && <LabPurchaseToast closing={toast.closing}>{toast.message}</LabPurchaseToast>}
    </LabPurchaseContainer>
  );
};

const LabPurchaseToast = styled.div(
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

const LabPurchaseButtonContainer = styled.div({
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

const priceToText = (price: number, country: StockCountryKey) => {
  const _price = price.toLocaleString();
  return (country == 'OVERSEA' ? '$' : '') + _price + (country == 'KOREA' ? '원' : '');
};

const LabPurchaseDeltaText = styled.p(
  ({ delta }: { delta: number }) => ({
    ['>span']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray11,
    },
  }),
  {},
);

const LabPurchaseContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '0 20px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,
  },

  ['>div.grid']: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',

    ['>div']: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      background: theme.colors.sub_gray11,
      borderRadius: '10px',
      padding: '24px 12px 20px',
      justifyContent: 'center',

      ['>div']: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',

        ['>img']: {
          width: '72px',
          height: '72px',
          borderRadius: '999px',
        },

        ['>p']: {
          margin: '0',
          ...theme.font.body18Semibold,
          color: theme.colors.sub_gray1,
        },

        ['>div']: {
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          alignItems: 'center',

          ['>p']: {
            margin: '0',
            color: theme.colors.sub_gray3,

            ['&.price']: {
              ...theme.font.body14Medium,
            },

            ['&.score']: {
              ...theme.font.detail12Semibold,
            },
          },
        },
      },

      ['>button']: {
        width: '100%',
        background: theme.colors.sub_blue6,
        color: theme.colors.sub_white,
        border: 'none',
        borderRadius: '8px',
        padding: '6px 10px',

        [':disabled']: {
          background: theme.colors.sub_black,
          color: theme.colors.sub_gray7,
        },
      },
    },
  },

  ['>div.category']: {
    display: 'flex',
    gap: '8px',
    padding: '0 4px',

    ['>p']: {
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray6,
      margin: '0',
      ...theme.font.body14Semibold,
      borderRadius: '999px',
      padding: '8px 15px',

      ['&.selected']: {
        background: theme.colors.sub_blue6,
        color: theme.colors.sub_white,
      },
    },
  },
});

const LabPurchaseTitleContainer = styled.div({
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

const LabPurchaseContainer = styled.div({
  padding: '32px 0px',
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

export default LabPurchase;
