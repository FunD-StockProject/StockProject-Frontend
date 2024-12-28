import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { detectPWA } from '@utils/Detector';
import CardList from '@components/CardList/CardList';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import IndexScore from '@components/IndexScore/IndexScore';
import Keywords from '@components/Keywords/Keywords';
import DescentPopUp from '@components/PopUp/DescentPopUp/DescentPopUp';
import HotPopUp from '@components/PopUp/HotPopUp/HotPopUp';
import PWAInfoPopUp from '@components/PopUp/PWAinfoPopUp/PWAInfoPopUp';
import RisingPopUp from '@components/PopUp/RisingPopUp/RisingPopUp';
import StockTable from '@components/StockTable/StockTable';
import InfoSVG from '@assets/info.svg?react';
import ZipyoSVG from '@assets/zipyo.svg?react';
import { HomeContainer, HomeContents, StyleTabMenu, StyleTabMenuContainer, StyledSpan, StyledText } from './Home.Style';

const Home = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);

  const [isPopupOpen, setPopupOpen] = useState([false, false, false]);

  const togglePopup = (index: number) => {
    setPopupOpen((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };
  const tabMenu = ['국내주식', '해외주식'];

  const handleTab = (index: number) => {
    if (tabIndex === index) {
      return;
    }

    setTabIndex(index);
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
            <li key={index} className={index === tabIndex ? 'submenu focused' : 'submenu'} onClick={() => handleTab(index)}>
              {el}
            </li>
          ))}
        </StyleTabMenu>
      </StyleTabMenuContainer>

      <HomeContents>
        <IndexScore tabIndex={tabIndex} />
        <ContentsItemContainer>
          <ContentsItemTitle color="primary50">
            지금 가장<StyledSpan color="primary50">HOT</StyledSpan> 한
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(0)} />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={hotStocksApiRef} name={'HOT'} index={tabIndex} />
          </ContentsItemContent>
          <StyledText>전일 08:24 기준</StyledText>
          {isPopupOpen[0] && <HotPopUp onClose={() => togglePopup(0)} />}
        </ContentsItemContainer>
        <ContentsItemContainer>
          <ContentsItemTitle color="red">
            지금 민심 <StyledSpan color="red">떡상</StyledSpan> 중인
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(1)} />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={risingStocksApiRef} name={'RISING'} index={tabIndex} />
          </ContentsItemContent>
          <StyledText>전일 08:24 기준</StyledText>
          {isPopupOpen[1] && <RisingPopUp onClose={() => togglePopup(1)} />}
        </ContentsItemContainer>
        <ContentsItemContainer>
          <ContentsItemTitle color="blue">
            지금 민심 <StyledSpan color="blue">떡락</StyledSpan> 중인
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => togglePopup(2)} />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={descentStocksApiRef} name={'DESCENT'} index={tabIndex} />
          </ContentsItemContent>
          <StyledText>전일 08:24 기준</StyledText>
          {isPopupOpen[2] && <DescentPopUp onClose={() => togglePopup(2)} />}
        </ContentsItemContainer>
        <StockTable country={tabIndex === 0 ? 'KOREA' : 'OVERSEA'} />
        <Keywords country={tabIndex === 0 ? 'KOREA' : 'OVERSEA'} />
      </HomeContents>
      {!detectPWA() && <PWAInfoPopUp />}
    </HomeContainer>
  );
};

export default Home;
