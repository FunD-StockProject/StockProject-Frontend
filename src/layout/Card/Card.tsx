import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { scoreToImage } from '../../utils/ScoreConvert';
import { StyledCard, StyledScore } from './Card.Style';

const Card = ({ score, stockName, backgroundColor }: { score: number; stockName: string; backgroundColor: string }) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledCard tabIndex={0} onClick={() => handleClick(stockName)}>
      <img src={imgLink}></img>
      <div>
        <StyledScore backgroundColor={backgroundColor}>{score}</StyledScore>
        {stockName}
      </div>
    </StyledCard>
  );
};

export default Card;
