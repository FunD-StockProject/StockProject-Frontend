
import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import StockCardItem from '../../components/StockCard/StockCard';
import { CardInterface } from '../../ts/Interfaces';
import { ArrowButton, CardListItemContainer, NoScrollbar } from './CardList.Style';

import { publicApiType, ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';
import { ArrowButton, NoScrollbar, StyledButton } from './CardList.Style';
import HotCard from '../HotCard/HotCard';
import { Suspense, useContext, useMemo } from 'react';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import { ErrorBoundary } from 'react-error-boundary';


const CardList = ({
  list,
  isHot = false,
  apiRef,
}: {
  list: CardInterface[];
  isHot?: boolean;
  apiRef: React.MutableRefObject<publicApiType>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();

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
    for (let entry of entries) {
      const { width } = entry.contentRect;
      setWidth(width);
    }
  });

  return (
    <NoScrollbar ref={containerRef}>
      {width && (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} apiRef={apiRef}>
          {isHot
            ? list.map((item: CardInterface) => {
                return (
                  <CardListItemContainer width={width ?? 0}>
                    <ScoreSlotMachine stockName={item.symbolName} title={true} stockScore={item.score} tabIndex={0} />
                  </CardListItemContainer>
                );
              })
            : list.map((item: CardInterface) => {
                return (
                  <CardListItemContainer width={width / 4}>
                    <StockCardItem key={item.stockId} score={item.score} name={item.symbolName} delta={item.diff} />
                  </CardListItemContainer>
                );
              })}
        </ScrollMenu>
      )}
    </NoScrollbar>
  );
};
  const isMobile = useMemo(() => window.innerWidth < 450, []);

  // Helper function for rendering items
  const renderItem = (item: CardInterface) =>
    isHot ? (
      <HotCard key={item.stockId} score={item.score} stockName={item.symbolName} />
    ) : (
      <Card key={item.stockId} score={item.score} stockName={item.symbolName} diff={item.diff} />
    );

  const handleClick = (idx: number) => {
    apiRef.current.scrollToItem(apiRef.current.getItemByIndex(idx));
  };

  return (
    <ErrorBoundary fallback={<div>Error Occured</div>}>
      <Suspense fallback={<div>로딩중</div>}>
        <NoScrollbar>
          <ScrollMenu
            LeftArrow={!isMobile && <ScrollArrow direction="left" />}
            RightArrow={!isMobile && <ScrollArrow direction="right" />}
            apiRef={apiRef}
          >
            {list.map(renderItem)}
          </ScrollMenu>
        </NoScrollbar>
        {isHot && (
          <div>
            {list.map((item, idx) => (
              <StyledButton key={item.stockId} onClick={() => handleClick(idx)}>
                {item.symbolName}
              </StyledButton>
            ))}
          </div>
        )}
      </Suspense>
    </ErrorBoundary>
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
