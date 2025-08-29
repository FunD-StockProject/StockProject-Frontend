import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WordCloudItem } from '@ts/Interfaces';
import { StockCountryKey } from '@ts/StockCountry';
import { useIsMobile } from '@hooks/useIsMobile';
import LoadingComponent from '@components/Common/LoadingComponent';
import { useWordCloudQuery } from '@controllers/query';
import { StockWordCloudContainer, Word, WordCloudTestText, WordContainer } from './StockWordCloud.Style';

const StockWordCloudContents = ({
  wordCloutItem: { orientation, pos, size, fontSize, color, word },
  index,
  adjustFontSize,
}: {
  wordCloutItem: WordCloudItem;
  index: number;
  adjustFontSize: number;
}) => {
  return (
    <WordContainer
      key={`WordCloud_${index}`}
      posX={pos.x}
      posY={pos.y}
      sizeX={size.w}
      sizeY={size.h}
      fontSize={fontSize / adjustFontSize}
    >
      <Word orientation={orientation ? 1 : 0} colors={color}>
        {word}
      </Word>
    </WordContainer>
  );
};

const StockWordCloud = ({ symbol, country }: { symbol: string; country: StockCountryKey }) => {
  const { state } = useLocation();
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [wordCloud] = useWordCloudQuery(
    symbol,
    country,
    {
      width: containerRef.current?.offsetWidth ?? 0,
      height: containerRef.current?.offsetHeight ?? 0,
    },
    isMobile,
  );

  const testTextRef = useRef<HTMLSpanElement>(null);

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
      <WordCloudTestText ref={testTextRef}>감자탕</WordCloudTestText>
      {wordCloud ? (
        [...wordCloud]
          .reverse()
          .map(
            (item: WordCloudItem, idx: number) =>
              wordCloud.length - idx <= currentIndex && (
                <StockWordCloudContents
                  key={idx}
                  wordCloutItem={item}
                  index={idx}
                  adjustFontSize={(testTextRef.current?.offsetHeight ?? 0) / 100}
                />
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
