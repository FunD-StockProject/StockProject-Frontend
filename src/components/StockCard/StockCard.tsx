import { useNavigate } from 'react-router-dom';
import { scoreToImage } from '@utils/ScoreConvert';
import { webPath } from '@router/index';
import DownSVG from '@assets/icons/down.svg?react';
import UpSVG from '@assets/icons/up.svg?react';
import { ScoreImage, StockCardItemContainer, StockCardItemDeltaScore, StockCardItemScore, StockCardItemText, StockCardItemTitle } from './StockCard.Style';

const StockCardItem = ({ name, score, delta, country }: { name: string; score: number; delta: number; country: string }) => {
  const navigate = useNavigate();
  const scoreImage = scoreToImage(score);
  const deltaSVG = delta > 0 ? <UpSVG /> : <DownSVG />;

  const handleClick = () => {
    navigate(webPath.search(), { state: { symbolName: name, country: country } });
  };

  return (
    <StockCardItemContainer onClick={handleClick}>
      <StockCardItemTitle>
        <StockCardItemText>{name}</StockCardItemText>
        <StockCardItemScore delta={delta}>
          {score}점
          <StockCardItemDeltaScore delta={delta}>
            {Math.abs(delta)}
            {deltaSVG}
          </StockCardItemDeltaScore>
        </StockCardItemScore>
      </StockCardItemTitle>
      <ScoreImage src={scoreImage} />
    </StockCardItemContainer>
  );
};

export default StockCardItem;
