import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { STOCK_COUNTRY_MAP, StockCountryKey } from '@ts/StockCountry';
import useModal from '@hooks/useModal';
import { HomeItemTtile } from '@components/Home/Title/Title.Style';
import DescentPopUp from '@components/PopUp/DescentPopUp/DescentPopUp';
import HotPopUp from '@components/PopUp/HotPopUp/HotPopUp';
import RisingPopUp from '@components/PopUp/RisingPopUp/RisingPopUp';
import InfoSVG from '@assets/icons/info.svg?react';
import { CardListContainer } from './CardList.Style';
import StockCard from './StockCard/StockCard';

type CardListType = 'HOT' | 'RISING' | 'DESCENT';
const cardListTitle: Record<CardListType, string> = {
  HOT: '가장 HOT 한',
  RISING: '🔥지금 민심 떡상 중인',
  DESCENT: '💧지금 민심 떡락 중인',
};

const CardList = ({ type, country }: { type: CardListType; country: StockCountryKey }) => {
  const { Modal, openModal } = useModal({
    Component: type === 'HOT' ? HotPopUp : type === 'RISING' ? RisingPopUp : DescentPopUp,
  });

  const updateTime = STOCK_UPDATE_TIME[country];
  const title = `${cardListTitle[type]} ${type === 'HOT' ? `${STOCK_COUNTRY_MAP[country].text}지표` : ''}`;

  return (
    <CardListContainer>
      <HomeItemTtile>
        <p className="title">{title}</p>
        <InfoSVG onClick={openModal} />
        <p className="update-time">어제 {updateTime} 기준</p>
        <Modal />
      </HomeItemTtile>
      <StockCard type={type} country={country} />
    </CardListContainer>
  );
};

export default CardList;
