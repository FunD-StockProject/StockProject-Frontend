import { useEffect, useMemo, useRef, useState } from 'react';
import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import { getFormattedDate } from '@utils/dateFormatter';
import useRouter from '@router/useRouter';
import StockImage from '@components/Common/StockImage';
import { ExperimentDetailTradeInfo } from '@controllers/experiment/api';
import { useExperimentDetailQuery } from '@controllers/experiment/query';
import { theme } from '@styles/themes';
import {
  ColoredDiffLabel,
  ExperimentDetailChartContainer,
  ExperimentDetailChartDateContainer,
  ExperimentDetailChartDot,
  ExperimentDetailChartGraphContainer,
  ExperimentDetailChartInfoContent,
  ExperimentDetailChartInfoItemContainer,
  ExperimentDetailChartInfoLine,
  ExperimentDetailChartLayer,
  ExperimentDetailContent,
  ExperimentDetailIndexItemContainer,
  ExperimentDetailIndexListContainer,
  RecortSheetTitleContainer,
} from './ExperimentDetail.Style';
import { ExperimentDetailModalData } from './useExperimentDetail';

// const DPR = window.devicePixelRatio;

export interface ExperimentDetailIndex {
  key: string;
  title: string;
  value: string;
  subValue?: string;
}

const ExperimentDetail = ({ modalData: { experimentId } }: { modalData: ExperimentDetailModalData }) => {
  const { navToStock } = useRouter();
  const { data: experimentDetail, isLoading } = useExperimentDetailQuery(experimentId);

  const indexList: ExperimentDetailIndex[] = useMemo(() => {
    if (!experimentDetail) return [];

    const { buyAt, status, buyScore, buyPrice, currentScore, currentPrice, roi, country } = experimentDetail;
    const currency = STOCK_COUNTRY_MAP[country].currency;
    return [
      {
        key: 'buyDate',
        title: '매수일/상태',
        value: `${getFormattedDate(buyAt!)}`,
        subValue: `${status == 'PROGRESS' ? '실험중' : '실험완료'}`,
      },
      {
        key: 'buyTime',
        title: '매수시점',
        value: `${buyScore}점`,
        subValue: `${currency}${buyPrice?.toLocaleString()}`,
      },
      {
        key: 'currentTime',
        title: '현재시점',
        value: `${currentScore}점`,
        subValue: `${currency}${currentPrice?.toLocaleString()}`,
      },
      {
        key: 'roi',
        title: '수익률',
        value: `${roi && roi > 0 ? '+' : ''}${(isNaN(roi!) ? 0 : roi!).toFixed(1)}%`,
        subValue: `${roi}`,
      },
    ];
  }, [experimentDetail]);

  const handleClickTitle = () => {
    const { symbolName, country } = experimentDetail!;

    navToStock(symbolName, country);
  };

  if (isLoading) return <div>Loading...</div>;

  if (!experimentDetail) return null;

  return (
    <ExperimentDetailContent>
      <RecortSheetTitleContainer onClick={handleClickTitle}>
        <StockImage stockId={experimentDetail.stockId} />
        <p>{experimentDetail.symbolName}</p>
      </RecortSheetTitleContainer>
      <ExperimentDetailIndexListContainer>
        {indexList.map((item) => (
          <ExperimentDetailIndexItem key={item.key} indexItem={item} />
        ))}
      </ExperimentDetailIndexListContainer>
      <ExperimentDetailChart
        tradeInfos={experimentDetail.tradeInfos}
        buyScore={experimentDetail.buyScore}
        buyPrice={experimentDetail.buyPrice}
      />
    </ExperimentDetailContent>
  );
};

const ExperimentDetailIndexItem = ({ indexItem }: { indexItem: ExperimentDetailIndex }) => {
  const { key, title, value, subValue } = indexItem;
  return (
    <ExperimentDetailIndexItemContainer key={key} className={key}>
      <p className="title">{title}</p>
      <div className={`${key == 'roi' ? 'roi' : ''}`}>
        {key != 'roi' ? (
          <>
            <p className={`value`}>{value}</p>
            <p className={`subValue ${key == 'buyDate' ? 'white' : ''}`}>{subValue}</p>
          </>
        ) : (
          <ColoredDiffLabel delta={Number(subValue)}>{value}</ColoredDiffLabel>
        )}
      </div>
    </ExperimentDetailIndexItemContainer>
  );
};

