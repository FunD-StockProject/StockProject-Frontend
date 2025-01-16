import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@hooks/useIsMobile';
import LeftArrowSVG from '@assets/icons/leftArrow.svg?react';
import RightArrowSVG from '@assets/icons/rightArrow.svg?react';
import {
  SlideArrowContainer,
  SlideArrowContents,
  SlideContainer,
  SlideItem,
  SlideItemContainer,
  SlideItemContents,
} from './SlideView.Style';

const useStateRef = <T,>(initializer: T): [T, (value: T) => void, React.MutableRefObject<T>] => {
  const [state, setState] = useState<T>(initializer);
  const ref = useRef<T>(state);

  const setValue = (value: T) => {
    setState((ref.current = value));
  };

  return [state, setValue, ref];
};

const SlideView = ({ keyName, list, count }: { keyName: string; list: JSX.Element[]; count: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemConatinerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [_, setWidth, widthRef] = useStateRef<number>(0);
  const isMobile = useIsMobile();

  const scrollToSelected = (selected: number) => {
    selected = selected < 0 ? 0 : selected > list.length - count ? list.length - count : selected;
    setSelected(selected);
    containerRef.current?.scrollTo({
      left: selected * widthRef.current,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (itemConatinerRef.current) {
      const items = itemConatinerRef.current.children;
      let height = 0;
      let width = 0;
      Array.from(items).forEach((item) => {
        height = Math.max(height, item.clientHeight);
        width = Math.max(width, item.clientWidth);
      });
      setHeight(height);
      setWidth(width);
    }

    const container = containerRef.current;
    if (!container) return;
  }, []);

  return (
    <SlideContainer>
      <SlideItemContainer ref={containerRef}>
        <SlideItemContents ref={itemConatinerRef} height={height}>
          {list.map((e, i) => {
            return (
              <SlideItem key={`${keyName}_${i}`} idx={i} count={count}>
                {e}
              </SlideItem>
            );
          })}
        </SlideItemContents>
      </SlideItemContainer>
      <SlideArrowContainer visible={!isMobile && list.length > count}>
        <SlideArrowContents idx={selected} length={list.length - count}>
          <LeftArrowSVG onClick={() => scrollToSelected(selected - 1)} />
          {`${selected + 1}/${list.length - (count - 1)}`}
          <RightArrowSVG onClick={() => scrollToSelected(selected + 1)} />
        </SlideArrowContents>
      </SlideArrowContainer>
    </SlideContainer>
  );
};

export default SlideView;
