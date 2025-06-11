import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import FavoritesSVG from '@assets/bottomNav/favorites.svg?react';
import HomeSVG from '@assets/bottomNav/home.svg?react';
import LabSVG from '@assets/bottomNav/lab.svg?react';
import MyPageSVG from '@assets/bottomNav/myPage.svg?react';
import ShortViewSVG from '@assets/bottomNav/shortView.svg?react';
import { NavContainer, NavItem } from './BottomNavigation.Style';


const BottomNavigation = () => {
  const location = useLocation();
  // const hiddenPaths = [webPath.login(), webPath.register(), webPath.registerDone()];
  // if (hiddenPaths.includes(location.pathname)) return null;
  const navigate = useNavigate();
  const navItems = [
    { label: '홈', icon: <HomeSVG />, path: '/' },
    { label: '관심', icon: <FavoritesSVG />, path: '/favorites' },
    { label: '숏뷰', icon: <ShortViewSVG />, path: webPath.shortView() },
    { label: '실험실', icon: <LabSVG />, path: '/lab' },
    { label: 'My', icon: <MyPageSVG />, path: webPath.mypage() },
  ];
  const currentPath = location.pathname;
  const activeIndex = navItems.findIndex(item => item.path === currentPath);

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <NavContainer>
      {navItems.map((item, index) => (
        <NavItem key={index} isActive={activeIndex === index} onClick={() => handleClick(item.path)}>
          {item.icon}
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default BottomNavigation;
