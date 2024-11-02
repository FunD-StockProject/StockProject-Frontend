import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';

const CardList = ({ list }: { list: CardInterface[] }) => {
  return (
    <div>
      <div style={{ display: 'flex', padding: '10px' }}>
        {list.map((item: CardInterface) => (
          <Card key={item.id} score={item.score} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
