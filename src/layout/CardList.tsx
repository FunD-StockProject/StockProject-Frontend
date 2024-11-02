import Card from './Card';

interface CardInterface {
  id: number;
  score: number;
}

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
