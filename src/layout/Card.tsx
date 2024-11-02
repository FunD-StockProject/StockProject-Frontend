import { scoreToImage } from '../utils/ScoreToImage';

const Card = ({ score }: { score: number }) => {
  const imgLink = scoreToImage(score);

  return (
    <div>
      <div>추후 이미지로 변환</div>
      <div>{imgLink}</div>
    </div>
  );
};

export default Card;