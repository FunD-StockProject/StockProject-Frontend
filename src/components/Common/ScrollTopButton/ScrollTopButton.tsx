import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { theme } from '@styles/themes';
import ArrowUpSVG from '@assets/icons/arrowUp.svg?react';

const ScrollTopButtonContainer = styled.div(
  ({ isHidden }: { isHidden: boolean }) => ({
    display: isHidden ? 'none' : 'flex',
  }),
  {
    position: 'fixed',
    bottom: '96px',
    right: '0',
    width: '58px',
    height: '58px',
    margin: '20px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(52, 58, 64, 0.5)',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',

    ['>svg']: {
      width: '32px',
      height: 'auto',
      aspectRatio: '1 / 1',
      fill: theme.colors.sub_white,
    },
  },
);

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
