import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingComponent from '@components/LoadingComponent';
import { fetchSearchWordCloud } from '@controllers/api';
import { StockWordCloudContainer, Word, WordContainer } from './StockWordCloud.Style';
import { WordCloud } from './StockWordCloud.Type';
import { generateWordCloud, testWorker } from './StockWordCloud.Worker';

const agent = window.navigator.userAgent.toLowerCase();
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
        fontSize={wordCloutItem.fontSize / (agent.indexOf('instagram') > -1 ? 1.1 : 1)}
        colors={wordCloutItem.color}
        delay={0}
      >
        {wordCloutItem.word}
      </Word>
    </WordContainer>
  );
};

const ADJUST_Y = {
  chrome: 0.055,
  safari: -0.095,
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

  const [wordCloud, setWordCloud] = useState<any>(null);
  const [didMount, setDidMount] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [animationState, setAnimationState] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const getWordCloud = async (symbol: string, country: string) => {
    const res = await fetchSearchWordCloud(symbol, country);

    if (window.Worker) {
      if (!containerRef.current) return;

      //chrome and safari only
      const adjust =
        agent.indexOf('chrome') > -1
          ? ADJUST_Y.chrome
          : agent.indexOf('instagram') > -1
            ? ADJUST_Y.chrome
            : ADJUST_Y.safari;
      generateWordCloud({
        data: res,
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        adjust: adjust,
      });
    }
  };

  useEffect(() => {
    setDidMount(true);

    testWorker.onmessage = ({ data }: { data: WordCloud[] }) => {
      console.log(data);
      setWordCloud(data);
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

  // const [textSize, setTextSize] = useState<any>({ w: 0, h: 0 });
  // const textRef = useRef<HTMLDivElement>(null);
  // const fontSize = 128;

  useEffect(() => {
    if (!didMount) return;
    setAnimationState(true);
    setCurrentIndex(0);
    console.log(wordCloud);

    // const canvas = canvasRef.current;
    // if (!canvas) return;
    // if (!containerRef.current) return;
    // canvas.width = containerRef.current.offsetWidth;
    // canvas.height = containerRef.current.offsetHeight;
    // const ctx = canvas.getContext('2d');
    // if (!ctx) return;
    // ctx.fillStyle = '#FF0000AA';
    // ctx.strokeStyle = 'cyan';
    // if (wordCloud?.grid)
    //   wordCloud.grid.map((e: any, i: number) => {
    //     const x = i % canvas.width;
    //     const y = ~~(i / canvas.width);
    //     if (e) ctx.fillRect(x, y, 1, 1);
    //   });
    // if (wordCloud?.layout) {
    //   wordCloud.layout.map(({ position: { x, y }, size: { w, h } }: any) => {
    //     ctx.strokeRect(x, y, w, h);
    //   });
    // }
    // ctx.textBaseline = 'top';
    // ctx.font = `900 ${fontSize}px "Pretendard"`;
    // // ctx.fillRect(0, 0, 100, 100);
    // // ctx.textBaseline = 'bottom';
    // ctx.rotate((90 * Math.PI) / 180);
    // // -0.1, 0.055
    // ctx.fillText('감자탕', 100, -100 - (1 - -0.095) * fontSize);
    // ctx.rotate((-90 * Math.PI) / 180);
    // ctx.strokeRect(100, 100, fontSize, fontSize);
    // ctx.fillText('감자탕', 100, 100 - 0.095 * fontSize);
    // console.log(ctx.measureText('감자탕').width + '123');
    // const ttt = textRef.current;
    // if (!ttt) return;
    // setTextSize({ w: ttt.offsetWidth, h: ttt.offsetHeight });
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
      {/* <canvas style={{ position: 'absolute', width: '100%', height: '100%' }} ref={canvasRef}></canvas> */}

      {wordCloud?.layout ? (
        wordCloud.layout.map(
          (e: WordCloud, i: number) =>
            i <= currentIndex && (
              <StockWordCloudContents key={i} animationState={animationState} wordCloutItem={e} index={i} />
            ),
        )
      ) : (
        <LoadingComponent />
      )}

      {/* <div
        style={{
          position: 'absolute',
          left: `${0}px`,
          top: `${100}px`,
          width: '128px',
          height: '332px',
        }}
      >
        <div
          style={{
            lineHeight: 1,
            fontSize: `${fontSize}px`,
            fontWeight: '900',
            wordBreak: 'keep-all',
            // rotate: '90deg',
            // WebkitTextSizeAdjust: 'none',
            // textSizeAdjust: 'none',
            // MozTextSizeAdjust: 'none',
          }}
          ref={textRef}
        >
          감자탕
        </div>
      </div> */}
    </StockWordCloudContainer>
  );
};

export default StockWordCloud;
