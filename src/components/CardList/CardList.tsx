import { STOCK_COUNTRY_TEXT, STOCK_UPDATE_TIME } from '@ts/Constants';
import { STOCK_COUNTRY } from '@ts/Types';
import useModal from '@hooks/useModal';
import DescentPopUp from '@components/PopUp/DescentPopUp/DescentPopUp';
import HotPopUp from '@components/PopUp/HotPopUp/HotPopUp';
import RisingPopUp from '@components/PopUp/RisingPopUp/RisingPopUp';
import InfoSVG from '@assets/icons/info.svg?react';
import { CardListContainer, CardListHeader } from './CardList.Style';
import StockCard from './StockCard/StockCard';

type CardListType = 'HOT' | 'RISING' | 'DESCENT';
const cardListTitle: Record<CardListType, string> = {
  HOT: '가장 HOT 한',
  RISING: '🔥지금 민심 떡상 중인',
  DESCENT: '💧지금 민심 떡락 중인',
};

const CardList = ({ type, country }: { type: CardListType; country: STOCK_COUNTRY }) => {
  const { Modal, openModal } = useModal({
    Component: type === 'HOT' ? HotPopUp : type === 'RISING' ? RisingPopUp : DescentPopUp,
  });

  return (
    <CardListContainer>
      <CardListHeader>
        <p className="title">
          {cardListTitle[type]} {type === 'HOT' && `${STOCK_COUNTRY_TEXT[country]}지표`}
        </p>
        <InfoSVG onClick={openModal} />
        <p className="update-time">어제 {STOCK_UPDATE_TIME[country]} 기준</p>
        <Modal />
      </CardListHeader>
      <StockCard type={type} country={country} />
    </CardListContainer>
  );
};

export default CardList;
