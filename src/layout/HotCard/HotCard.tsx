import { useNavigate } from 'react-router-dom';
import { webPath } from '../../router';
import { StyledContainer, StyledCard, StyledTitle } from './HotCard.Style';
import ScoreSlotMachine from '../../components/StockSlotMachine/StockSlotMachine';

const Card = ({ score, stockName }: { score: number; stockName: string }) => {
  const navigate = useNavigate();

  const handleClick = (stockName: string) => {
    navigate(webPath.search(), { state: { stockName } });
  };

  return (
    <StyledContainer>
      <StyledTitle>{stockName}</StyledTitle>
      <StyledCard tabIndex={0} onClick={() => handleClick(stockName)}>
        <ScoreSlotMachine stockName={stockName} stockScore={score} slotMachineType="TITLE" />
        <ScoreSlotMachine stockName={stockName} stockScore={score} slotMachineType="IMAGE" />
        <ScoreSlotMachine stockName={stockName} stockScore={score} slotMachineType="SCORE" />
      </StyledCard>
    </StyledContainer>
  );
};

export default Card;
