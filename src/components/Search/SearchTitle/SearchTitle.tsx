import { AnimatePresence, Variants, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MARKET_CODES, ResultInfo } from '@ts/Constants';
import { RESULT_TYPE } from '@ts/Types';
import { deltaColor } from '@utils/Delta';
import { StockInfo } from '@controllers/api.Type';
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
  stockInfo: StockInfo;
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

  const variants: Variants = {
    initial: {
      left: '0%',
      transform: 'translateX(0%)',
    },
    animate: {
      left: '100%',
      transform: 'translateX(-100%)',
      transition: { duration: animationDelay['animate'] / 1000, ease: 'linear' }, // 애니메이션
    },
    instant: {
      left: '0%',
      transform: 'translateX(0%)',
      transition: { delay: animationDelay['instant'] / 1000, duration: 0 }, // 즉시 이동
    },
  };

  useEffect(() => {
    if (titleTextRef.current) {
      const { offsetWidth, scrollWidth } = titleTextRef.current;
      setAnimated(scrollWidth > offsetWidth);
      setAnimationDelay({ ...animationDelay, animate: (BASE_DELAY * scrollWidth) / offsetWidth });
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
            {false &&
              `동사는 신한금융 계열사에 대한 지배/경영관리, 종속회사에 대한 자금지원 등을 주요
            사업목적으로 2001년 설립된 금융지주회사임.`}
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
