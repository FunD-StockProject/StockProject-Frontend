import { useNavigate } from 'react-router-dom';
import FavoritesSVG from '@assets/bottomNav/favorites.svg?react';
import HomeSVG from '@assets/bottomNav/home.svg?react';
import MyPageSVG from '@assets/bottomNav/myPage.svg?react';
import ShortViewSVG from '@assets/bottomNav/shortView.svg?react';
import { NavContainer, NavItem } from './BottomNavigation.Style';

const navItems = [
  { label: '홈', icon: <HomeSVG /> },
  { label: '숏뷰', icon: <ShortViewSVG /> },
  { label: '찜', icon: <FavoritesSVG /> },
  { label: '마이', icon: <MyPageSVG /> },
];

const BottomNavigation = () => {
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        navigate('/');
        break;
      case 1:
        alert('숏뷰는 준비중입니다.');
        break;
      case 2:
        alert('관심종목은 준비중입니다.');
        break;
      case 3:
        alert('마이페이지는 준비중입니다.');
        break;
      default:
        break;
    }
  };

  return (
    <NavContainer>
      {navItems.map((item, index) => (
        <NavItem key={index} onClick={() => handleClick(index)}>
          {item.icon}
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default BottomNavigation;
