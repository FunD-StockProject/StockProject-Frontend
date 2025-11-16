import styled from '@emotion/styled';
import { AnimatePresence, Variants, useCycle } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MARKET_CODES } from '@ts/Constants';
import { RESULT_TYPE } from '@ts/Types';
import { getItemLocalStorage } from '@utils/LocalStorage';
import { webPath } from '@router/index';
import Button from '@components/Common/Button';
import ConfirmModal from '@components/Modal/Confirm/ConfirmModal';
import { StockDetailInfo } from '@controllers/api.Type';
import { useStockSummaryQuery } from '@controllers/query';
import { useBuyExperimentMutation } from '@controllers/query/portfolio';
import { theme } from '@styles/themes';
import KoreaPNG from '@assets/flags/korea.png';
import AlertSVG from '@assets/icons/alert.svg?react';
import {
  SearchTitleContainer,
  SearchTitleDescriptionContainer,
  SearchTitleDetailContainer,
  SearchTitleDetailSymbol,
  SearchTitleHeaderContainer,
  SearchTitleHeaderText,
  SearchTitleHeaderTextAnimated,
} from './SearchTitle.Style';

const BASE_DELAY = 1500;

const SearchTitleName = ({ stockInfo: { symbolName, country, price } }: { stockInfo: StockDetailInfo }) => {
  const { state } = useLocation();

  const titleTextRef = useRef<HTMLDivElement>(null);

  const [animated, setAnimated] = useState<boolean>(false);
  const [animationDelay, setAnimationDelay] = useState<any>({
    initial: BASE_DELAY,
    animate: BASE_DELAY,
    instant: BASE_DELAY,
  });
  const [animation, cycleAnimation] = useCycle(...Object.keys(animationDelay));
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
      <p className="price">
        {concurrency}
        {price.toLocaleString()}
      </p>
    </SearchTitleHeaderContainer>
  );
};

const SearchTitleDetail = ({
  stockInfo: { exchangeNum, symbol, priceDiff, priceDiffPerCent },
}: {
  stockInfo: StockDetailInfo;
}) => {
  const marketCode = MARKET_CODES[exchangeNum];

  const diffSign = priceDiff > 0 ? '+' : priceDiff < 0 ? '-' : '';
  const diffPercentText = Math.abs(priceDiffPerCent).toFixed(2);
  const diffValueText = diffSign + Math.abs(priceDiff).toLocaleString();

  return (
    <SearchTitleDetailContainer delta={priceDiff}>
      <span className="market-code">{marketCode}</span>
      <SearchTitleDetailSymbol>
        <p>{symbol}</p>
        <img src={KoreaPNG} alt="arrow" />
      </SearchTitleDetailSymbol>
      <span className="price-diff">
        {diffValueText}
        {`(${diffPercentText}%)`}
      </span>
    </SearchTitleDetailContainer>
  );
};

const SearchTitleAlertContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  background: theme.colors.sub_gray11,
  justifyContent: 'center',
  borderRadius: '5px',
  border: `1px solid ${theme.colors.sub_gray10}`,

  ['>p']: {
    ...theme.font.detail12Semibold,
    color: theme.colors.sub_gray5,
    margin: '0',
  },

  ['>svg']: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
  },
});

const SearchTitle = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const [summary] = useStockSummaryQuery(stockInfo.symbol, stockInfo.country);
  const navigate = useNavigate();
  const isLogin = !!getItemLocalStorage('access_token');

  const { mutate: buyExperiment } = useBuyExperimentMutation();

  const handleClickBuy = () => {
    if (!isLogin) {
      openLoginModal();
      return;
    }
    buyExperiment({ stockId: stockInfo.stockId, country: stockInfo.country });
  };

  const handleLogin = () => {
    navigate(webPath.login());
  };

  const [LoginModal, openLoginModal] = ConfirmModal({
    title: '모의 매수를 진행하려면, 로그인이 필요해요!',
    description: '나만의 투자심리 분석 보고서를 받고 싶다면, 로그인을 진행해주세요',
    onConfirm: handleLogin,
    isInverse: true,
    actionText: ['로그인하기', '취소'],
  });

  return (
    stockInfo && (
      <SearchTitleContainer>
        <LoginModal />
        <SearchTitleName stockInfo={stockInfo} />
        <SearchTitleDetail stockInfo={stockInfo} />
        <SearchTitleDescriptionContainer>
          {summary.map((e, i) => (
            <span key={`Summary_${stockInfo.symbol}_${i}`}>{e}</span>
          ))}
        </SearchTitleDescriptionContainer>
        <SearchTitleAlertContainer>
          <AlertSVG />
          <p>인간지표는 공식 지표가 아니므로 참고 용도로만 활용해주세요</p>
        </SearchTitleAlertContainer>
        <Button onClick={handleClickBuy}>모의 매수하기</Button>
      </SearchTitleContainer>
    )
  );
};

export default SearchTitle;