const ExperimentDetailChart = ({
  tradeInfos,
  buyScore,
  buyPrice,
}: {
  tradeInfos: ExperimentDetailTradeInfo[];
  buyScore: number;
  buyPrice: number;
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement>(null);

  const loadChartStatusRef = useRef({
    time: 0,
    isStart: false,
  });
  const loadChartFrameRef = useRef<number>(0);

  const [enableDots, setEnableDots] = useState<boolean[]>(Array.from({ length: 5 }, () => false));
  const [selectedDot, setSelectedDot] = useState<number>(-1);

  const drawChart = (noAnimation: boolean = false) => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();

    const length = 5;
    const fullTime = 200;
    const delay = fullTime / (length - 1);

    const { time } = loadChartStatusRef.current;
    const xScale = (length - 1) / length;
    const yScale = 0.8;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = theme.colors.sub_blue6;
    ctx.lineWidth = 2;

    const getScaledCoord = (x: number, y: number): [number, number] => {
      return [x * xScale + ((1 - xScale) / 2) * width, y * yScale + ((1 - yScale) / 2) * height];
    };

    tradeInfos.forEach((e, index, arr) => {
      if (time < index * delay) return;
      if (index == length - 1 || index == arr.length - 1) return;

      const indexTime = time - index * delay;

      const startX = index * (width / (length - 1));
      const startY = height - e.score * (height / 100);

      const endX = (index + 1) * (width / (length - 1));
      const endY = height - arr[index + 1].score * (height / 100);
      const slope = (endY - startY) / (endX - startX);
      const x = Math.min(indexTime * (width / fullTime), endX - startX);
      const Y = slope * x;

      ctx.beginPath();
      ctx.moveTo(...getScaledCoord(startX, startY));
      ctx.lineTo(...getScaledCoord(startX + x, startY + Y));
      ctx.closePath();
      ctx.stroke();
    });

    tradeInfos.forEach((_, index) => {
      if (time < index * delay - delay / 2) return;

      setEnableDots((prev) => {
        const newEnableDots = [...prev];
        newEnableDots[index] = true;
        return newEnableDots;
      });
      if (index == tradeInfos.length - 1) {
        if (selectedDot == -1) {
          setTimeout(() => setSelectedDot(index), 100);
        }
      }
    });

    if (loadChartStatusRef.current.time < fullTime + 10 && !noAnimation) {
      loadChartStatusRef.current.time++;
      loadChartFrameRef.current = requestAnimationFrame(() => drawChart());
    } else {
    }
    return;
  };

  const [canvasInfo, setCanvasInfo] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    setCanvasInfo({ width, height });

    if (loadChartStatusRef.current.isStart) return;
    loadChartStatusRef.current.isStart = true;
    loadChartFrameRef.current = requestAnimationFrame(() => drawChart());
  }, [tradeInfos]);

  useEffect(() => {
    const container = chartCanvasRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height } = entry.contentRect;
      setCanvasInfo({ width, height });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    drawChart(true);
  }, [canvasInfo]);

  const selectedTradeInfo = selectedDot != -1 ? tradeInfos[selectedDot] : null;
  const infoItemText = useMemo(() => {
    if (!selectedTradeInfo) return null;

    const { score: currentScore, price: currentPrice } = selectedTradeInfo;
    const scoreDiff = currentScore - buyScore;
    const scoreDiffSign = scoreDiff > 0 ? '+' : '';
    const roi = buyPrice !== 0 ? ((currentPrice - buyPrice) / buyPrice) * 100 : 0;
    const roiDiff = roi;
    const roiDiffSign = roiDiff > 0 ? '+' : '';

    return selectedTradeInfo
      ? [
          {
            name: '인간지표',
            value: `${currentScore}점`,
            diff: `(${scoreDiffSign}${scoreDiff}점)`,
            delta: scoreDiff,
          },
          {
            name: '수익률',
            value: `${roiDiffSign}${roi.toFixed(1)}%`,
            diff: `(${roiDiffSign}${roiDiff.toFixed(1)}%)`,
            delta: roiDiff,
          },
        ]
      : null;
  }, [selectedTradeInfo, buyScore, buyPrice]);
  return (
    <ExperimentDetailChartContainer>
      <ExperimentDetailChartGraphContainer>
        <canvas width={canvasInfo.width} height={canvasInfo.height} ref={chartCanvasRef} />
        <ExperimentDetailChartLayer>
          {Array.from({ length: 5 }).map((_, index) => (
            <ExperimentDetailChartDot
              key={index}
              score={tradeInfos[index]?.score ?? null}
              enabled={enableDots[index]}
              selected={selectedDot == index}
            >
              <span onClick={() => setSelectedDot((prev) => (prev == index ? -1 : index))} />
            </ExperimentDetailChartDot>
          ))}
          {infoItemText && (
            <>
              <ExperimentDetailChartInfoLine index={selectedDot} score={tradeInfos[selectedDot].score}>
                <span />
              </ExperimentDetailChartInfoLine>
              <ExperimentDetailChartInfoContent index={selectedDot} score={tradeInfos[selectedDot].score}>
                <div>
                  {infoItemText.map((e) => (
                    <ExperimentDetailChartInfoItemContainer key={e.name} delta={e.delta}>
                      <p className="name">{e.name}</p>
                      <span className="divider" />
                      <p className="value">{e.value}</p>
                      <p className="diff">{e.diff}</p>
                    </ExperimentDetailChartInfoItemContainer>
                  ))}
                </div>
                <p>*()는 매수시점 대비</p>
              </ExperimentDetailChartInfoContent>
            </>
          )}
        </ExperimentDetailChartLayer>
      </ExperimentDetailChartGraphContainer>
      <ExperimentDetailChartDateContainer>
        {Array.from({ length: 5 }).map((_, index) => (
          <p key={index}>D-{5 - index}</p>
        ))}
      </ExperimentDetailChartDateContainer>
    </ExperimentDetailChartContainer>
  );
};

export default ExperimentDetail;
