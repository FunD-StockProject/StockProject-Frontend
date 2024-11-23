import { AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TextDisplay } from '../Text/Text';
import { ImgDiv } from '../Common/Common';
import { scoreToIndex } from '../../utils/ScoreConvert';
import { ARRAY_STOCK_SCORE_IMAGE, ARRAY_STOCK_SCORE_TITLE } from '../../constants/stockScore';
import { SlotMachineItemContainer, SlotMachineItemMotionDiv } from './stockSlotMachine.Style';

const ScoreSlotMachine = ({
  stockName,
  stockScore,
  slotMachineType,
}: {
  stockName?: string;
  stockScore: number;
  slotMachineType: 'stockScoreTitle' | 'stockScore' | 'stockScoreImage';
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scoreIndex = scoreToIndex(stockScore);
  const arrayRepeat = slotMachineType == 'stockScoreTitle' ? 3 : slotMachineType == 'stockScore' ? 1 : 4;
  const elementArr = Array(arrayRepeat)
    .fill(
      slotMachineType == 'stockScoreTitle'
        ? Array.from(
            ARRAY_STOCK_SCORE_TITLE,
            (_, i) => ARRAY_STOCK_SCORE_TITLE[(i + scoreIndex + 1) % ARRAY_STOCK_SCORE_TITLE.length],
          )
        : slotMachineType == 'stockScore'
          ? Array.from({ length: 25 }, (_, i) => stockScore - (24 - i))
          : Array.from(
              ARRAY_STOCK_SCORE_IMAGE,
              (_, i) => ARRAY_STOCK_SCORE_IMAGE[(i + scoreIndex + 1) % ARRAY_STOCK_SCORE_IMAGE.length],
            ),
    )
    .flat();
  const lastIndex = elementArr.length - 1;

  const variants: Variants = {
    initial: { scaleY: 1, y: '-50%', opacity: 0 },
    animate: (isLast: boolean) => ({
      scaleY: 1,
      y: '0%',
      opacity: 1,
      filter: !isLast ? 'blur(1.5px)' : 'blur(0px)',
    }),
    exit: { scaleY: 1, y: '50%', opacity: 0 },
  };

  const getDuration = (base: number, index: number) => {
    return base * (index + 1) * 0.5;
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [stockName]);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentIndex((prev) => {
          return prev < lastIndex ? prev + 1 : prev;
        });
      },
      getDuration(10, currentIndex),
    );

    return () => clearInterval(interval);
  }, [currentIndex, lastIndex]);

  return (
    <SlotMachineItemContainer>
      <AnimatePresence mode="popLayout">
        {elementArr.map((e, i) => {
          const isLast = i === lastIndex;

          return (
            i === currentIndex && (
              <SlotMachineItemMotionDiv
                key={e}
                custom={isLast}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: getDuration(isLast ? 0.03 : 0.01, i),
                  ease: isLast ? 'easeInOut' : 'linear',
                }}
              >
                {slotMachineType == 'stockScoreTitle' ? (
                  <TextDisplay color="primary0">{e}</TextDisplay>
                ) : slotMachineType == 'stockScore' ? (
                  <TextDisplay color="primary0">{e}</TextDisplay>
                ) : (
                  <ImgDiv src={e} height="100%" width="100%" />
                )}
              </SlotMachineItemMotionDiv>
            )
          );
        })}
      </AnimatePresence>
    </SlotMachineItemContainer>
  );
};

export default ScoreSlotMachine;
