import { useState } from 'react';
import { SearchCategoryKey } from '@ts/SearchCategory';
import { STOCK_COUNTRIES, StockCountryKey } from '@ts/StockCountry';
import CardList from '@components/CardList/CardList';
import useSearchBarModal from '@components/Modal/SearchBar/useSearchBarModal';
import HomeBanner from '@components/Page/Home/Banner/Banner';
import HomeFooter from '@components/Page/Home/Footer/Footer';
import HomeHeader from '@components/Page/Home/Header/Header';
import HomeInfo from '@components/Page/Home/Info/Info';
import HomeKeywords from '@components/Page/Home/Keywords/Keywords';
import HomeRanking from '@components/Page/Home/Ranking/Ranking';
import { HomeContainer, HomeContents, HomeTabMenuContainer, HomeTabMenuLabel } from './Home.Style';

const HomePage = () => {
  const [country, setCountry] = useState<StockCountryKey>('KOREA');

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value as StockCountryKey);
  };

  const handleSearchBarOpen =
    ({ type = 'STOCK', value = '' }: { type?: SearchCategoryKey; value?: string } = {}) =>
    () => {
      openSearchBarModal({ type, value });
    };

  const { Modal: SearchBarModal, openModal: openSearchBarModal } = useSearchBarModal();

  return (
    <HomeContainer>
      {SearchBarModal}
      <HomeHeader openSearchBarModal={handleSearchBarOpen} />
      <HomeTabMenuContainer>
        {STOCK_COUNTRIES.map(({ key, text }, i) => (
          <HomeTabMenuLabel key={`TAB_MENU_${key}`}>
            <input value={key} name="radio" type="radio" defaultChecked={i == 0} onChange={handleTabChange} />
            <p>{text}주식</p>
          </HomeTabMenuLabel>
        ))}
        <span className="underline" />
      </HomeTabMenuContainer>
      <HomeBanner />
      <HomeContents>
        <HomeInfo country={country} />
        <CardList type="HOT" country={country} />
        <CardList type="RISING" country={country} />
        <CardList type="DESCENT" country={country} />
        <HomeRanking country={country} />
        <HomeKeywords country={country} openSearchBarModal={handleSearchBarOpen} />
      </HomeContents>
      <HomeFooter />
    </HomeContainer>
  );
};

export default HomePage;
