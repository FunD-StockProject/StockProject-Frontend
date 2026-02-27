import styled from '@emotion/styled';
import { getDiffText } from '@utils/Number';
import { PortfolioResultRecommend } from '@controllers/experiment/api';
import { theme } from '@styles/themes';
import { ResultItemContainer, ResultItemTitle, ResultItemTitleHighlight } from '../Common.Style';

const RecommendTable = styled.div({
  display: 'table',
  padding: '12px 10px',
  background: `${theme.colors.sub_white}0D`,
  borderRadius: '4px',

  ['>div']: {
    display: 'table-row',

    ['&.header>p']: {
      color: theme.colors.sub_gray6,
      fontSize: '13px',
    },

    ['&.row>p']: {
      padding: '15px 20px 7px',
    },
  },

  ['>div>p']: {
    display: 'table-cell',
    ...theme.font.detail12Medium,
    color: theme.colors.sub_white,
    textAlign: 'center',
  },

  ['>div.row:not(:last-child) > p']: {
    borderBottom: `1px solid ${theme.colors.sub_gray10}`,
  },
});

const RecommendSummary = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  ['>p']: {
    margin: '0',

    ['&.primary']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray4,
    },

    ['&.secondary']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray5,

      ['>b']: {
        color: theme.colors.sub_white,
      },
    },
  },
});

const LabResultRecommend = ({ recommend }: { recommend?: PortfolioResultRecommend }) => {
  if (!recommend) return null;

  const { scoreTable, weeklyExperimentCount } = recommend;

  const focusRange = scoreTable.reduce((prev, curr) => {
    if (curr.avgYieldUser > prev.avgYieldUser) {
      return curr;
    }
    return prev;
  }, scoreTable[0]);

  const [lowestProfit, highestProfit] = ['min', 'max'].map((initial) =>
    scoreTable.reduce(
      (acc, curr) => {
        if (initial === 'min' ? curr.avgYieldUser > acc.value : curr.avgYieldUser < acc.value) {
          return acc;
        }
        return {
          range: curr.min === 90 ? '90점 이상' : `${curr.min}~${curr.max}점`,
          value: curr.avgYieldUser,
        };
      },
      {
        range: '',
        value: initial === 'min' ? Infinity : -Infinity,
      },
    ),
  );

  return (
    <ResultItemContainer>
      <ResultItemTitle>
        <p className="title">
          인간지표로 보는 <wbr />내 매수 타이밍 잡는 법!
        </p>
        <p className="description small">
          다음 매수 때는, <wbr />
          <ResultItemTitleHighlight type="RECOMMEND">
            ✨{focusRange.min}
            {focusRange.max !== 100 ? `~${focusRange.max}점` : '점 이상'} 구간
          </ResultItemTitleHighlight>
          에 주목해보세요!
        </p>
      </ResultItemTitle>
      <RecommendTable>
        <div className="header">
          <p>인간지표 점수대</p>
          <p>전체 평균 수익률</p>
          <p>내 평균 수익률</p>
        </div>
        {scoreTable.map((e, idx) => (
          <div className="row" key={`RECOMMEND_TABLE_ROW_${idx}`}>
            <p>
              {e.min}
              {e.max === 100 ? '점 이상' : `-${e.max}점`}
            </p>
            <p>{getDiffText({ percentDiff: e.avgYieldTotal, option: { percentFixed: 1 } })}</p>
            <p>{getDiffText({ percentDiff: e.avgYieldUser, option: { percentFixed: 1 } })}</p>
          </div>
        ))}
      </RecommendTable>
      <RecommendSummary>
        <p className="primary">이번주에 총 {weeklyExperimentCount}건의 실험을 진행하셨습니다.</p>
        <p className="secondary">
          ☺️ 가장 높은 수익률 | <b>{highestProfit.range} 구간</b> <br />
          😭 가장 낮은 수익률 | <b>{lowestProfit.range} 구간</b>
        </p>
      </RecommendSummary>
    </ResultItemContainer>
  );
};

export default LabResultRecommend;
