import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { scoreToImage } from '../../utils/ScoreConvert';
import { StyledCard, StyledChangedScore, StyledScore, StyledText } from './Card.Style';
import risingSymbol from '../../assets/risingSymbol.svg';
import descentSymbol from '../../assets/descentSymbol.svg';

const Card = ({ score, stockName, diff }: { score: number; stockName: string; diff: number }) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);

  const isRising = diff >= 0;
  const backgroundColor = isRising ? '#fd4821' : '#2D92FF';
  const symbol = isRising ? risingSymbol : descentSymbol;
  const color = isRising ? '#FFEA64' : '#64FFEA';

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledCard tabIndex={0} onClick={() => handleClick(stockName)}>
      <img src={imgLink}></img>
      <div>
        <StyledScore backgroundColor={backgroundColor}>
          {score}점
          <StyledChangedScore color={color}>
            {Math.abs(diff)}
            <img src={symbol}></img>
          </StyledChangedScore>
        </StyledScore>
        <StyledText>{stockName}</StyledText>
      </div>
    </StyledCard>
  );
};

export default Card;
