import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { detectPWA } from '@utils/Detector';
import CardList from '@components/CardList/CardList';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import IndexScore from '@components/Home/IndexScore/IndexScore';
import Keywords from '@components/Home/Keywords/Keywords';
import StockTable from '@components/Home/StockTable/StockTable';
import DescentPopUp from '@components/PopUp/DescentPopUp/DescentPopUp';
import HotPopUp from '@components/PopUp/HotPopUp/HotPopUp';
import PWAInfoPopUp from '@components/PopUp/PWAinfoPopUp/PWAInfoPopUp';
import RisingPopUp from '@components/PopUp/RisingPopUp/RisingPopUp';
import InfoSVG from '@assets/info.svg?react';
import ZipyoSVG from '@assets/zipyo.svg?react';
import { HomeContainer, HomeContents, StyleTabMenu, StyleTabMenuContainer, StyledSpan, StyledText } from './Home.Style';

const tabMenu = ['국내주식', '해외주식'];
const updateTime = [STOCK_UPDATE_TIME.KOREA, STOCK_UPDATE_TIME.OVERSEA];

const Home = () => {
  const [tabIndex, setTabIndex] = useState<number>(Number(localStorage.getItem('LAST_TAB_INDEX')) || 0);

  const [isPopupOpen, setPopupOpen] = useState([false, false, false]);
  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const country = tabIndex === 0 ? 'KOREA' : 'OVERSEA';

  const togglePopup = (index: number) => {
    setPopupOpen((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };

  const handleTab = (index: number) => {
    if (tabIndex === index) {
      return;
    }

    setTabIndex(index);
    localStorage.setItem('LAST_TAB_INDEX', index.toString());
    const currentScrollPosition = window.scrollY;

    const refs = [hotStocksApiRef, risingStocksApiRef, descentStocksApiRef];
    const refsCheck = refs.some((ref) => !ref.current || Object.keys(ref.current).length === 0);
    if (!refsCheck) refs.forEach((ref) => ref.current.scrollToItem(ref.current.getItemByIndex('0')));

    window.scrollTo(0, currentScrollPosition);
  };

  return (
    <HomeContainer>
      <StyleTabMenuContainer>
        <StyleTabMenu>
          {tabMenu.map((el, index) => (
            <li
              key={index}
              className={index === tabIndex ? 'submenu focused' : 'submenu'}
              onClick={() => handleTab(index)}
            >
              {el}
            </li>
          ))}
        </StyleTabMenu>
      </StyleTabMenuContainer>

      <HomeContents>
        <ContentsItemContent>
          <IndexScore tabIndex={tabIndex} />
        </ContentsItemContent>
        <ContentsItemContainer>
          <ContentsItemTitle color="primary50">
            지금 가장<StyledSpan color="primary50">HOT</StyledSpan> 한
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(0)} />
          </ContentsItemTitle>
          <CardList apiRef={hotStocksApiRef} name={'HOT'} country={country} />
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
          <CardList apiRef={risingStocksApiRef} name={'RISING'} country={country} />
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
          <CardList apiRef={descentStocksApiRef} name={'DESCENT'} country={country} />
          <ContentsItemContent>
            <StyledText>매일 {updateTime[tabIndex]}시 업데이트됩니다.</StyledText>
          </ContentsItemContent>
          {isPopupOpen[2] && <DescentPopUp onClose={() => togglePopup(2)} />}
        </ContentsItemContainer>
        <StockTable country={country} />
        <Keywords country={country} />
      </HomeContents>
      {!detectPWA() && <PWAInfoPopUp />}
    </HomeContainer>
  );
};

export default Home;
