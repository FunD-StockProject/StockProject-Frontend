import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import MobileStockCardItem from '@components/CardList/MobileStockCard/MobileStockCard';
import StockCardItem from '@components/CardList/StockCard/StockCard';
import { StockType } from '@components/Common/Common.Type';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockScore } from '@controllers/api.Type';
import { StockFetchQuery } from '@controllers/query';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import { ArrowButton, CardListItemContainer, NoScrollbar } from './CardList.Style';

const CardList = ({
  apiRef,
  name,
  country,
}: {
  apiRef: React.MutableRefObject<publicApiType>;
  name: StockType;
  country: string;
}) => {
  const isHot = name === 'HOT';

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const isMobile = useIsMobile();
  const [curStocks, suspend] = useQueryComponent({ query: StockFetchQuery(name, country) });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const renderStocks = () => {
    if (isHot) return renderHotStocks();
    if (isMobile) return renderMobileStocks();
    return renderWebStocks();
  };

  const renderHotStocks = () => {
    return curStocks.map((stock: StockScore, idx: number) => (
      <CardListItemContainer key={`${name}_${idx}`} width={(width ?? 0) * (isMobile ? 0.9 : 1)}>
        <ScoreSlotMachine
          stockName={stock.symbolName}
          active={true}
          stockScore={stock.score}
          tabIndex={0}
          country={country}
        />
      </CardListItemContainer>
    ));
  };

  const renderWebStocks = () => {
    return curStocks.map((stock: StockScore, idx: number) => (
      <CardListItemContainer key={`${name}_${idx}`} width={(width ?? 0) * 0.3}>
        <StockCardItem
          score={stock.score}
          name={stock.symbolName}
          delta={stock.diff}
          country={country}
          keywords={stock.keywords}
        />
      </CardListItemContainer>
    ));
  };

  const renderMobileStocks = () => {
    return curStocks.map((stock: StockScore, idx: number) => (
      <CardListItemContainer key={`${name}_${idx}`} width={(width ?? 0) * 0.75}>
        <MobileStockCardItem
          key={`${name}_${idx}`}
          score={stock.score}
          name={stock.symbolName}
          delta={stock.diff}
          country={country}
          keywords={stock.keywords}
        />
      </CardListItemContainer>
    ));
  };

  return (
    <NoScrollbar ref={containerRef}>
      {suspend ||
        (curStocks && width !== 0 && (
          <ScrollMenu
            LeftArrow={<ScrollArrow direction="left" />}
            RightArrow={<ScrollArrow direction="right" />}
            apiRef={apiRef}
          >
            {renderStocks()}
          </ScrollMenu>
        ))}
    </NoScrollbar>
  );
};

const ScrollArrow = ({ direction }: { direction: 'left' | 'right' }) => {
  const { scrollPrev, scrollNext, useIsVisible } = useContext(VisibilityContext);

  const isFirstItemVisible = useIsVisible('first', true);
  const isLastItemVisible = useIsVisible('last', false);
  const isDisabled = direction === 'left' ? isFirstItemVisible : isLastItemVisible;

  const onClick = () => {
    if (isDisabled) return; // 비활성화 상태면 동작 안 함
    direction === 'left' ? scrollPrev() : scrollNext();
  };

  const imgLink = direction === 'left' ? leftArrowImgLink : rightArrowImgLink;

  return (
    <ArrowButton
      src={imgLink}
      onClick={onClick} // 직접 실행
      className={`arrow-${direction} ${isDisabled ? 'disabled' : ''}`}
      disabled={isDisabled}
    />
  );
};
export default CardList;
