import { useContext } from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
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
  const isMobile = window.innerWidth < 450; // 추후 수정
  console.log(list);

  return (
    <NoScrollbar>
      <ScrollMenu
        LeftArrow={!isMobile ? LeftArrow : undefined}
        RightArrow={!isMobile ? RightArrow : undefined}
        apiRef={apiRef}
      >
        {isHot
          ? list.map((item: CardInterface) => {
              return <HotCard key={item.stockId} score={item.score} stockName={item.symbolName} />;
            })
          : list.map((item: CardInterface) => {
              return <StockCardItem key={item.stockId} score={item.score} name={item.symbolName} delta={item.diff} />;
            })}
      </ScrollMenu>
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
