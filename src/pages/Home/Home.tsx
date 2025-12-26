import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STOCK_COUNTRIES, StockCountryKey } from '@ts/StockCountry';
import useAuthInfo from '@hooks/useAuthInfo';
import { webPath } from '@router/index';
import CardList from '@components/CardList/CardList';
import Banner from '@components/Home/Banner/Banner';
import HomeInfo from '@components/Home/IndexScore/HomeInfo';
import Keywords from '@components/Home/Keywords/Keywords';
import StockTable from '@components/Home/StockTable/StockTable';
import SearchBar from '@components/SearchBar/SearchBar';
import { useUnreadCountQuery } from '@controllers/notification/query';
import AlarmSVG from '@assets/icons/alarm.svg?react';
import QuestionMarkCircleSVG from '@assets/icons/question_mark_circle.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import FullLogoWhiteSVG from '@assets/logo/full_logo_white.svg?react';
import {
  HomeContainer,
  HomeContents,
  HomeHeaderButton,
  HomeHeaderContainer,
  HomeTabMenuContainer,
  HomeTabMenuLabel,
} from './Home.Style';

const HomeHeader = () => {
  const { data: notificationCount } = useUnreadCountQuery();
  const navigate = useNavigate();
  const { isLogin } = useAuthInfo();

  const handleQuestionMarkClick = () => {
    navigate(webPath.about());
  };

  const handleNotificationClick = () => {
    navigate(webPath.notification());
  };

  const handleSearchModalOpen = () => {
    navigate('.', {
      state: {
        search: {
          type: 'STOCK',
          value: '',
        },
      },
    });
  };

  return (
    <HomeHeaderContainer>
      <FullLogoWhiteSVG />
      <HomeHeaderButton onClick={handleQuestionMarkClick}>
        <QuestionMarkCircleSVG />
      </HomeHeaderButton>
      <HomeHeaderButton
        className={!isLogin || notificationCount?.unreadCount ? 'enable' : ''}
        onClick={handleNotificationClick}
      >
        <AlarmSVG />
      </HomeHeaderButton>
      <HomeHeaderButton onClick={handleSearchModalOpen}>
        <SearchSVG />
      </HomeHeaderButton>
    </HomeHeaderContainer>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [country, setCountry] = useState<StockCountryKey>('KOREA');

  const isSearchModalOpen = location.state && 'search' in location.state;

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value as StockCountryKey);
  };

  const handleKeywordClick = (keyword: string) => () => {
    navigate('.', {
      state: {
        search: { type: 'KEYWORD', value: keyword },
      },
    });
  };

  return (
    <HomeContainer>
      {isSearchModalOpen && <SearchBar initial={location.state.search} />}
      <HomeHeader />
      <HomeTabMenuContainer>
        {STOCK_COUNTRIES.map(({ key, text }, i) => (
          <HomeTabMenuLabel key={`TAB_MENU_${key}`}>
            <input value={key} name="radio" type="radio" defaultChecked={i == 0} onChange={handleTabChange} />
            <div className="tab_text">{text}주식</div>
          </HomeTabMenuLabel>
        ))}
      </HomeTabMenuContainer>
      <Banner />
      <HomeContents>
        <HomeInfo country={country} />
        <CardList type="HOT" country={country} />
        <CardList type="RISING" country={country} />
        <CardList type="DESCENT" country={country} />
        <StockTable country={country} />
        <Keywords country={country} onClick={handleKeywordClick} />
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;
