import { useCallback, useEffect, useRef, useState } from 'react';
import useRouter from '@router/useRouter';
import { theme } from '@styles/themes';
import {
  BannerContainer,
  BannerItemButton,
  BannerItemContainer,
  BannerItemContent,
  BannerItemDecoration,
  BannerItemIndex,
  BannerItemTextGroup,
} from './Banner.Style';

const HomeBanner = () => {
  const { navToAbout, openInstagram, openServiceCenter } = useRouter();

  const banners = [
    {
      title: '인간지표 앱 출시',
      sub: '보다 더 편리하게 사용해보세요',
      button: {
        text: '인간지표 SNS',
        onClick: openInstagram,
      },
      background: theme.colors.sub_blue6,
    },
    {
      title: '인간지표, 더 좋아질 수\n있게 도와주세요',
      sub: '',
      button: {
        text: '불편사항 접수',
        onClick: openServiceCenter,
      },
      background: theme.colors.sub_blue5,
    },
    {
      title: '인간지표는 어떻게\n활용할 수 있나요?',
      sub: '',
      button: {
        text: '서비스 가이드',
        onClick: navToAbout,
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
    <BannerContainer ref={containerRef}>
      {banners.map((e, idx, arr) => (
        <BannerItemContainer key={`BANNER_${idx}`} backgroundColor={e.background}>
          <BannerItemContent>
            <BannerItemTextGroup>
              <p className="title">{e.title}</p>
              <p className="sub">{e.sub}</p>
            </BannerItemTextGroup>
            <BannerItemButton onClick={e.button.onClick}>{e.button.text} →</BannerItemButton>
          </BannerItemContent>
          <BannerItemIndex>
            <b>{idx + 1}</b> / {arr.length}
          </BannerItemIndex>
          <BannerItemDecoration />
          <BannerItemDecoration />
          <BannerItemDecoration />
        </BannerItemContainer>
      ))}
    </BannerContainer>
  );
};
export default HomeBanner;
