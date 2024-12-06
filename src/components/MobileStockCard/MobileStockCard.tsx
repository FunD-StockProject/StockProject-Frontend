import { useNavigate } from 'react-router-dom';
import { scoreToImage } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import {
  MobileScoreImage,
  MobileStockCardItemContainer,
  MobileStockCardItemDeltaScore,
  MobileStockCardItemScore,
  MobileStockCardItemText,
  MobileStockCardItemTitle,
} from './MobileStockCard.Style';

const MobileStockCardItem = ({ name, score, delta }: { name: string; score: number; delta: number }) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const deltaSVG = delta > 0 ? <UpSVG /> : <DownSVG />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { stockName: name } });
  };

  return (
    <MobileStockCardItemContainer onClick={handleClick}>
      <MobileScoreImage src={scoreImage} />
      <MobileStockCardItemTitle>
        <MobileStockCardItemText>{name}</MobileStockCardItemText>
        <MobileStockCardItemScore delta={delta}>
          {score}점{' '}
          <MobileStockCardItemDeltaScore delta={delta}>
            {Math.abs(delta)}
            {deltaSVG}
          </MobileStockCardItemDeltaScore>
        </MobileStockCardItemScore>
      </MobileStockCardItemTitle>
    </MobileStockCardItemContainer>
  );
};

export default MobileStockCardItem;
