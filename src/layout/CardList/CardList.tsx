import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';
import { NoScrollbar } from './CardList.Style';
import HotCard from '../HotCard/HotCard';

const CardList = ({ list, isHot = false }: { list: CardInterface[]; isHot?: boolean }) => {
  return (
    <NoScrollbar>
      <ScrollMenu>
        {isHot
          ? list.map((item: CardInterface) => {
              return <HotCard key={item.id} score={item.score} stockName={item.stockName} />;
            })
          : list.map((item: CardInterface) => {
              return <Card key={item.id} score={item.score} stockName={item.stockName} />;
            })}
      </ScrollMenu>
    </NoScrollbar>
  );
};

export default CardList;
