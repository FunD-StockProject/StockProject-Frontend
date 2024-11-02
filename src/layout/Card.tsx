import { scoreToImage } from '../utils/ScoreToImage';

const Card = ({ score }: { score: number }) => {
  const imgLink = scoreToImage(score);

  return (
    <div>
      <img src={imgLink}></img>
    </div>
  );
};

export default Card;
