import { RefObject, useEffect } from 'react';

/**
 * body 스크롤을 막는 훅
 * @param isActive - 스크롤 방지 활성화 여부
 * @param scrollableRef - 스크롤을 허용할 요소의 ref (모달 내부 등)
 */
const usePreventScroll = (isActive: boolean = true, scrollableRef?: RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isActive) return;

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      // scrollableRef가 있고, 이벤트 타겟이 해당 요소 내부라면 스크롤 허용
      if (scrollableRef?.current?.contains(e.target as Node)) {
        return;
      }
      e.preventDefault();
    };

    const preventKeyScroll = (e: KeyboardEvent) => {
      // 스크롤 관련 키: 방향키, 스페이스, Page Up/Down, Home, End
      const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

      if (scrollableRef?.current?.contains(e.target as Node)) {
        return;
      }

      if (scrollKeys.includes(e.keyCode)) {
        e.preventDefault();
      }
    };

    // passive: false 옵션으로 preventDefault() 동작 보장
    const options: AddEventListenerOptions = { passive: false };

    window.addEventListener('wheel', preventScroll, options);
    window.addEventListener('touchmove', preventScroll, options);
    window.addEventListener('keydown', preventKeyScroll, false);

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, [isActive, scrollableRef]);
};

export default usePreventScroll;
