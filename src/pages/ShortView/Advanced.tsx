import React, { useState, useMemo, useRef, RefObject } from 'react';
import TinderCard from 'react-tinder-card';

interface Character {
  name: string;
  url: string;
}

const db: Character[] = [
  { name: 'Richard Hendricks', url: './img/richard.jpg' },
  { name: 'Erlich Bachman', url: './img/erlich.jpg' },
  { name: 'Monica Hall', url: './img/monica.jpg' },
  { name: 'Jared Dunn', url: './img/jared.jpg' },
  { name: 'Dinesh Chugtai', url: './img/dinesh.jpg' },
];

const Advanced = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(db.length - 1);
  const [lastDirection, setLastDirection] = useState<string | undefined>(undefined);

  const currentIndexRef = useRef<number>(currentIndex);

  const childRefs = useMemo<RefObject<any>[]>(
    () => Array(db.length).fill(0).map(() => React.createRef<any>()),
    []
  );
  console.log(childRefs);
  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current?.restoreCard();
    }
  };

  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current?.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  return (
    <div>
      <h1>React Tinder Card</h1>
      <div className="cardContainer">
        {currentIndex >= 0 && (
          <TinderCard
            ref={childRefs[currentIndex]}
            className="swipe"
            key={db[currentIndex].name}
            onSwipe={(dir) => swiped(dir, db[currentIndex].name, currentIndex)}
            onCardLeftScreen={() => outOfFrame(db[currentIndex].name, currentIndex)}
          >
            <div
              className="card"
              style={{ backgroundImage: `url(${db[currentIndex].url})` }}
            >
              <h3>{db[currentIndex].name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      <div className="buttons">
        <button style={{ backgroundColor: !canSwipe ? '#c3c4d3' : undefined }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack ? '#c3c4d3' : undefined }} onClick={goBack}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe ? '#c3c4d3' : undefined }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      <h2 className="infoText">
        {lastDirection ? `You swiped ${lastDirection}` : 'Swipe a card or press a button to get Restore Card button visible!'}
      </h2>
    </div>
  );
};

export default Advanced;