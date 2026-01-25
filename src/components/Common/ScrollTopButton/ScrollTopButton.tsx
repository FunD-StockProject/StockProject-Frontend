import { useEffect, useState } from 'react';
import ArrowUpSVG from '@assets/icons/arrowUp.svg?react';
import { ScrollTopButtonContainer } from './ScrollTopButton.Style';

const ScrollTopButton = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClickScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollTopButtonContainer isHidden={!isScrolled} onClick={handleClickScrollTop}>
      <ArrowUpSVG />
    </ScrollTopButtonContainer>
  );
};

export default ScrollTopButton;
