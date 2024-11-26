import { useNavigate } from 'react-router-dom';
import { scoreToImage } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import { ImgDiv } from '@components/Common/Common';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  StockCardItemContainer,
  StockCardItemDeltaScore,
  StockCardItemScore,
  StockCardItemTitle,
} from './StockCard.Style';

const StockCardItem = ({ name, score, delta }: { name: string; score: number; delta: number }) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const deltaSVG = delta > 0 ? <UpSVG /> : <DownSVG />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { stockName: name } });
  };

  return (
    <StockCardItemContainer onClick={handleClick}>
      <ImgDiv src={scoreImage} width="100%" />
      <StockCardItemTitle>
        <StockCardItemScore delta={delta}>
          {score}점
          <StockCardItemDeltaScore delta={delta}>
            {Math.abs(delta)}
            {deltaSVG}
          </StockCardItemDeltaScore>
        </StockCardItemScore>
        {name}
      </StockCardItemTitle>
    </StockCardItemContainer>
  );
};

export default StockCardItem;
