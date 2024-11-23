import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { scoreToImage } from '../../utils/ScoreConvert';
import { StyledCard, StyledChangedScore, StyledScore } from './Card.Style';
import risingSymbol from '../../assets/risingSymbol.svg';
import descentSymbol from '../../assets/descentSymbol.svg';

const Card = ({
  score,
  stockName,
  scoreChanged,
}: {
  score: number;
  stockName: string;
  scoreChanged: number;
}) => {
  const navigate = useNavigate();
  const imgLink = scoreToImage(score);

  const isRising = scoreChanged > 0;
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
            {10}
            <img src={symbol}></img>
          </StyledChangedScore>
        </StyledScore>
        {stockName}
      </div>
    </StyledCard>
  );
};

export default Card;
