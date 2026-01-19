import { getFormattedDate } from '@utils/dateFormatter';
import StockImage from '@components/Common/StockImage';
import { ExperimentItem } from '@controllers/experiment/api';
import { ColoredDiffLabel, ExperimentItemContainer, ExperimentItemContent } from './ExperimentItem.Style';

const ExperimentItemComponent = ({
  experiment,
  idx,
  handleClickExperimentDetail,
}: {
  experiment: ExperimentItem;
  idx: number;
  handleClickExperimentDetail: (experimentId: number) => void;
}) => {
  const { stockId, symbolName, buyAt, status, buyPrice, roi } = experiment;
  const dateText = getFormattedDate(buyAt);
  const statusText = status === 'PROGRESS' ? '실험중' : '완료';

  const daysAgo = (() => {
    // buyAt이 배열 형태인 경우 Date 객체로 변환
    const buyDate = Array.isArray(buyAt)
      ? new Date(buyAt[0], buyAt[1] - 1, buyAt[2], buyAt[3] || 0, buyAt[4] || 0, buyAt[5] || 0)
      : new Date(buyAt);
    return Math.floor((new Date().getTime() - buyDate.getTime()) / (24 * 60 * 60 * 1000));
  })();

  const diff = roi;
  const sign = diff > 0 ? '+' : diff < 0 ? '-' : '';
  const diffPercent = buyPrice !== 0 ? (Math.abs(diff / buyPrice) * 100).toFixed(1) : '0.0';
  const diffPercentText = sign + diffPercent + '%';

  return (
    <ExperimentItemContainer>
      <p className="index">{idx + 1}</p>
      <ExperimentItemContent>
        <StockImage stockId={stockId} />
        <div>
          <p className="name">{symbolName}</p>
          <p className="date">
            {dateText}({statusText})
          </p>
          <p className="diff">
            {daysAgo}일전보다 <ColoredDiffLabel delta={diff}>{diffPercentText}</ColoredDiffLabel>
          </p>
        </div>
      </ExperimentItemContent>
      <button className="more" onClick={() => handleClickExperimentDetail(experiment.experimentId)}>
        자세히
      </button>
    </ExperimentItemContainer>
  );
};

export default ExperimentItemComponent;
