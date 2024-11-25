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
