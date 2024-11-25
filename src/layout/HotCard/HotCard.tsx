import { useNavigate } from 'react-router-dom';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import { webPath } from '../../router';
import { StyledContainer, StyledTitle } from './HotCard.Style';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const navigate = useNavigate();

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledContainer>
      <StyledTitle>{stockName}</StyledTitle>
      <ScoreSlotMachine stockName={stockName} stockScore={score} tabIndex={0} onClick={() => handleClick(stockName)} />
    </StyledContainer>
  );
};

export default Card;
