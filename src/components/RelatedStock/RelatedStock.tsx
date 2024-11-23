import { ButtonDiv, FlexDiv, ImgDiv } from '../Common/Common';
import { Text, TextDetail, TextHeading } from '../Text/Text';
import { scoreToImage } from '../../utils/ScoreConvert';
import theme from '../../styles/themes';
import UpSVG from '../../assets/icons/up.svg?react';
import DownSVG from '../../assets/icons/down.svg?react';
import { RelatedStockContainer, RelatedStockItemContainer, RelatedStockItemTitle } from './RelatedStock.Style';

const RelatedStockItem = ({
  stockName,
  stockScore,
  stockDeltaScore,
}: {
  stockName: string;
  stockScore: number;
  stockDeltaScore: number;
}) => {
  const scoreImage = scoreToImage(stockScore);
  const backgroundColor = stockScore > 50 ? 'red' : 'blue';
  const deltaColor = stockDeltaScore > 0 ? 'yellow' : 'cyan';
  const deltaSVG = stockDeltaScore > 0 ? <UpSVG fill={theme.colors.yellow} /> : <DownSVG fill={theme.colors.cyan} />;

  return (
    <RelatedStockItemContainer onClick={() => {}}>
      <ImgDiv src={scoreImage} width="100%" />
      <RelatedStockItemTitle>
        <ButtonDiv gap="8px" background={backgroundColor} radius="100px" padding="8px 24px">
          <Text size="Large" weight="Bold" color="primary0">
            {stockScore}점
          </Text>
          <FlexDiv gap="2px" alignItems="center">
            <TextDetail weight="Bold" color={deltaColor}>
              {stockDeltaScore}
            </TextDetail>
            {deltaSVG}
          </FlexDiv>
        </ButtonDiv>
        <TextHeading color="grayscale90">{stockName}</TextHeading>
      </RelatedStockItemTitle>
    </RelatedStockItemContainer>
  );
};

const RelatedStock = () => {
  const arr = [
    { stockName: '삼성전자', stockScore: 81, stockDeltaScore: 18 },
    { stockName: '한화솔루션', stockScore: 11, stockDeltaScore: -18 },
    { stockName: 'SK하이닉스', stockScore: 32, stockDeltaScore: -7 },
  ];

  return (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <TextHeading size="Small" color="grayscale10">
        관련 종목
      </TextHeading>
      <RelatedStockContainer>
        {arr.map((e, i) => (
          <RelatedStockItem
            key={i}
            stockName={e.stockName}
            stockScore={e.stockScore}
            stockDeltaScore={e.stockDeltaScore}
          />
        ))}
      </RelatedStockContainer>
    </FlexDiv>
  );
};

export default RelatedStock;
