import { useEffect, useRef, useState } from 'react';
import useLocalStorageState from '@hooks/useLocalStorageState';
import Button from '@components/Common/Button';
import CrossSVG from '@assets/icons/cross.svg?react';
import MoneySVG from '@assets/icons/money.svg?react';
import ShortViewChevronRightSVG from '@assets/icons/shortview/chevronRight.svg?react';
import ShortViewMockImage from '@assets/short_view_mock.png';
import SwipeHandPNG from '@assets/swipe_hand.png';
import {
  ButtonContainer,
  TutorialContainer,
  TutorialContent,
  TutorialContentSlideButtonContainer,
  TutorialItem,
  TutorialItemCircleButtonContainer,
  TutorialItemContent,
  TutorialItemSwipeHand,
  TutorialItemTinderCard,
  TutorialItemTinderCardShadow,
  TutorialStep,
  TutorialTextContainer,
} from './Tutorial.Style';

const TutorialSteps = [
  {
    content: (
      <TutorialItemContent>
        <TutorialItemTinderCard>
          <img src={ShortViewMockImage} alt="short view mock" loading="lazy" />
          <TutorialItemTinderCardShadow />
          <TutorialItemTinderCardShadow />
        </TutorialItemTinderCard>
      </TutorialItemContent>
    ),
    title: '드래그를 통해 무한 탐색',
    description: `아래로 드래그해서 종목을 무한으로 탐색할 수 있어요\n관심 있어 하실만한 종목을 추천해줘요`,
  },
  {
    content: (
      <TutorialItemContent>
        <TutorialItemTinderCard>
          <img src={ShortViewMockImage} alt="short view mock" loading="lazy" />
          <TutorialItemSwipeHand src={SwipeHandPNG} alt="swipe hand" />
        </TutorialItemTinderCard>
        <TutorialItemCircleButtonContainer className="money">
          <MoneySVG />
          <span>모의매수</span>
        </TutorialItemCircleButtonContainer>
      </TutorialItemContent>
    ),
    title: '🙆 관심있는 종목은 오른쪽으로!',
    description: `이 종목, 곧 오를 것 같다면? 오른쪽으로 드래그해서\n모의매수를 진행해보세요!`,
  },
  {
    content: (
      <TutorialItemContent>
        <TutorialItemTinderCard>
          <img src={ShortViewMockImage} alt="short view mock" loading="lazy" />
          <TutorialItemSwipeHand isLeft src={SwipeHandPNG} alt="swipe hand" />
        </TutorialItemTinderCard>
        <TutorialItemCircleButtonContainer className="cross">
          <CrossSVG />
          <span>다시 안보기</span>
        </TutorialItemCircleButtonContainer>
      </TutorialItemContent>
    ),
    title: '🙅‍♂️ 관심없는 종목은 왼쪽으로! ',
    description: `관심 없는 종목은 왼쪽으로 드래그해주세요\n앞으로 추천에서 제외해 드릴께요`,
  },
];

const ShortViewTutorial = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tutorialWatched, setTutorialWatched] = useLocalStorageState<boolean>('tutorial_watched_shortview');

  const handleClickTutorialEnd = () => {
    setTutorialWatched(true);
  };

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkScroll = () => {
      const { scrollLeft, clientWidth } = container;
      setStepIndex(~~((scrollLeft + clientWidth / 2) / clientWidth));
    };

    container.addEventListener('scroll', checkScroll);

    return () => {
      container.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const handleClickSlideButton = (direction: 'left' | 'right') => () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.scrollLeft + (direction === 'left' ? -container.clientWidth : container.clientWidth),
      behavior: 'smooth',
    });
  };

  if (tutorialWatched) return null;

  return (
    <TutorialContainer>
      <div>
        <TutorialContent ref={containerRef}>
          {TutorialSteps.map(({ content, title, description }, i) => (
            <TutorialItem key={`TUTORIAL-ITEM-${i}`}>
              {content}
              <TutorialTextContainer>
                <p className="title">{title}</p>
                <p className="description">{description}</p>
              </TutorialTextContainer>
            </TutorialItem>
          ))}
          <TutorialContentSlideButtonContainer>
            <ShortViewChevronRightSVG className="left" onClick={handleClickSlideButton('left')} />
            <ShortViewChevronRightSVG className="right" onClick={handleClickSlideButton('right')} />
          </TutorialContentSlideButtonContainer>
        </TutorialContent>
        <TutorialStep>
          {TutorialSteps.map((_, i) => (
            <span key={`TUTORIAL-STEP-${i}`} className={stepIndex === i ? 'current' : ''} />
          ))}
        </TutorialStep>
        <ButtonContainer>
          <Button disabled={stepIndex !== TutorialSteps.length - 1} onClick={handleClickTutorialEnd}>
            지금 사용해보기 →
          </Button>
        </ButtonContainer>
      </div>
    </TutorialContainer>
  );
};

export default ShortViewTutorial;
