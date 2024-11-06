import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { StyledCard, StyledDivider } from './HotCard.Style';
import { scoreToImage, scoreToText } from '../../utils/ScoreConvert';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);
  const text = scoreToText(score);

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledCard tabIndex={0} onClick={() => handleClick(stockName)}>
      <div className="text">{stockName}</div>
      <StyledDivider />
      <img src={imgLink} alt="card image" />
      <StyledDivider />
      <div className="text">
        {score}점
        <br />
        {text}
      </div>
    </StyledCard>
  );
};

export default Card;
