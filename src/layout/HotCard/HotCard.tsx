import { useNavigate } from 'react-router-dom';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';
import { webPath } from '../../router';
import { StyledContainer } from './HotCard.Style';

const Card = ({ width, score, stockName }: { width?: number; score: number; stockName: string }) => {
  const navigate = useNavigate();

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledContainer width={width ?? 0}>
      <ScoreSlotMachine
        stockName={stockName}
        title={true}
        stockScore={score}
        tabIndex={0}
        onClick={() => handleClick(stockName)}
      />
    </StyledContainer>
  );
};

export default Card;
