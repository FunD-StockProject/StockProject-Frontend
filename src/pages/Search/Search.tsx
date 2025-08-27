import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ResultInfo } from '@ts/Constants';
import { RESULT_TYPE, STOCK_COUNTRY } from '@ts/Types';
import { useIsMobile } from '@hooks/useIsMobile';
import { useQueryComponent } from '@hooks/useQueryComponent';
import SearchHeader from '@layout/SearchHeader/SearchHeader';
import { SmallStockCard } from '@components/CardList/StockCard/StockCard';
import { StockCardContainer } from '@components/CardList/StockCard/StockCard.Style';
import {
  ContentsItemContainer,
  ContentsItemContent,
  ContentsItemTitle,
  ContentsItemTitleSeparator,
  DetailText,
  TitleDetailText,
} from '@components/Common/ContentsItem.Style';
import AntVoicePopUp from '@components/PopUp/AntiVoicePopUp/AntVoicePopUp';
// import ZipyoPopup from '@components/PopUp/ZipyoPopUp/ZipyoPopUp';
import SearchTitle from '@components/Search/SearchTitle/SearchTitle';
import StockChart from '@components/Search/StockChart/StockChart';
import StockWordCloud from '@components/Search/StockWordCloud/StockWordCloud';
import { StockInfo } from '@controllers/api.Type';
import { useRelevantStockFetchQuery, useSymbolNameSearchQuery } from '@controllers/query';
import { useAddBookmarkMutation } from '@controllers/query/favorites';
import { theme } from '@styles/themes';
import AlertSVG from '@assets/icons/alert.svg?react';
import InfoSVG from '@assets/icons/info.svg?react';
import {
  Divider,
  MockTradeButtonWrapper,
  SearchResultContainer,
  SearchResultContents,
  SearchResultInfo,
} from './Search.Style';

// const SearchResultHumanIndicator = ({ stockId, country }: { stockId: number; country: STOCK_COUNTRY }) => {
//   const [data, suspend] = useQueryComponent({ query: useStockIdSearchQuery(stockId, country) });
//   const [isPopupOpen, setPopupOpen] = useState(false);
//   const togglePopup = () => setPopupOpen((prev) => !prev);

//   return (
//     <ContentsItemContainer>
//       <ContentsItemTitle>
//         <ContentsItemTitleSeparator>
//           <div>
//             인간지표 점수
//           </div>
//           <TitleDetailText>
//             어제 08:24 기준
//           </TitleDetailText>
//         </ContentsItemTitleSeparator>
//         <DetailText onClick={togglePopup} >
//           <span>인간지표 점수란 무엇인가요? </span>
//           <InfoSVG className="btn_info" onClick={togglePopup} />
//         </DetailText>
//       </ContentsItemTitle>
//       <ContentsItemContent>
//         {/* {suspend || (data && <ScoreSlotMachine stockScore={data.score} country={country} stockDiff={data.scoreDiff} />)} */}
//       </ContentsItemContent>
//       {isPopupOpen && <ZipyoPopup onClose={togglePopup} />}
//     </ContentsItemContainer>
//   );
// };

const StockRelevant = ({ stockId, country }: { stockId: number; country: STOCK_COUNTRY }) => {
  const [curRelevantStocks, suspend] = useQueryComponent({ query: useRelevantStockFetchQuery(stockId) });

  if (suspend) return null;

  return (
    <StockCardContainer>
      {curRelevantStocks?.map((e: StockInfo) => {
        return <SmallStockCard stock={e} country={country} />;
      })}
    </StockCardContainer>
  );
};

const Search = () => {
  const { state } = useLocation();
  const [heartColor, setHeartColor] = useState(theme.colors.red);
  const [bellColor, setBellColor] = useState(theme.colors.red);
  const isMobile = useIsMobile();
  const { mutate: mutateBookMark } = useAddBookmarkMutation();

  const [stockInfo] = useQueryComponent({
    query: useSymbolNameSearchQuery(state?.symbolName, state?.country),
  });
  const [resultMode, setResultMode] = useState<RESULT_TYPE>('INDICATOR');
  const [isPopupOpen, setPopupOpen] = useState(false);

  const toggleResultMode = () => setResultMode((prev) => ResultInfo[prev].opposite);
  const togglePopup = () => setPopupOpen((prev) => !prev);
  const onHeartClick = () => {
    mutateBookMark(stockInfo?.stockId!);
    setHeartColor(heartColor === theme.colors.red ? theme.colors.sub_gray6 : theme.colors.red);
  };

  const onBellClick = () => {
    setBellColor(heartColor === theme.colors.red ? theme.colors.sub_gray6 : theme.colors.red);
  };

  return (
    stockInfo && (
      <>
        <SearchHeader
          heartColor={heartColor}
          bellColor={bellColor}
          onHeartClick={onHeartClick}
          onBellClick={onBellClick}
        />
        <Divider />
        <SearchResultContainer>
          <SearchResultContents>
            <SearchTitle stockInfo={stockInfo} resultMode={resultMode} onClick={toggleResultMode} />
            <SearchResultInfo>
              <AlertSVG />
              인간지표는 공식 지표가 아니므로 참고 용도로만 활용해 주세요
            </SearchResultInfo>
            <MockTradeButtonWrapper>모의 매수하기</MockTradeButtonWrapper>
            <Divider />
            {/* <SearchResultHumanIndicator stockId={stockInfo.stockId} country={stockInfo.country} /> */}
            <ContentsItemTitle>
              <ContentsItemTitleSeparator>
                <div>주식차트</div>
                <TitleDetailText>어제 08:24 기준</TitleDetailText>
              </ContentsItemTitleSeparator>
            </ContentsItemTitle>
            <StockChart stockId={stockInfo.stockId} symbolName={stockInfo.symbolName} country={stockInfo.country} />
            <ContentsItemContainer>
              <ContentsItemTitle>
                <ContentsItemTitleSeparator>
                  <div>자주 언급되는 단어</div>
                  <TitleDetailText>어제 08:24 기준</TitleDetailText>
                </ContentsItemTitleSeparator>
                <DetailText onClick={togglePopup}>
                  <span>자주 언급되는 단어란 무엇인가요? </span>
                  <InfoSVG className="btn_info" />
                </DetailText>
              </ContentsItemTitle>

              <ContentsItemContent>
                <StockWordCloud symbol={stockInfo.symbol} country={stockInfo.country} />
              </ContentsItemContent>
              {isPopupOpen && <AntVoicePopUp onClose={togglePopup} />}
            </ContentsItemContainer>
            <ContentsItemContainer>
              <ContentsItemTitle>
                <ContentsItemTitleSeparator>
                  <div>이 종목과 점수가 비슷한 종목</div>
                  <TitleDetailText>어제 08:24 기준</TitleDetailText>
                </ContentsItemTitleSeparator>
              </ContentsItemTitle>
              <StockRelevant stockId={stockInfo.stockId} country={stockInfo.country} />
            </ContentsItemContainer>
          </SearchResultContents>
        </SearchResultContainer>
      </>
    )
  );
};

export default Search;
