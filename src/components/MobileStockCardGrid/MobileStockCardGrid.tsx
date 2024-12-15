import { CardInterface } from '@ts/Interfaces';
import { chunkArray } from '@utils/chunkArray';
import { CardListItemContainer } from '@components/CardList/CardList.Style';
import MobileStockCardItem from '@components/MobileStockCard/MobileStockCard';

const MobileStockCardGrid = ({ curStocks, name, country }: { curStocks: CardInterface[]; name: string; country: string }) => {
  const verticalStocks = chunkArray(curStocks, 3);

  return verticalStocks.map((verticalStock, idx) => (
    <CardListItemContainer key={`${name}_${verticalStock[0].stockId}_${idx}`}>
      {verticalStock.map((stock) => (
        <MobileStockCardItem key={`${name}_${stock.stockId}`} score={stock.score} name={stock.symbolName} delta={stock.diff} country={country} />
      ))}
    </CardListItemContainer>
  ));
};

export default MobileStockCardGrid;
