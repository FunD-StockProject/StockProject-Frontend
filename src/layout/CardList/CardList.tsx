import { publicApiType, ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';
import { ArrowButton, NoScrollbar } from './CardList.Style';
import HotCard from '../HotCard/HotCard';
import { useContext } from 'react';

const CardList = ({ list, backgroundColor, isHot = false }: { list: CardInterface[]; backgroundColor?: string; isHot?: boolean }) => {
  const isMobile = window.innerWidth < 450;
  return (
    <NoScrollbar>
      <ScrollMenu LeftArrow={!isMobile ? LeftArrow : undefined} RightArrow={!isMobile ? RightArrow : undefined}>
        {isHot
          ? list.map((item: CardInterface) => {
              return <HotCard key={item.stockId} score={item.score} stockName={item.symbolName} />;
            })
          : list.map((item: CardInterface) => {
              return <Card key={item.stockId} score={item.score} stockName={item.symbolName} backgroundColor={backgroundColor ? backgroundColor : '#fd4821'} />;
            })}
      </ScrollMenu>
    </NoScrollbar>
  );
};

const LeftArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const disabled = visibility.useLeftArrowVisible();

  return (
    <Arrow disabled={disabled} onClick={() => visibility.scrollPrev()} className="left" testId="left-arrow">
      {'<'}
    </Arrow>
  );
};

const RightArrow = () => {
  const visibility = useContext<publicApiType>(VisibilityContext);
  const disabled = visibility.useRightArrowVisible();

  return (
    <Arrow disabled={disabled} onClick={() => visibility.scrollNext()} className="right" testId="right-arrow">
      {'>'}
    </Arrow>
  );
};

const Arrow = ({
  children,
  disabled,
  onClick,
  className,
  testId,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
  className?: string;
  testId: string;
}) => {
  return (
    <ArrowButton disabled={disabled} onClick={onClick} className={'arrow' + `-${className}`} data-testid={testId}>
      {children}
    </ArrowButton>
  );
};

export default CardList;
