import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
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
  HOT: '👑 현재 시장 반응 TOP 3',
  RISING: '🔥 현재 민심 급상승 중',
  DESCENT: '💧 현재 민심 급하락 중',
};

const CardList = ({ type, country }: { type: CardListType; country: StockCountryKey }) => {
  const { Modal, openModal } = useModal({
    Component: type === 'HOT' ? HotPopUp : type === 'RISING' ? RisingPopUp : DescentPopUp,
  });

  const updateTime = STOCK_UPDATE_TIME[country];

  return (
    <CardListContainer>
      <HomeItemTtile>
        <p className="title">{`${cardListTitle[type]}`}</p>
        <InfoSVG onClick={openModal} />
        <p className="update-time">어제 {updateTime} 기준</p>
        <Modal />
      </HomeItemTtile>
      <StockCard type={type} country={country} />
    </CardListContainer>
  );
};

export default CardList;
