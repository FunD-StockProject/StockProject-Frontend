import { useState } from 'react';
import { ExperimentItem } from '@ts/Interfaces';
import StockImage from '@components/Common/StockImage';
import {
  CompanyLogo,
  CompanyName,
  DataContainer,
  DateStatus,
  DetailsButton,
  ExperimentCard,
  ExperimentContainer,
  PriceText,
  RankNumber,
} from './ExpeimentList.Style';
import ExperimentDetailBottomSheet from './ExperimentDetailBottomSheet';

const ExperimentList = ({ experiment }: { experiment: ExperimentItem[] }) => {
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentItem | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleDetailsClick = (experiment: ExperimentItem) => {
    setSelectedExperiment(experiment);
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setSelectedExperiment(null);
  };

  return (
    <>
      <ExperimentContainer>
        {experiment.map((item, index) => {
          const scoreDiff = item.currentScore - item.buyScore;
          const scoreDiffPercent = ((scoreDiff / item.buyScore) * 100).toFixed(0);
          // const daysAgo = item.autoSellIn > 0 ? item.autoSellIn + 3 : 8; // 임시 계산

          const _date = new Date(item.buyAt);
          const buyDate = `${_date.getFullYear() % 100}.${(_date.getMonth() + 1).toString().padStart(2, '0')}.${_date.getDate().toString().padStart(2, '0')}`;
          const daysAgo = (new Date().getTime() - _date.getTime()) / (24 * 60 * 60 * 1000);

          return (
            <ExperimentCard key={item.experimentId}>
              <RankNumber>{index + 1}</RankNumber>
              <StockImage
                stockId={item.stockId}
                style={{
                  width: '28px',
                  borderRadius: '999px',
                  marginRight: '12px',
                }}
              />
              <DataContainer>
                <CompanyName>{item.symbolName}</CompanyName>
                <DateStatus>
                  {buyDate}({item.status == 'PROGRESS' ? '실험중' : '완료'})
                </DateStatus>
                <span>
                  {daysAgo.toFixed(0)}일전보다{' '}
                  <PriceText isPositive={scoreDiff > 0}>
                    {scoreDiff >= 0 ? '+' : ''}
                    {scoreDiffPercent}%
                  </PriceText>
                </span>
              </DataContainer>
              <DetailsButton onClick={() => handleDetailsClick(item)}>자세히</DetailsButton>
            </ExperimentCard>
          );
        })}
      </ExperimentContainer>

      <ExperimentDetailBottomSheet
        experiment={selectedExperiment}
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      />
    </>
  );
};

export default ExperimentList;
