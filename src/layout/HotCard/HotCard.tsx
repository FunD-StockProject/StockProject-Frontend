import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { StyledCard, StyledImage, StyledText, StyledTitle } from './HotCard.Style';
import { scoreToImage, scoreToText } from '../../utils/ScoreConvert';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);
  const text = scoreToText(score);

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <>
      <StyledTitle>{stockName}</StyledTitle>
      <StyledCard tabIndex={0} onClick={() => handleClick(stockName)}>
        <>
          <StyledText>{text}</StyledText>
        </>
        <>
          <StyledImage src={imgLink} alt="card image" />
        </>
        <>
          <StyledText>{score}</StyledText>
        </>
      </StyledCard>
    </>
  );
};

export default Card;