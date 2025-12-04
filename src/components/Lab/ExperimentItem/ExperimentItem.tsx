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
  const { stockId, symbolName, buyAt, status, currentPrice, buyPrice, roi } = experiment;

  const dateText = ((date: Date) => {
    const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map((num) =>
      num.toString().padStart(2, '0'),
    );

    return `${year}.${month}.${day}`;
  })(new Date(buyAt));
  const statusText = status === 'PROGRESS' ? '실험중' : '완료';

  const daysAgo = Math.floor((new Date().getTime() - new Date(buyAt).getTime()) / (24 * 60 * 60 * 1000));

  const diff = roi;
  const sign = diff > 0 ? '+' : diff < 0 ? '-' : '';
  const diffPercent = (Math.abs(diff / buyPrice) * 100).toFixed(1);
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
