import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StockCountryKey } from '@ts/StockCountry';
import { STOCK_SECTOR_MAP, StockSectorKey } from '@ts/StockSector';
import { diffToValue } from '@utils/ScoreConvert';
import useToast from '@hooks/useToast';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { StockDetailInfo } from '@controllers/stocks/types';
import { useBuyExperimentMutation, useSectorRecommendQuery } from '@controllers/experiment/query';
import { stockInfoQueries } from '@controllers/stocks/query';
import CheckSVG from '@assets/icons/check.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import { StepButtonContainer } from '../Step.Style';
import {
  LabPurchaseContainer,
  LabPurchaseContents,
  LabPurchaseGridContainer,
  LabPurchaseGridItemContainer,
  LabPurchaseGridItemText,
  LabPurchaseToast,
} from './Purchase.Style';

const priceToText = (price: number, country: StockCountryKey) => {
  const _price = price.toLocaleString();
  return (country == 'OVERSEA' ? '$' : '') + _price + (country == 'KOREA' ? '원' : '');
};

const LabPurchase = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    step,
    stocks: selectedStocks = [],
    country: selectedCountry = 'KOREA',
    sectors: selectedSectorKeys = [],
  }: {
    step: number;
    stocks: StockDetailInfo[];
    country: StockCountryKey;
    sectors: StockSectorKey[];
  } = location.state; // 섹터 키 배열
  const [selectedSector, setSelectedSector] = useState<StockSectorKey | undefined>(selectedSectorKeys?.[0]); // 첫 번째 섹터를 기본 선택

  const selectedStockInfos = ((stockInfoQueries(selectedStocks) ?? []).map((query) => query.data).filter(Boolean) ?? []) as StockDetailInfo[];

  const [purchased, setPurchased] = useState<number[]>([]);
  const { mutate: buyExperiment } = useBuyExperimentMutation();
  const { data: sectorRecommendStockInfos } = useSectorRecommendQuery(selectedCountry, selectedSector);

  console.log(sectorRecommendStockInfos);

  const { toast, showToast } = useToast();
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

  const handleClickPurchase = (stockInfo: StockDetailInfo) => () => {
    buyExperiment({ stockId: stockInfo.stockId, country: stockInfo.country });

    showToast(
      <>
        <CheckSVG />
        <p>
          {stockInfo.symbolName} {priceToText(stockInfo.price, stockInfo.country)}(으)로 매수 완료되었습니다.
        </p>
      </>,
    );
    setPurchased((prev) => [...prev, stockInfo.stockId]);
  };

  const handleClickSectorTab = (sectorKey: StockSectorKey) => () => {
    setSelectedSector((prev) => (prev == sectorKey ? undefined : sectorKey));
  };

  return (
    <LabPurchaseContainer>
      <span className="divider" />
      <LabPurchaseContents>
        <p>내가 선택한 종목</p>
        <LabPurchaseGridContainer>
          {selectedStockInfos.map((e) => {
            const disabled = purchased.some((b) => b == e.stockId);

            return (
              <LabPurchaseGridItemContainer key={`SELECTED_STOCK_${e.stockId}`}>
                <div>
                  <StockImage stockId={e.stockId} />
                  <p>{e.symbolName}</p>
                  <div>
                    <LabPurchaseGridItemText delta={e.priceDiff} className="price">
                      {priceToText(e.price, e.country)}{' '}
                      <span>({diffToValue(Number(e.priceDiffPerCent.toFixed(1)))}%)</span>
                    </LabPurchaseGridItemText>
                    <LabPurchaseGridItemText delta={e.scoreDiff} className="score">
                      {e.score}점{' '}
                      <span>
                        {diffToValue(e.scoreDiff)}점 {e.scoreDiff > 0 ? <UpSVG /> : e.scoreDiff < 0 ? <DownSVG /> : '-'}
                      </span>
                    </LabPurchaseGridItemText>
                  </div>
                </div>
                <button disabled={disabled} onClick={handleClickPurchase(e)}>
                  {disabled ? '매수완료' : '매수하기'}
                </button>
              </LabPurchaseGridItemContainer>
            );
          })}
        </LabPurchaseGridContainer>
      </LabPurchaseContents>
      <LabPurchaseContents>
        <p>내 관심 산업별 추천종목</p>
        <div className="category">
          {selectedSectorKeys?.map((sectorKey: StockSectorKey) => {
            const sector = STOCK_SECTOR_MAP[sectorKey];
            return sector ? (
              <p
                key={sectorKey}
                className={selectedSector === sectorKey ? 'selected' : ''}
                onClick={handleClickSectorTab(sectorKey)}
              >
                {sector.text}
              </p>
            ) : null;
          })}
        </div>
      </LabPurchaseContents>
      <StepButtonContainer>
        <button onClick={handlePrevStep}>이전</button>
        <button onClick={handleNextStep} disabled={!purchased.length}>
          다음
        </button>
      </StepButtonContainer>
      {toast.enabled && <LabPurchaseToast closing={toast.closing}>{toast.message}</LabPurchaseToast>}
    </LabPurchaseContainer>
  );
};

export default LabPurchase;
