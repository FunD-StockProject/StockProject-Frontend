import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';
import {
  HomeAdContainer,
  HomeAdItem,
  HomeAdItemButton,
  HomeAdItemContent,
  HomeAdItemDescription,
  HomeAdItemIndex,
  HomeAdItemTitle,
} from './Banner.Style';

const Banner = () => {
  const navigate = useNavigate();

  const handleClickSNS = () => {
    window.open('https://www.instagram.com/humanzipyo/');
  };

  const handleClickServiceCenter = () => {
    window.open('https://forms.gle/eus2xRNHGxbSBaAK9');
  };

  const handleClickServiceGuide = () => {
    navigate(webPath.about());
  };

  const banners = [
    {
      title: '인간지표 앱 출시',
      sub: '보다 더 편리하게 사용해보세요',
      button: {
        text: '인간지표 SNS',
        onClick: handleClickSNS,
      },
      background: theme.colors.sub_blue6,
    },
    {
      title: '인간지표, 더 좋아질 수\n있게 도와주세요',
      sub: '',
      button: {
        text: '불편사항 접수',
        onClick: handleClickServiceCenter,
      },
      background: theme.colors.sub_blue5,
    },
    {
      title: '인간지표는 어떻게\n활용할 수 있나요?',
      sub: '',
      button: {
        text: '서비스 가이드',
        onClick: handleClickServiceGuide,
      },
      background: theme.colors.sub_gray9,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAutoScrolling = useRef(false); // 자동 스크롤 중인지 구분
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // 타이머 ref 추가

  // 타이머 시작 함수
  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
  }, [banners.length]);
  // 컴포넌트 마운트 시 타이머 시작
  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

  // 인덱스 변경 시 스크롤 이동
  useEffect(() => {
    if (containerRef.current) {
      isAutoScrolling.current = true;
      const containerWidth = containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: containerWidth * currentIndex,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 500);
    }
  }, [currentIndex]);

  // 사용자 수동 스크롤 시 인덱스 업데이트 및 타이머 리셋
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isAutoScrolling.current) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;
        const newIndex = Math.round(scrollLeft / containerWidth);

        if (newIndex >= 0 && newIndex < banners.length) {
          setCurrentIndex(newIndex);
          startTimer(); // 타이머 리셋!
        }
      }, 100);
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [banners.length, startTimer]); // startTimer 의존성 추가

  return (
    <HomeAdContainer ref={containerRef}>
      {banners.map((e, idx, arr) => (
        <HomeAdItem key={`BANNER_${idx}`} backgroundColor={e.background}>
          <HomeAdItemContent>
            <div>
              <HomeAdItemTitle>{e.title}</HomeAdItemTitle>
              <HomeAdItemDescription>{e.sub}</HomeAdItemDescription>
            </div>
            <HomeAdItemButton onClick={e.button.onClick}>{e.button.text} →</HomeAdItemButton>
          </HomeAdItemContent>
          <HomeAdItemIndex>
            <b>{idx + 1}</b> / {arr.length}
          </HomeAdItemIndex>
          <span />
          <span />
          <span />
        </HomeAdItem>
      ))}
    </HomeAdContainer>
  );
};
export default Banner;
