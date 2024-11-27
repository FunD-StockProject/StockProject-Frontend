import {
  /*Suspense,*/
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
// import { ErrorBoundary } from 'react-error-boundary';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '@ts/Interfaces';
import { StockType } from '@ts/Types';
import { useStocks } from '@hooks/useStocks';
import StockCardItem from '@components/StockCard/StockCard';
import ScoreSlotMachine from '@components/StockSlotMachine/StockSlotMachine';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import {
  ArrowButton,
  CardListItemContainer, // HotItemButton,
  // HotItemButtonContainer,
  NoScrollbar,
} from './CardList.Style';

const CardList = ({
  // list,
  isHot = false,
  apiRef,
  name,
  index,
}: {
  // list: CardInterface[];
  isHot?: boolean;
  apiRef: React.MutableRefObject<publicApiType>;
  name: StockType;
  index: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);

  const { data: stocks = [[], []] } = useStocks(name);
  const curStocks = stocks[index];

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

  // Helper function for rendering items
  const renderItem = (item: CardInterface) =>
    isHot ? (
      <CardListItemContainer key={item.stockId} width={width ?? 0}>
        <ScoreSlotMachine stockName={item.symbolName} title={true} stockScore={item.score} tabIndex={0} />
      </CardListItemContainer>
    ) : (
      <CardListItemContainer key={item.stockId} width={width / 4}>
        <StockCardItem score={item.score} name={item.symbolName} delta={item.diff} />
      </CardListItemContainer>
    );

  // const handleClick = (idx: number) => {
  //   apiRef.current.scrollToItem(apiRef.current.getItemByIndex(idx));
  // };

  return (
    <>
      <NoScrollbar ref={containerRef}>
        {width && (
          <ScrollMenu
            LeftArrow={<ScrollArrow direction="left" />}
            RightArrow={<ScrollArrow direction="right" />}
            apiRef={apiRef}
          >
            {curStocks.map(renderItem)}
          </ScrollMenu>
        )}
      </NoScrollbar>
      {/* {isHot && (
          <HotItemButtonContainer>
            {list.map((item, idx) => (
              <HotItemButton key={item.stockId} onClick={() => handleClick(idx)}>
                {item.symbolName}
              </HotItemButton>
            ))}
          </HotItemButtonContainer>
        )} */}
    </>
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
