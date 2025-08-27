import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { STOCK_COUNTRY_TEXT, STOCK_UPDATE_TIME } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
// import CardList from '@components/CardList/CardList';
// import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import IndexScore from '@components/Home/IndexScore/IndexScore';
import { theme } from '@styles/themes';
// import Keywords from '@components/Home/Keywords/Keywords';
// import StockTable from '@components/Home/StockTable/StockTable';
// import DescentPopUp from '@components/PopUp/DescentPopUp/DescentPopUp';
// import HotPopUp from '@components/PopUp/HotPopUp/HotPopUp';
// import RisingPopUp from '@components/PopUp/RisingPopUp/RisingPopUp';
import AlarmSVG from '@assets/icons/alarm.svg?react';
import InfoSVG from '@assets/icons/info.svg?react';
import SearchSVG from '@assets/icons/search.svg?react';
import FullLogoWhiteSVG from '@assets/logo/full_logo_white.svg?react';
// import ZipyoSVG from '@assets/zipyo.svg?react';
import {
  HomeAdContainer,
  HomeAdItem,
  HomeAdItemButton,
  HomeAdItemContent,
  HomeAdItemDescription,
  HomeAdItemIndex,
  HomeAdItemTitle,
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
const updateTime = [STOCK_UPDATE_TIME.KOREA, STOCK_UPDATE_TIME.OVERSEA];

type CardListType = 'HOT' | 'RISING' | 'DESCENT';
const cardListTitle: Record<CardListType, string> = {
  HOT: '가장 HOT 한',
  RISING: '🔥지금 민심 떡상 중인',
  DESCENT: '💧지금 민심 떡락 중인',
};

const CardListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const CardListHeader = styled.div({
  display: 'flex',
  padding: '0px 20px',
  gap: '6px',
  alignItems: 'center',

  ['>p']: {
    margin: '0px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_gray1,
      flexShrink: '0',
    },

    ['&.update-time']: {
      ...theme.font.body14Regular,
      color: theme.colors.sub_gray8,
      marginLeft: 'auto',
    },
  },

  ['>svg']: {
    width: '18px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray6,
  },
});

const CardList = ({ type, country }: { type: CardListType; country: STOCK_COUNTRY }) => {
  return (
    <CardListContainer>
      <CardListHeader>
        <p className="title">
          {cardListTitle[type]} {type === 'HOT' && `${STOCK_COUNTRY_TEXT[country]}지표`}
        </p>
        <InfoSVG />
        <p className="update-time">어제 {STOCK_UPDATE_TIME[country]} 기준</p>
      </CardListHeader>
    </CardListContainer>
  );
};

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
          <HomeTabMenuLabel>
            <input value={e.key} name="radio" type="radio" defaultChecked={i == 0} onChange={handleTabChange} />
            <div className="tab_text">{e.text}</div>
          </HomeTabMenuLabel>
        ))}
      </HomeTabMenuContainer>
      <HomeAdContainer>
        {Array.from({ length: 5 }).map((_, index, arr) => (
          <HomeAdItem key={index}>
            <HomeAdItemContent>
              <div>
                <HomeAdItemTitle>인간지표 앱 출시</HomeAdItemTitle>
                <HomeAdItemDescription>보다 더 편리하게 사용해보세요</HomeAdItemDescription>
              </div>
              <HomeAdItemButton>인간지표 SNS →</HomeAdItemButton>
            </HomeAdItemContent>
            <HomeAdItemIndex>
              <b>{index + 1}</b> / {arr.length}
            </HomeAdItemIndex>
            <span />
            <span />
            <span />
          </HomeAdItem>
        ))}
      </HomeAdContainer>

      <HomeContents>
        <IndexScore country={country} />
        <CardList type="HOT" country={country} />
        <CardList type="RISING" country={country} />
        <CardList type="DESCENT" country={country} />
        {/* <ContentsItemContainer>
          <ContentsItemTitle color="primary50">
            지금 가장<StyledSpan color="primary50">HOT</StyledSpan> 한
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(0)} />
          </ContentsItemTitle>
          <CardList name={'HOT'} country={country} />
          <ContentsItemContent>
            <StyledText>매일 {updateTime[tabIndex]}시 업데이트됩니다.</StyledText>
          </ContentsItemContent>
          {isPopupOpen[0] && <HotPopUp onClose={() => togglePopup(0)} />}
        </ContentsItemContainer>
        <ContentsItemContainer>
          <ContentsItemTitle color="red">
            지금 민심 <StyledSpan color="red">떡상</StyledSpan> 중인
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(1)} />
          </ContentsItemTitle>
          <CardList name={'RISING'} country={country} />
          <ContentsItemContent>
            <StyledText>매일 {updateTime[tabIndex]}시 업데이트됩니다.</StyledText>
          </ContentsItemContent>
          {isPopupOpen[1] && <RisingPopUp onClose={() => togglePopup(1)} />}
        </ContentsItemContainer>
        <ContentsItemContainer>
          <ContentsItemTitle color="blue">
            지금 민심 <StyledSpan color="blue">떡락</StyledSpan> 중인
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(2)} />
          </ContentsItemTitle>
          <CardList name={'DESCENT'} country={country} />
          <ContentsItemContent>
            <StyledText>매일 {updateTime[tabIndex]}시 업데이트됩니다.</StyledText>
          </ContentsItemContent>
          {isPopupOpen[2] && <DescentPopUp onClose={() => togglePopup(2)} />}
        </ContentsItemContainer>
        <StockTable country={country} />
        <Keywords country={country} /> */}
      </HomeContents>
    </HomeContainer>
  );
};

export default Home;
