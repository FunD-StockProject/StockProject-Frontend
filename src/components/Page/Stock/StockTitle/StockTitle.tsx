import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MARKET_CODES } from '@ts/Constants';
import { STOCK_COUNTRY_MAP } from '@ts/StockCountry';
import { getDiffText, getPriceText } from '@utils/Number';
import useAuthInfo from '@hooks/useAuthInfo';
import { webPath } from '@router/index';
import Button from '@components/Common/Button';
import Marquee from '@components/Common/Marquee/Marquee';
import useMockPurchase from '@components/Modal/MockPurchase/useMockPurchase';
import { useBuyExperimentMutation } from '@controllers/experiment/query';
import { StockDetailInfo } from '@controllers/stocks/types';
import { TitleContainer, TitleDetailContainer, TitleHeaderContainer } from './StockTitle.Style';

const StockTitle = ({ stockInfo }: { stockInfo: StockDetailInfo }) => {
  const { country, stockId, exchangeNum, priceDiff, priceDiffPerCent, price, symbol, symbolName } = stockInfo;
  const navigate = useNavigate();
  const { isLogin } = useAuthInfo();
  const { mutate: buyExperiment } = useBuyExperimentMutation();

  const { Modal: MockPurchaseModal, openModal: openMockPurchaseModal } = useMockPurchase();

  const handleClickBuy = useCallback(() => {
    if (!isLogin) {
      navigate(webPath.labStep, { state: { step: 0 } });
      return;
    }

    buyExperiment({ stockId, country });
    openMockPurchaseModal();
  }, [isLogin, navigate, buyExperiment, stockId, country, openMockPurchaseModal]);

  const marketCode = MARKET_CODES[exchangeNum];
  const countryImage = STOCK_COUNTRY_MAP[country].img;

  return (
    <TitleContainer>
      {MockPurchaseModal}
      <TitleHeaderContainer>
        <Marquee>
          <p className="name">{symbolName}</p>
        </Marquee>
        <p className="price">{getPriceText(country, price)}</p>
      </TitleHeaderContainer>
      <TitleDetailContainer delta={priceDiff}>
        <p>{marketCode}</p>
        <span>
          <p>{symbol}</p>
          <img src={countryImage} />
        </span>
        <p className="price-diff">{getDiffText({ valueDiff: priceDiff, percentDiff: priceDiffPerCent })}</p>
      </TitleDetailContainer>
      <Button onClick={handleClickBuy}>모의 매수하기</Button>
    </TitleContainer>
  );
};

export default StockTitle;
