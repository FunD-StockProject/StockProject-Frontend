import { useRef, useState } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import { detectPWA } from '@utils/Detector';
import CardList from '@components/CardList/CardList';
import { ContentsItemContainer, ContentsItemContent, ContentsItemTitle } from '@components/Common/ContentsItem.Style';
import PWAInfoPopUp from '@components/PopUp/PWAInfoPopUp';
import InfoSVG from '@assets/info.svg?react';
import ZipyoSVG from '@assets/zipyo.svg?react';
import { HomeContainer, HomeContents, IndexItem, IndicesContainer, StyleTabMenu, StyleTabMenuContainer, StyledSpan } from './Home.Style';

const Home = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const hotStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const risingStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const descentStocksApiRef = useRef({} as React.ContextType<typeof VisibilityContext>);
  const tabMenu = ['국내주식', '해외주식'];
  const stockIndices = [
    ['공포 지수', '코스피', '코스닥'],
    ['공포 지수', 'S&P 500', '나스닥'],
  ];

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
        {false && (
          <IndicesContainer>
            {stockIndices[tabIndex].map((stockIndex) => (
              <IndexItem>
                <div>{stockIndex}</div>
                <div>25</div>
              </IndexItem>
            ))}
          </IndicesContainer>
        )}
        <ContentsItemContainer>
          <ContentsItemTitle color="primary50">
            지금 가장<StyledSpan color="primary50">HOT</StyledSpan> 한
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => {}} />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={hotStocksApiRef} name={'HOT'} index={tabIndex} />
          </ContentsItemContent>
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="red">
            지금 민심 <StyledSpan color="red">떡상</StyledSpan> 중인
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => {}} />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={risingStocksApiRef} name={'RISING'} index={tabIndex} />
          </ContentsItemContent>
        </ContentsItemContainer>

        <ContentsItemContainer>
          <ContentsItemTitle color="blue">
            지금 민심 <StyledSpan color="blue">떡락</StyledSpan> 중인
            <ZipyoSVG />
            <InfoSVG className="btn_info" onClick={() => {}} />
          </ContentsItemTitle>
          <ContentsItemContent>
            <CardList apiRef={descentStocksApiRef} name={'DESCENT'} index={tabIndex} />
          </ContentsItemContent>
        </ContentsItemContainer>
      </HomeContents>
      {!detectPWA() && <PWAInfoPopUp />}
    </HomeContainer>
  );
};

export default Home;
