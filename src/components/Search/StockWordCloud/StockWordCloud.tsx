import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WordCloudItem } from '@ts/Interfaces';
import { STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import LoadingComponent from '@components/Common/LoadingComponent';
import { WordCloudQuery } from '@controllers/query';
import { StockWordCloudContainer, Word, WordContainer } from './StockWordCloud.Style';

const agent = window.navigator.userAgent.toLowerCase();

const StockWordCloudContents = ({
  wordCloutItem: { orientation, pos, size, fontSize, color, word },
  index,
}: {
  wordCloutItem: WordCloudItem;
  index: number;
}) => {
  return (
    <WordContainer
      key={`WordCloud_${index}`}
      posX={pos.x}
      posY={pos.y}
      sizeX={size.w}
      sizeY={size.h}
      fontSize={fontSize / (agent.indexOf('instagram') > -1 ? 1.1 : 1)}
    >
      <Word orientation={orientation ? 1 : 0} colors={color}>
        {word}
      </Word>
    </WordContainer>
  );
};

const StockWordCloud = ({ symbol, country }: { symbol: string; country: STOCK_COUNTRY }) => {
  const { state } = useLocation();
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [wordCloud] = WordCloudQuery(
    symbol,
    country,
    {
      width: containerRef.current?.offsetWidth ?? 0,
      height: containerRef.current?.offsetHeight ?? 0,
    },
    isMobile,
  );

  useEffect(() => {
    if (symbol == state?.symbol) return;
    setCurrentIndex(-1);
  }, [state]);

  useEffect(() => {
    if (!wordCloud || currentIndex > wordCloud.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev + ~~(prev / 10) + 0.5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, wordCloud]);

  return (
    <StockWordCloudContainer ref={containerRef}>
      {wordCloud ? (
        [...wordCloud]
          .reverse()
          .map(
            (item: WordCloudItem, idx: number) =>
              wordCloud.length - idx <= currentIndex && (
                <StockWordCloudContents key={idx} wordCloutItem={item} index={idx} />
              ),
            6,
          )
      ) : (
        <LoadingComponent />
      )}
    </StockWordCloudContainer>
  );
};

export default StockWordCloud;
