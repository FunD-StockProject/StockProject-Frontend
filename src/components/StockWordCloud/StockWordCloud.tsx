import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSearchWordCloud } from '@controllers/api';
import { StockWordCloudContainer, Word, WordContainer } from './StockWordCloud.Style';
import { WordCloud } from './StockWordCloud.Type';
import { generateWordCloud, testWorker } from './StockWordCloud.Worker';

const StockWordCloudContents = ({
  wordCloutItem,
  index,
  animationState,
}: {
  wordCloutItem: WordCloud;
  index: number;
  animationState: boolean;
}) => {
  return (
    <WordContainer
      key={index}
      orientation={wordCloutItem.orientation ? 1 : 0}
      posX={wordCloutItem.position.x}
      posY={wordCloutItem.position.y}
      sizeX={wordCloutItem.size.w}
      sizeY={wordCloutItem.size.h}
    >
      <Word
        animationState={animationState}
        orientation={wordCloutItem.orientation ? 1 : 0}
        fontSize={wordCloutItem.fontSize}
        colors={wordCloutItem.color}
        delay={0}
      >
        {wordCloutItem.word}
      </Word>
    </WordContainer>
  );
};

const StockWordCloud = ({
  symbol,
  country,
  // stockName,
  // stockId,
}: {
  symbol: string;
  country: string;
  // stockName: string;
  // stockId: number;
}) => {
  const { state } = useLocation();

  const [wordCloud, setWordCloud] = useState<WordCloud[] | null>(null);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [animationState, setAnimationState] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const getWordCloud = async (symbol: string, country: string) => {
    console.log(symbol);
    const res = await fetchSearchWordCloud(symbol, country);

    if (window.Worker) {
      if (!containerRef.current) return;
      generateWordCloud({
        data: res,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    setDidMount(true);

    testWorker.onmessage = ({ data }: { data: WordCloud[] }) => {
      setWordCloud(Array.from(data, (x) => x));
    };

    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getWordCloud(symbol, country);
  }, [didMount, symbol]);

  useEffect(() => {
    if (!didMount) return;
    setAnimationState(false);
    setCurrentIndex(-1);
    setWordCloud(null);
  }, [didMount]);

  useEffect(() => {
    if (!didMount) return;
    if (symbol == state?.symbol) return;
    setAnimationState(false);
    setCurrentIndex(-1);
    setWordCloud(null);
  }, [state]);

  useEffect(() => {
    if (!didMount) return;
    setAnimationState(true);
    setCurrentIndex(0);
  }, [wordCloud]);

  useEffect(() => {
    if (!didMount) return;
    if (currentIndex == -1) return;
    if (!wordCloud || currentIndex >= wordCloud.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev + ~~(prev / 25) + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [currentIndex, wordCloud]);

  return (
    <StockWordCloudContainer ref={containerRef}>
      {wordCloud &&
        wordCloud.map(
          (e: WordCloud, i: number) =>
            i <= currentIndex && (
              <StockWordCloudContents key={i} animationState={animationState} wordCloutItem={e} index={i} />
            ),
        )}
    </StockWordCloudContainer>
  );
};

export default StockWordCloud;
