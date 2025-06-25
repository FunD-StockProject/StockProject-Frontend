import { useState } from "react";
import { webPath } from "@router/index";
import { Container, TopBar, BackIcon, TopBarTitle, InnerContainer, Title, Description, NavButtonContainer, NavButton } from "../Common.Style";

import BackLogoSVG from '@assets/backLogo.svg?react';
import PurchaseCheckSVG from '@assets/icons/purchaseCheck.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';

import { useLocation, useNavigate } from "react-router-dom";
import { StockGrid, StockCard, StockName, StockPrice, StockScore, PurchaseButton, StockImagePlaceholder, ToastStyle, ScoreDiff } from "./StockPurchase.Style";
import { useQueryComponent } from "@hooks/useQueryComponent";
import { useStockIdSearchQuery } from "@controllers/query";
import { StockDetailInfo } from "@controllers/api.Type";

const StockSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [purchasedStocks, setPurchasedStocks] = useState<string[]>([]);
  const [toast, setToast] = useState<React.ReactNode | null>(null);
  const isValid = purchasedStocks.length > 0;
  const selectedStocks = location.state?.selectedStocks ?? null;
  const country = location.state?.country ?? null;

  const currency = country === 'KOREA' ? '₩' : '$';
  const formatPrice = (price: number) => {
    return `${currency}${price.toLocaleString()}`;
  };
  const selectedIndustries = location.state?.selectedIndustries ?? null;
  console.log(selectedIndustries);

  const formatScoreDiff = (scoreDiff: number) => {
    const sign = scoreDiff > 0 ? '+' : '';
    return `${sign}${scoreDiff}`;
  };

  const handlePurchase = (symbol: string, name: string, price: number) => {
    setPurchasedStocks(prev => [...prev, symbol]);
    const truncatedName = name.length > 14 ? `${name.slice(0, 14)}...` : name;
    showToast(
      <>
        <PurchaseCheckSVG style={{ marginRight: '6px' }} />
        {`${truncatedName} ${formatPrice(price)}로 매수 완료되었습니다.`}
      </>
    );
  };

  const stockInfos = selectedStocks?.map((stock: StockDetailInfo) =>
    useQueryComponent({
      query: useStockIdSearchQuery(stock.stockId, stock.country),
    })[0]
  ).filter(Boolean) ?? [];

  const showToast = (message: React.ReactNode) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };
  console.log(stockInfos);
  return (
    <Container>
      <TopBar statusRate={80}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogoSVG />
        </BackIcon>
        <TopBarTitle>종목 매수</TopBarTitle>
      </TopBar>
      <InnerContainer>
        <Title>
          추천 종목을 보고 <br />
          매수를 진행해주세요.
        </Title>
        <Description>* 주의 사항 안내!</Description>
        {/* Stock cards */}
        <StockGrid>
          {stockInfos?.map((stockInfo: StockDetailInfo, index: number) => {
            const isPurchased = purchasedStocks.includes(stockInfo.symbol);
            const deltaSVG = stockInfo.scoreDiff === 0 ? null : stockInfo.scoreDiff > 0 ? <UpSVG /> : <DownSVG />;

            return (
              <StockCard key={index}>
                <StockImagePlaceholder />
                <StockName>{stockInfo.symbolName}</StockName>
                <StockPrice>
                  {formatPrice(stockInfo.price)}
                  <ScoreDiff delta={stockInfo.priceDiff}>
                    &nbsp;({formatScoreDiff(stockInfo.priceDiffPerCent)}%)
                  </ScoreDiff>
                </StockPrice>
                <StockScore>
                  <div>{stockInfo.score}점 </div>
                  <ScoreDiff delta={stockInfo.scoreDiff}>
                    &nbsp;{formatScoreDiff(stockInfo.scoreDiff)}점 {deltaSVG}
                  </ScoreDiff>
                </StockScore>
                <PurchaseButton
                  onClick={() => handlePurchase(stockInfo.symbol, stockInfo.symbolName, stockInfo.price)}
                  purchased={isPurchased}
                  disabled={isPurchased}
                >
                  {isPurchased ? '매수완료' : '매수하기'}
                </PurchaseButton>
              </StockCard>
            );
          })}
        </StockGrid>

        <NavButtonContainer>
          <NavButton onClick={() => navigate(-1)}>이전</NavButton>
          <NavButton
            next={true}
            active={isValid}
            disabled={!isValid}
            onClick={() => navigate(webPath.labResult(), { state: { purchasedStocks, country } })}
          >
            완료
          </NavButton>
        </NavButtonContainer>

      </InnerContainer>
      {toast && <ToastStyle key={toast.toString()}>{toast}</ToastStyle>}
    </Container>
  );
};

export default StockSelection;
