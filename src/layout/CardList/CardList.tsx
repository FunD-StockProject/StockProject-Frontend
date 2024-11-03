import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';

const CardList = ({ list }: { list: CardInterface[] }) => {
  return (
    <>
      {list.map((item: CardInterface) => (
        <Card key={item.id} score={item.score} stockName={item.stockName} />
      ))}
    </>
  );
};

export default CardList;
