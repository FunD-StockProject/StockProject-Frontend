import { STOCK_UPDATE_TIME } from '@ts/Constants';
import { StockCountryKey } from '@ts/StockCountry';
import InfoSVG from '@assets/icons/info.svg?react';
import { HomeItemTitle } from './Common.Style';

const ItemTitle = ({
  title,
  openAboutModal,
  country,
}: {
  title: string;
  openAboutModal?: () => void;
  country: StockCountryKey;
}) => {
  const updateTime = STOCK_UPDATE_TIME[country];

  return (
    <HomeItemTitle>
      <p className="title">{title}</p>
      {openAboutModal && <InfoSVG onClick={openAboutModal} />}
      <p className="update-time">어제 {updateTime} 기준</p>
    </HomeItemTitle>
  );
};

export default ItemTitle;
