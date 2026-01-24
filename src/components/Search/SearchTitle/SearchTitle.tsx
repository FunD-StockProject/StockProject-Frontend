import { AnimatePresence, Variants, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MARKET_CODES } from '@ts/Constants';
import useAuthInfo from '@hooks/useAuthInfo';
import { useQueryComponent } from '@hooks/useQueryComponent';
import { webPath } from '@router/index';
import Button from '@components/Common/Button';
import { useBuyExperimentMutation } from '@controllers/experiment/query';
import { useScoreQuery } from '@controllers/stocks/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import KoreaPNG from '@assets/flags/korea.png';
import OverseaPNG from '@assets/flags/oversea.png';
import {
  SearchTitleContainer,
  SearchTitleDetailContainer,
  SearchTitleDetailSymbol,
  SearchTitleHeaderContainer,
  SearchTitleHeaderText,
  SearchTitleHeaderTextAnimated,
  SearchTitlePrice,
  SearchTitlePriceWrapper,
  SearchTitleScoreBadge,
} from './SearchTitle.Style';

const BASE_DELAY = 1500;

const SearchTitleName = ({ stockInfo: { symbolName, country, price, stockId } }: { stockInfo: StockDetailInfo }) => {
  const { state } = useLocation();

  const titleTextRef = useRef<HTMLDivElement>(null);

  const [animated, setAnimated] = useState<boolean>(false);
  const [animationDelay, setAnimationDelay] = useState<any>({
    initial: BASE_DELAY,
    animate: BASE_DELAY,
    instant: BASE_DELAY,
  });
  const [animation, cycleAnimation] = useCycle(...Object.keys(animationDelay));
  const [stockScore, suspend] = useQueryComponent({ query: useScoreQuery(stockId, country) });
  const concurrency = country === 'KOREA' ? '₩' : '$';
  useEffect(() => {
    if (titleTextRef.current) {
      const { offsetWidth, scrollWidth } = titleTextRef.current;
      setAnimated(scrollWidth > offsetWidth);
      setAnimationDelay({
        ...animationDelay,
        animate: BASE_DELAY * (scrollWidth / offsetWidth - 1) * 2,
      });
    }
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animated) cycleAnimation();
    }, animationDelay[animation]);
    return () => clearInterval(interval);
  }, [animation, animated]);

  const variants: Variants = {
    initial: {
      transform: 'translateX(0%)',
    },
    animate: {
      transform:
        'translateX(' + ((titleTextRef.current?.offsetWidth ?? 0) - (titleTextRef.current?.scrollWidth ?? 0)) + 'px)',
      transition: {
        duration: animationDelay['animate'] / 1000,
        ease: 'linear',
      }, // 애니메이션
    },
    instant: {
      transform: 'translateX(0%)',
      transition: {
        delay: animationDelay['instant'] / 1000,
        duration: 0,
        ease: 'linear',
      }, // 즉시 이동
    },
  };

  return (
    <SearchTitleHeaderContainer>
      <SearchTitleHeaderText ref={titleTextRef}>
        {symbolName}
        <AnimatePresence>
          <SearchTitleHeaderTextAnimated variants={variants} animate={animation}>
            {symbolName}
          </SearchTitleHeaderTextAnimated>
        </AnimatePresence>
      </SearchTitleHeaderText>
      <SearchTitlePriceWrapper>
        <SearchTitlePrice>
          {concurrency}
          {price.toLocaleString()}
        </SearchTitlePrice>
        {!suspend && stockScore && (
          <SearchTitleScoreBadge>
            <p>인간지표 {stockScore.score}점</p>
          </SearchTitleScoreBadge>
        )}
      </SearchTitlePriceWrapper>
    </SearchTitleHeaderContainer>
  );
};

const SearchTitleDetail = ({
  stockInfo: { exchangeNum, symbol, priceDiff, priceDiffPerCent, country },
}: {
  stockInfo: StockDetailInfo;
}) => {
  const marketCode = MARKET_CODES[exchangeNum];

  const diffSign = priceDiff > 0 ? '+' : priceDiff < 0 ? '-' : '';
  const diffPercentText = Math.abs(priceDiffPerCent).toFixed(2);
  const diffValueText = diffSign + Math.abs(priceDiff).toLocaleString();
  const flag = country === 'KOREA' ? KoreaPNG : OverseaPNG;

  return (
    <SearchTitleDetailContainer delta={priceDiff}>
      <span className="market-code">{marketCode}</span>
      <SearchTitleDetailSymbol>
        <p>{symbol}</p>
        <img src={flag} alt="arrow" />
      </SearchTitleDetailSymbol>
      <span className="price-diff">
        {diffValueText}
        {`(${diffPercentText}%)`}
      </span>
    </SearchTitleDetailContainer>
  );
};

const SearchTitle = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const navigate = useNavigate();
  const { isLogin } = useAuthInfo();

  const { mutate: buyExperiment } = useBuyExperimentMutation();

  const handleClickBuy = () => {
    if (!isLogin) {
      navigate(webPath.labStep(), { state: { step: 0 } });
      return;
    }
    buyExperiment({ stockId: stockInfo.stockId, country: stockInfo.country });
    navigate(webPath.labStep(), { state: { step: 4 } });
  };

  return (
    stockInfo && (
      <SearchTitleContainer>
        <SearchTitleName stockInfo={stockInfo} />
        <SearchTitleDetail stockInfo={stockInfo} />
        <Button onClick={handleClickBuy}>모의 매수하기</Button>
      </SearchTitleContainer>
    )
  );
};

export default SearchTitle;
