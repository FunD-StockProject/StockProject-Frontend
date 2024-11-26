import { useContext, useEffect, useRef, useState } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import { StyledContainer } from '@layout/HotCard/HotCard.Style';
import leftArrowImgLink from '../../assets/leftArrow.svg';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import StockCardItem from '../../components/StockCard/StockCard';
import { CardInterface } from '../../ts/Interfaces';
import HotCard from '../HotCard/HotCard';
// import Card from '../Card/Card';
import { ArrowButton, NoScrollbar } from './CardList.Style';

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
    setWidth(containerRef.current.offsetWidth);
  }, [didMount]);

  return (
    <NoScrollbar ref={containerRef}>
      {width && (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} apiRef={apiRef}>
          {isHot
            ? list.map((item: CardInterface) => {
                return <HotCard width={width} key={item.stockId} score={item.score} stockName={item.symbolName} />;
              })
            : list.map((item: CardInterface) => {
                return (
                  <StyledContainer width={width / 4}>
                    <StockCardItem key={item.stockId} score={item.score} name={item.symbolName} delta={item.diff} />
                  </StyledContainer>
                );
              })}
        </ScrollMenu>
      )}
    </NoScrollbar>
  );
};

const LeftArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const disabled = visibility.useLeftArrowVisible();

  return (
    <Arrow
      imgLink={leftArrowImgLink}
      disabled={disabled}
      onClick={() => visibility.scrollPrev()}
      className="left"
      testId="left-arrow"
    ></Arrow>
  );
};

const RightArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const disabled = visibility.useRightArrowVisible();

  return (
    <Arrow
      imgLink={rightArrowImgLink}
      disabled={disabled}
      onClick={() => visibility.scrollNext()}
      className="right"
      testId="right-arrow"
    ></Arrow>
  );
};

const Arrow = ({
  imgLink,
  disabled,
  onClick,
  className,
  testId,
}: {
  imgLink: string;
  disabled: boolean;
  onClick: VoidFunction;
  className?: string;
  testId: string;
}) => {
  return (
    <ArrowButton
      src={imgLink}
      disabled={disabled}
      onClick={onClick}
      className={'arrow' + `-${className}`}
      data-testid={testId}
    />
  );
};

export default CardList;
