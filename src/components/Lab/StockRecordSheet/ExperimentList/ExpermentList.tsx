

import { ExperimentItem } from "@ts/Interfaces";
import { ExperimentTable, ExperimentHeader, ExperimentHeaderCell, ExperimentRow, ExperimentCell, ExperimentLogo, ExperimentText, PriceText, } from "./ExpeimentList.Style";

const ExperimentList = ({ experiment }: { experiment: ExperimentItem[] }) => {

  return (
    <ExperimentTable>
      <ExperimentHeader>
        <ExperimentHeaderCell>매수일/상태</ExperimentHeaderCell>
        <ExperimentHeaderCell style={{ flex: 2 }}>종목명</ExperimentHeaderCell>
        <ExperimentHeaderCell>매수시점</ExperimentHeaderCell>
        <ExperimentHeaderCell>현재시점</ExperimentHeaderCell>
        <ExperimentHeaderCell>수익률</ExperimentHeaderCell>
      </ExperimentHeader>
      {experiment.map((item) => {
        const scoreDiff = item.currentScore - item.buyScore;
        const scoreDiffPercent = ((scoreDiff / item.buyScore) * 100).toFixed(0);
        return (
          <ExperimentRow key={item.id}>
            <ExperimentCell>
              <div>{item.buyDate}</div>
              {item.autoSellIn > 0 ? <PriceText>실험중 (D-{item.autoSellIn})</PriceText> : <PriceText>완료</PriceText>}
            </ExperimentCell>
            <ExperimentCell style={{ flexDirection: 'row', flex: 2 }}>
              <ExperimentLogo src={item.logo} alt="logo" />
              <ExperimentText>{item.name}</ExperimentText>
            </ExperimentCell>
            <ExperimentCell>
              <div>{item.buyScore}점</div>
              <PriceText>{item.buyPrice.toLocaleString()}</PriceText>
            </ExperimentCell>
            <ExperimentCell >
              <div>{item.currentScore}점</div>
              <PriceText>{item.currentPrice.toLocaleString()}</PriceText>
            </ExperimentCell>
            <ExperimentCell>
              <div style={{ textAlign: 'center' }}>
                {scoreDiff >= 0 ? '+' : ''}
                {scoreDiff.toLocaleString()}점
                <PriceText isPositive={scoreDiff >= 0}>
                  ({scoreDiffPercent}%)
                </PriceText>
              </div>
            </ExperimentCell>
          </ExperimentRow>
        );
      })}
    </ExperimentTable>
  )
};

export default ExperimentList;
