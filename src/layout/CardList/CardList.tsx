import { publicApiType, ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';
import { ArrowButton, NoScrollbar } from './CardList.Style';
import HotCard from '../HotCard/HotCard';
import { useContext } from 'react';
import rightArrowImgLink from '../../assets/rightArrow.svg';
import leftArrowImgLink from '../../assets/leftArrow.svg';
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
              return (
                <Card
                  key={item.stockId}
                  score={item.score}
                  stockName={item.symbolName}
                  scoreChanged={10} // -> scoreChanged={item.scoreChanged}
                />
              );
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
