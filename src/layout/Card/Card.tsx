import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { scoreToImage } from '../../utils/ScoreToImage';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <div onClick={() => handleClick(stockName)} style={{ padding: '10px' }}>
      <div> {stockName}</div>
      <img src={imgLink}></img>
    </div>
  );
};

export default Card;
