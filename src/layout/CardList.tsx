import { CardInterface } from '../ts/Interfaces';
import Card from './Card';

const CardList = ({ list }: { list: CardInterface[] }) => {
  return (
    <div>
      <div>
        {list.map((item: CardInterface) => (
          <Card key={item.id} score={item.score} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
