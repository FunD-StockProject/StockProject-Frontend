import { useCallback, useEffect, useRef, useState } from 'react';
import useRouter from '@router/useRouter';
import FeedbackBanner from '@assets/appDownload/banners/FeedbackBanner.png';
import InstallAppBanner from '@assets/appDownload/banners/installAppBanner.png';
import ServiceGuideBanner from '@assets/appDownload/banners/serviceGuideBanner.png';
import SnsBanner from '@assets/appDownload/banners/snsBanner.png';
import { BannerContainer, BannerItemContainer, BannerItemImage, BannerItemIndex } from './Banner.Style';

const HomeBanner = () => {
  const { navToAbout, openInstagram, openServiceCenter } = useRouter();

  const banners = [
    {
      image: InstallAppBanner,
      alt: '앱 다운로드 배너',
      onClick: openInstagram,
      indexTone: 'light',
    },
    {
      image: SnsBanner,
      alt: 'SNS 배너',
      onClick: openInstagram,
      indexTone: 'light',
    },
    {
      image: FeedbackBanner,
      alt: '불편사항 접수 배너',
      onClick: openServiceCenter,
      indexTone: 'dark',
    },
    {
      image: ServiceGuideBanner,
      alt: '서비스 가이드 배너',
      onClick: navToAbout,
      indexTone: 'light',
    },
  ] as const;

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isAutoScrolling = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
  }, [banners.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startTimer]);

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
          startTimer();
        }
      }, 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [banners.length, startTimer]);

  return (
    <BannerContainer ref={containerRef}>
      {banners.map((banner, idx, arr) => (
        <BannerItemContainer key={`BANNER_${idx}`} onClick={banner.onClick} aria-label={banner.alt}>
          <BannerItemImage src={banner.image} alt={banner.alt} loading="lazy" />
          <BannerItemIndex className={banner.indexTone === 'dark' ? 'dark' : ''}>
            <b>{idx + 1}</b> / {arr.length}
          </BannerItemIndex>
        </BannerItemContainer>
      ))}
    </BannerContainer>
  );
};

export default HomeBanner;
