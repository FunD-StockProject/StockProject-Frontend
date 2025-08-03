

import { ExperimentItem } from "@ts/Interfaces";
import { ExperimentContainer, ExperimentCard, RankNumber, CompanyLogo, CompanyName, DateStatus, DetailsButton, DataContainer, PriceText } from "./ExpeimentList.Style";
import { useState } from "react";
import ExperimentDetailBottomSheet from "./ExperimentDetailBottomSheet";

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
          const daysAgo = item.autoSellIn > 0 ? item.autoSellIn + 3 : 8; // 임시 계산

          return (
            <ExperimentCard key={item.id}>
              <RankNumber>{index + 1}</RankNumber>
              <CompanyLogo src={item.logo} alt="logo" />
              <DataContainer>
                <CompanyName>{item.name}</CompanyName>
                <DateStatus>
                  {item.buyDate}({item.autoSellIn > 0 ? '실험중' : '완료'})
                </DateStatus>
                <span>
                  {daysAgo}일전보다 <PriceText isPositive={scoreDiff > 0} >
                    {scoreDiff >= 0 ? '+' : ''}{scoreDiffPercent}%
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
  )
};

export default ExperimentList;
