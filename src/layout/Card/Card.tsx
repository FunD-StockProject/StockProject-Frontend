import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { scoreToImage } from '../../utils/ScoreConvert';
import { StyledCard } from './Card.Style';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledCard tabIndex={0} onClick={() => handleClick(stockName)} style={{ padding: '10px', display: 'inline-block' }}>
      <div style={{ color: 'white' }}>{stockName}</div>
      <img src={imgLink}></img>
    </StyledCard>
  );
};

export default Card;
