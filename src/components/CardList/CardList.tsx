import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import useAboutCardList, { CardListType } from '@components/Modal/CenterTutorial/AboutCardList/useAboutCardList';
import { useHomeStockFetchQuery } from '@controllers/stocks/query';
import InfoSVG from '@assets/icons/info.svg?react';
import { CardListContainer, CardListTitle } from './CardList.Style';
import StockCard from './StockCard/StockCard';

const cardListTitle: Record<CardListType, string> = {
  HOT: '👑 현재 시장 반응 TOP 3',
  RISING: '🔥 현재 민심 급상승 중',
  DESCENT: '💧 현재 민심 급하락 중',
};

const CardList = ({ type, country }: { type: CardListType; country: StockCountryKey }) => {
  const updateTime = STOCK_UPDATE_TIME[country];
  const { data: stocks } = useHomeStockFetchQuery(type, country);

  const { Modal: AboutCardListModal, openModal: openAboutCardListModal } = useAboutCardList(type);

  return (
    <CardListContainer>
      {AboutCardListModal}
      <CardListTitle>
        <p className="title">{`${cardListTitle[type]}`}</p>
        <InfoSVG onClick={() => openAboutCardListModal({ type })} />
        <p className="update-time">어제 {updateTime} 기준</p>
      </CardListTitle>
      <StockCard type={type} stocks={stocks} size={type === 'HOT' ? 'large' : 'small'} country={country} />
    </CardListContainer>
  );
};

export default CardList;
