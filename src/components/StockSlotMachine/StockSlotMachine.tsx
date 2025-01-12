import { AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { scoreToIndex } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import { ARRAY_STOCK_SCORE_IMAGE, ARRAY_STOCK_SCORE_TITLE } from '@constants/stockScore';
import { ImgDiv } from '@components/Common/Common';
import {
  ScoreSlotMachineContainer,
  ScoreSlotMachineContent,
  SlotMachineItemContainer,
  SlotMachineItemMotionDiv,
  StockCardItemText,
} from './stockSlotMachine.Style';

const getDuration = (animationTime: number, idx: number, lastIndex: number) => {
  const a = (3 * animationTime) / (lastIndex * lastIndex * lastIndex);
  const b = a * idx * idx;
  return b;
};

const variants: Variants = {
  initial: (isLast: boolean) => ({
    scaleY: 1,
    y: '-100%',
    opacity: 1,
    filter: !isLast ? 'blur(2px)' : 'blur(0px)',
  }),
  animate: (isLast: boolean) => ({
    scaleY: 1,
    y: '0%',
    opacity: 1,
    filter: !isLast ? 'blur(2px)' : 'blur(0px)',
  }),
  exit: (isLast: boolean) => ({
    scaleY: 1,
    y: '100%',
    opacity: 1,
    filter: !isLast ? 'blur(2px)' : 'blur(0px)',
  }),
};

const ScoreSlotMachineItemCard = ({
  slotMachineType,
  idx,
}: {
  slotMachineType: 'TITLE' | 'IMAGE' | 'SCORE';
  idx: number;
}) => {
  return slotMachineType == 'TITLE' ? (
    ARRAY_STOCK_SCORE_TITLE[idx % ARRAY_STOCK_SCORE_TITLE.length]
  ) : slotMachineType == 'IMAGE' ? (
    <ImgDiv src={ARRAY_STOCK_SCORE_IMAGE[idx % ARRAY_STOCK_SCORE_IMAGE.length]} />
  ) : (
    `${idx % 101}점`
  );
};

const ScoreSlotMachineItem = ({
  stockName,
  stockScore,
  slotMachineType,
}: {
  stockName?: string;
  stockScore: number;
  slotMachineType: 'TITLE' | 'IMAGE' | 'SCORE';
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scoreIndex = scoreToIndex(stockScore);
  const lastIndex = slotMachineType == 'TITLE' ? 10 : slotMachineType == 'IMAGE' ? 15 : 20;
  const animationTime = slotMachineType == 'TITLE' ? 0.5 : slotMachineType == 'IMAGE' ? 1 : 1.5;

  useEffect(() => {
    setCurrentIndex(0);
  }, [stockName]);

  useEffect(() => {
    if (currentIndex == lastIndex) return;
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => {
          return prev < lastIndex ? prev + 1 : prev;
        });
      },
      getDuration(animationTime, currentIndex, lastIndex) * 1000,
    );

    return () => clearInterval(interval);
  }, [currentIndex, lastIndex]);

  return (
    <SlotMachineItemContainer>
      <AnimatePresence mode="popLayout">
        {Array.from({ length: lastIndex + 1 }, (_, i) => {
          return (
            i == currentIndex && (
              <SlotMachineItemMotionDiv
                slotMachineType={slotMachineType}
                key={i}
                style={{ position: 'absolute' }}
                custom={currentIndex >= lastIndex * 0.95}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: getDuration(animationTime, currentIndex, lastIndex),
                  ease: currentIndex == lastIndex ? 'easeOut' : 'linear',
                }}
              >
                <ScoreSlotMachineItemCard
                  slotMachineType={slotMachineType}
                  idx={
                    slotMachineType != 'SCORE'
                      ? lastIndex - currentIndex + scoreIndex
                      : lastIndex - currentIndex + stockScore
                  }
                />
              </SlotMachineItemMotionDiv>
            )
          );
        })}
      </AnimatePresence>
    </SlotMachineItemContainer>
  );
};

const ScoreSlotMachine = ({
  stockName,
  active,
  stockScore,
  tabIndex,
  country,
}: {
  stockName?: string;
  active?: boolean;
  stockScore: number;
  tabIndex?: number;
  country: string;
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: stockName, country: country } });
  };

  return (
    <ScoreSlotMachineContainer
      active={active}
      tabIndex={tabIndex}
      onClick={active ? handleClick : () => {}}
    >
      <StockCardItemText>{active ? stockName : ''}</StockCardItemText>
      <ScoreSlotMachineContent>
        <ScoreSlotMachineItem
          stockName={stockName}
          stockScore={stockScore}
          slotMachineType="TITLE"
        />
        <ScoreSlotMachineItem
          stockName={stockName}
          stockScore={stockScore}
          slotMachineType="IMAGE"
        />
        <ScoreSlotMachineItem
          stockName={stockName}
          stockScore={stockScore}
          slotMachineType="SCORE"
        />
      </ScoreSlotMachineContent>
    </ScoreSlotMachineContainer>
  );
};

export default ScoreSlotMachine;
