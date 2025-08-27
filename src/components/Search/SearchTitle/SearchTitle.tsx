import { AnimatePresence, Variants, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKET_CODES } from '@ts/Constants';
import { RESULT_TYPE } from '@ts/Types';
import { deltaColor } from '@utils/Delta';
import { StockDetailInfo } from '@controllers/api.Type';
import { useStockSummaryQuery } from '@controllers/query';
import {
  SearchTitleBody,
  SearchTitleBodySubtitle,
  SearchTitleBodyTitle,
  SearchTitleBodyTitleAnimatedText,
  SearchTitleBodyTitleText,
  SearchTitleContainer,
  SearchTitleFooterContainer,
  SearchTitleFooterItems,
  SearchTitlePriceText,
} from './SearchTitle.Style';

const BASE_DELAY = 1500;


const SearchTitle = ({
  stockInfo,
}: {
  stockInfo: StockDetailInfo;
  resultMode: RESULT_TYPE;
  onClick: (e: any) => void;
}) => {
  const { state } = useLocation();

  const concurrency = stockInfo.country === "KOREA" ? '₩' : '$'
  const symbol = stockInfo.priceDiff > 0 ? '+' : stockInfo.priceDiff < 0 ? '-' : '';
  const titleTextRef = useRef<HTMLDivElement>(null);

  const [animated, setAnimated] = useState<boolean>(false);
  const [animationDelay, setAnimationDelay] = useState<any>({
    initial: BASE_DELAY,
    animate: BASE_DELAY,
    instant: BASE_DELAY,
  });
  const [animation, cycleAnimation] = useCycle(...Object.keys(animationDelay));

  const [summary] = useStockSummaryQuery(stockInfo.symbol, stockInfo.country);

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

  return (
    stockInfo && (
      <SearchTitleContainer>
        <SearchTitleBody>
          <SearchTitleBodyTitle>
            <SearchTitleBodyTitleText ref={titleTextRef}>
              {stockInfo.symbolName}
              <AnimatePresence>
                <SearchTitleBodyTitleAnimatedText variants={variants} animate={animation}>
                  {stockInfo.symbolName}
                </SearchTitleBodyTitleAnimatedText>
              </AnimatePresence>
              <SearchTitlePriceText>{concurrency}{stockInfo.price.toLocaleString()}</SearchTitlePriceText>
            </SearchTitleBodyTitleText>
          </SearchTitleBodyTitle>
          <SearchTitleFooterContainer>
            <SearchTitleFooterItems>{MARKET_CODES[stockInfo.exchangeNum]} |</SearchTitleFooterItems>
            <SearchTitleFooterItems>{stockInfo.symbol} |</SearchTitleFooterItems>
            <SearchTitleFooterItems delta={deltaColor(stockInfo.priceDiff)}>
              <span>{symbol} {stockInfo.price.toLocaleString()}
                {`(${Math.abs(stockInfo.priceDiffPerCent)}%)`}</span>
            </SearchTitleFooterItems>
          </SearchTitleFooterContainer>
          <SearchTitleBodySubtitle>
            {summary.map((e, i) => (
              <span key={`Summary_${stockInfo.symbol}_${i}`}>{e}</span>
            ))}
          </SearchTitleBodySubtitle>
        </SearchTitleBody>
      </SearchTitleContainer>
    )
  );
};

export default SearchTitle;
