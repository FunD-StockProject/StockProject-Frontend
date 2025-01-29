import { AnimatePresence, Variants, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKET_CODES, ResultInfo } from '@ts/Constants';
import { RESULT_TYPE } from '@ts/Types';
import { deltaColor } from '@utils/Delta';
import { StockDetailInfo } from '@controllers/api.Type';
import { useStockSummaryQuery } from '@controllers/query';
import RightSVG from '@assets/icons/right.svg?react';
import ZipyoSVG from '@assets/zipyo.svg?react';
import {
  SearchTitleBody,
  SearchTitleBodySubtitle,
  SearchTitleBodyTitle,
  SearchTitleBodyTitleAnimatedText,
  SearchTitleBodyTitleSVG,
  SearchTitleBodyTitleText,
  SearchTitleContainer,
  SearchTitleFooterContainer,
  SearchTitleFooterItems,
  SearchTitleHeaderButton,
  SearchTitleHeaderContainer,
  SearchTitleHeaderSymbol,
} from './SearchTitle.Style';

const BASE_DELAY = 1500;

const priceDiff = (diff: number) => `${(diff < 0 ? '-' : '+') + Math.abs(diff).toLocaleString()}`;

const SearchTitle = ({
  stockInfo,
  resultMode,
  onClick,
}: {
  stockInfo: StockDetailInfo;
  resultMode: RESULT_TYPE;
  onClick: (e: any) => void;
}) => {
  const { state } = useLocation();

  const money = stockInfo.country === 'KOREA' ? '₩' : '$';

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
        <SearchTitleHeaderContainer>
          <SearchTitleHeaderSymbol>{stockInfo.symbol}</SearchTitleHeaderSymbol>
          <SearchTitleHeaderButton onClick={onClick}>
            {ResultInfo[ResultInfo[resultMode].opposite].text} 보기
            <RightSVG />
          </SearchTitleHeaderButton>
        </SearchTitleHeaderContainer>
        <SearchTitleBody>
          <SearchTitleBodyTitle>
            <SearchTitleBodyTitleText ref={titleTextRef}>
              {stockInfo.symbolName}
              <AnimatePresence>
                <SearchTitleBodyTitleAnimatedText variants={variants} animate={animation}>
                  {stockInfo.symbolName}
                </SearchTitleBodyTitleAnimatedText>
              </AnimatePresence>
            </SearchTitleBodyTitleText>
            <SearchTitleBodyTitleSVG>
              <ZipyoSVG />
            </SearchTitleBodyTitleSVG>
          </SearchTitleBodyTitle>
          <SearchTitleBodySubtitle>
            {summary.map((e, i) => (
              <span key={`Summary_${stockInfo.symbol}_${i}`}>{e}</span>
            ))}
          </SearchTitleBodySubtitle>
        </SearchTitleBody>
        <SearchTitleFooterContainer>
          <SearchTitleFooterItems>{MARKET_CODES[stockInfo.exchangeNum]}</SearchTitleFooterItems>
          <SearchTitleFooterItems delta={deltaColor(stockInfo.priceDiff)}>
            {money} {stockInfo.price.toLocaleString()}
            <span>{`${priceDiff(stockInfo.priceDiff)}(${stockInfo.priceDiffPerCent}%)`}</span>
          </SearchTitleFooterItems>
        </SearchTitleFooterContainer>
      </SearchTitleContainer>
    )
  );
};

export default SearchTitle;
