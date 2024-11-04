import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';
import { NoScrollbar } from './CardList.Style';

const CardList = ({ list }: { list: CardInterface[] }) => {
  return (
    <NoScrollbar>
      <ScrollMenu>
        {list.map((item: CardInterface) => {
          return <Card key={item.id} score={item.score} stockName={item.stockName} />;
        })}
      </ScrollMenu>
    </NoScrollbar>
  );
};

export default CardList;
