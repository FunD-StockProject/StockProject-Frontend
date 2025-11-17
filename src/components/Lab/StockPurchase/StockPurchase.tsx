import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { webPath } from '@router/index';
import StockImage from '@components/Common/StockImage';
import { StockDetailInfo } from '@controllers/api.Type';
import { useStockIdSearchQuery } from '@controllers/query';
import BackLogoSVG from '@assets/backLogo.svg?react';
import DownSVG from '@assets/icons/down.svg?react';
import PurchaseCheckSVG from '@assets/icons/purchaseCheck.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  BackIcon,
  Container,
  Description,
  Divider,
  IndustryTag,
  InnerContainer,
  NavButton,
  NavButtonContainer,
  Title,
  ToastStyle,
  TopBar,
  TopBarTitle,
} from '../Common.Style';
import {
  IndustryTagWrapper,
  PurchaseButton,
  ScoreDiff,
  SectionTitle,
  StockCard,
  StockGrid,
  StockImagePlaceholder,
  StockName,
  StockPrice,
  StockScore,
} from './StockPurchase.Style';

const formatScoreDiff = (scoreDiff: number) => {
  const sign = scoreDiff > 0 ? '+' : '';
  return `${sign}${scoreDiff}`;
};

const StockSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedStocks = location.state?.selectedStocks ?? null;
  const country = location.state?.country ?? null;
  const industries = location.state?.selectedIndustries ?? null;

  const [purchasedStocks, setPurchasedStocks] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>();
  const [toast, setToast] = useState<React.ReactNode | null>(null);

  const currency = country === 'KOREA' ? '₩' : '$';
  const isValid = purchasedStocks.length > 0;

  const formatPrice = (price: number) => {
    return `${currency}${price.toLocaleString()}`;
  };
  console.log(industries);

  const handlePurchase = (symbol: string, name: string, price: number) => {
    setPurchasedStocks((prev) => [...prev, symbol]);
    const truncatedName = name.length > 14 ? `${name.slice(0, 14)}...` : name;
    showToast(
      <>
        <PurchaseCheckSVG style={{ marginRight: '6px' }} />
        {`${truncatedName} ${formatPrice(price)}로 매수 완료되었습니다.`}
      </>,
    );
  };

  const stockInfos =
    selectedStocks
      ?.map(
        (stock: StockDetailInfo) =>
          useQueryComponent({
            query: useStockIdSearchQuery(stock.stockId, stock.country),
          })[0],
      )
      .filter(Boolean) ?? [];

  const showToast = (message: React.ReactNode) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleIndustry = (label: string) => {
    setSelectedIndustry(label);
  };

  return (
    <Container>
      <TopBar statusRate={80}>
        <BackIcon onClick={() => navigate(-1)}>
          <BackLogoSVG />
        </BackIcon>
        <TopBarTitle>포트폴리오 생성하기</TopBarTitle>
      </TopBar>
      <InnerContainer>
        <Title>
          추천 종목을 보고 <br />
          관심있는 종목을 매수하세요
        </Title>
        <Description>* 현재 화면에 노출되는 가격으로 매수됩니다.</Description>
        <Divider />
        <SectionTitle>내가 선택한 종목</SectionTitle>
        <StockGrid>
          {stockInfos?.map((stockInfo: StockDetailInfo, index: number) => {
            const isPurchased = purchasedStocks.includes(stockInfo.symbol);
            const deltaSVG = stockInfo.scoreDiff === 0 ? null : stockInfo.scoreDiff > 0 ? <UpSVG /> : <DownSVG />;

            return (
              <StockCard key={index}>
                <StockImage stockId={stockInfo.stockId} />
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

        <SectionTitle>내 관심 산업별 추천 종목</SectionTitle>
        <IndustryTagWrapper>
          {industries.map((label: string) => (
            <IndustryTag key={label} selected={selectedIndustry === label} onClick={() => toggleIndustry(label)}>
              {label}
            </IndustryTag>
          ))}
        </IndustryTagWrapper>
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
