import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '@ts/Interfaces';
import { StockType } from '@ts/Types';
import { useQueryComponent } from '@hooks/useQueryComponent';
import StockCardItem from '@components/StockCard/StockCard';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import { StockFetchQuery } from '@controllers/query';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import {
  ArrowButton,
  CardListItemContainer,
  HotItemButton,
  HotItemButtonContainer,
  NoScrollbar,
} from './CardList.Style';

const CardList = ({
  isHot = false,
  apiRef,
  name,
  index,
}: {
  isHot?: boolean;
  apiRef: React.MutableRefObject<publicApiType>;
  name: StockType;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  const [curStocks, suspend] = useQueryComponent({ query: StockFetchQuery(name, index) });

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    if (!containerRef.current) return;

    observer.observe(containerRef.current);
  }, [didMount]);

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const { width } = entry.contentRect;
      setWidth(width);
    });
  });

  // Helper function for rendering items
  const renderItem = (item: CardInterface) =>
    isHot ? (
      <CardListItemContainer key={`${name}_${item.stockId}`} width={width ?? 0}>
        <ScoreSlotMachine stockName={item.symbolName} title={true} stockScore={item.score} tabIndex={0} />
      </CardListItemContainer>
    ) : (
      <CardListItemContainer key={`${name}_${item.stockId}`} width={(width ?? 0) * 0.3}>
        <StockCardItem score={item.score} name={item.symbolName} delta={item.diff} />
      </CardListItemContainer>
    );

  const handleClick = (idx: number) => {
    apiRef.current.scrollToItem(apiRef.current.getItemByIndex(idx));
  };

  return (
    <NoScrollbar ref={containerRef}>
      {suspend ||
        (curStocks != null && width != 0 && (
          <ScrollMenu
            LeftArrow={<ScrollArrow direction="left" />}
            RightArrow={<ScrollArrow direction="right" />}
            apiRef={apiRef}
          >
            {curStocks.map(renderItem)}
          </ScrollMenu>
        ))}
      {!isHot && (
        <HotItemButtonContainer>
          {curStocks &&
            curStocks.map((item: CardInterface, idx: number) => (
              <HotItemButton key={item.stockId} onClick={() => handleClick(idx)}>
                {idx + 1}
              </HotItemButton>
            ))}
        </HotItemButtonContainer>
      )}
    </NoScrollbar>
  );
};

// Reusable Arrow component with better naming
const ScrollArrow = ({ direction }: { direction: 'left' | 'right' }) => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const isDisabled = direction === 'left' ? visibility.useLeftArrowVisible() : visibility.useRightArrowVisible();
  const onClick = direction === 'left' ? visibility.scrollPrev : visibility.scrollNext;
  const imgLink = direction === 'left' ? leftArrowImgLink : rightArrowImgLink;

  return <ArrowButton src={imgLink} disabled={isDisabled} onClick={() => onClick()} className={`arrow-${direction}`} />;
};

export default CardList;
