import { scoreToImage } from '../../utils/ScoreToImage';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const imgLink = scoreToImage(score);

  return (
    <div style={{ padding: '10px' }}>
      <div> {stockName}</div>
      <img src={imgLink}></img>
    </div>
  );
};

export default Card;
