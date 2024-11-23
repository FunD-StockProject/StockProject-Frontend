import { ButtonDiv, FlexDiv, ImgDiv } from '../Common/Common';
import { Text, TextDetail, TextHeading } from '../Text/Text';
import { scoreToImage } from '../../utils/ScoreConvert';
import theme from '../../styles/themes';
import UpSVG from '../../assets/icons/up.svg?react';
import DownSVG from '../../assets/icons/down.svg?react';
import { StockRelevantContainer, StockRelevantItemContainer, StockRelevantItemTitle } from './RelatedStock.Style';
import { useEffect, useState } from 'react';
// import { fetchRelevant } from '../../controllers/api';

const sample = [
  { stockName: '삼성전자', stockScore: 81, stockDeltaScore: 18 },
  { stockName: '한화솔루션', stockScore: 11, stockDeltaScore: -18 },
  { stockName: 'SK하이닉스', stockScore: 32, stockDeltaScore: -7 },
];

const StockRelevantItem = ({
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
    <StockRelevantItemContainer onClick={() => {}}>
      <ImgDiv src={scoreImage} width="100%" />
      <StockRelevantItemTitle>
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
      </StockRelevantItemTitle>
    </StockRelevantItemContainer>
  );
};

const StockRelevant = ({ stockId }: { stockId: number }) => {
  const [didMount, setDidMount] = useState<boolean>(false);
  const [stockRelevantList, setStockRelevantList] = useState<any[]>();

  const getStockRelevantList = async (stockId: number) => {
    // const res = await Promise.resolve(fetchRelevant(stockId));
    // if (!res) return null;
    // setStockRelevantList(res);
    stockId;
    setStockRelevantList(sample);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {};
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getStockRelevantList(stockId);
  }, [didMount]);

  return stockRelevantList ? (
    <FlexDiv flexDirection="column" gap="24px" width="100%">
      <TextHeading size="Small" color="grayscale10">
        관련 종목
      </TextHeading>
      <StockRelevantContainer>
        {stockRelevantList.map((e, i) => (
          <StockRelevantItem
            key={i}
            stockName={e.stockName}
            stockScore={e.stockScore}
            stockDeltaScore={e.stockDeltaScore}
          />
        ))}
      </StockRelevantContainer>
    </FlexDiv>
  ) : (
    ''
  );
};

export default StockRelevant;
