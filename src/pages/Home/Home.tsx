import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { STOCK_COUNTRY } from '@ts/Types';
import CardList from '@components/CardList/CardList';
import Banner from '@components/Home/Banner/Banner';
import IndexScore from '@components/Home/IndexScore/IndexScore';
import Keywords from '@components/Home/Keywords/Keywords';
import StockTable from '@components/Home/StockTable/StockTable';
import AlarmSVG from '@assets/icons/alarm.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import FullLogoWhiteSVG from '@assets/logo/full_logo_white.svg?react';
import {
  HomeContainer,
  HomeContents,
  HomeHeaderButtonContainer,
  HomeHeaderContainer,
  HomeTabMenuContainer,
  HomeTabMenuLabel,
  StyledSpan,
  StyledText,
} from './Home.Style';

const tabMenu = [
  { key: 'KOREA', text: '국내주식' },
  { key: 'OVERSEA', text: '해외주식' },
];

const Home = () => {
  const [country, setCountry] = useState<STOCK_COUNTRY>('KOREA');

  const [isPopupOpen, setPopupOpen] = useState([false, false, false]);
  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);

  const togglePopup = (index: number) => {
    setPopupOpen((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };

  // const handleTab = (index: number) => {
  //   if (tabIndex === index) {
  //     return;
  //   }

  //   setTabIndex(index);
  //   localStorage.setItem('LAST_TAB_INDEX', index.toString());
  //   const currentScrollPosition = window.scrollY;

  //   const refs = [hotStocksApiRef, risingStocksApiRef, descentStocksApiRef];
  //   const refsCheck = refs.some((ref) => !ref.current || Object.keys(ref.current).length === 0);
  //   if (!refsCheck) refs.forEach((ref) => ref.current.scrollToItem(ref.current.getItemByIndex('0')));

  //   window.scrollTo(0, currentScrollPosition);
  // };

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value as STOCK_COUNTRY);
  };

  return (
    <HomeContainer>
      <HomeHeaderContainer>
        <FullLogoWhiteSVG />
        <HomeHeaderButtonContainer>
          <AlarmSVG />
          <SearchSVG />
        </HomeHeaderButtonContainer>
      </HomeHeaderContainer>
      <HomeTabMenuContainer>
        {tabMenu.map((e, i) => (
          <HomeTabMenuLabel key={`TAB_MENU_${e.key}`}>
            <input value={e.key} name="radio" type="radio" defaultChecked={i == 0} onChange={handleTabChange} />
            <div className="tab_text">{e.text}</div>
          </HomeTabMenuLabel>
        ))}
      </HomeTabMenuContainer>
      <Banner />
      <HomeContents>
        <IndexScore country={country} />
        <CardList type="HOT" country={country} />
        <CardList type="RISING" country={country} />
        <CardList type="DESCENT" country={country} />
        <StockTable country={country} />
        <Keywords country={country} />
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;
