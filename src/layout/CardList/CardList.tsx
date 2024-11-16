import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { CardInterface } from '../../ts/Interfaces';
import Card from '../Card/Card';
import { NoScrollbar } from './CardList.Style';
import HotCard from '../HotCard/HotCard';

const CardList = ({ list, backgroundColor, isHot = false }: { list: CardInterface[]; backgroundColor?: string; isHot?: boolean }) => {
  return (
    <NoScrollbar>
      <ScrollMenu>
        {isHot
          ? list.map((item: CardInterface) => {
              return <HotCard key={item.id} score={item.score} stockName={item.stockName} />;
            })
          : list.map((item: CardInterface) => {
              return <Card key={item.id} score={item.score} stockName={item.stockName} backgroundColor={backgroundColor ? backgroundColor : '#fd4821'} />;
            })}
      </ScrollMenu>
    </NoScrollbar>
  );
};

export default CardList;
