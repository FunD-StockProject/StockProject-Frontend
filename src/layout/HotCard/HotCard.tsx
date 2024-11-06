import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { StyledCard, StyledContent, StyledDivider, StyledImage, StyledText } from './HotCard.Style';
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
      <StyledText>{stockName}</StyledText>
      <StyledDivider />
      <StyledImage src={imgLink} alt="card image" />
      <StyledDivider />
      <StyledText>
        {score}점
        <br />
        {text}
      </StyledText>
    </StyledCard>
  );
};

export default Card;
