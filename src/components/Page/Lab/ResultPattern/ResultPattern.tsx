import styled from '@emotion/styled';
import { getDiffText } from '@utils/Number';
import { deltaToCaret, deltaToColor } from '@utils/ScoreConvert';
import ReportPatternChart from '@components/Lab/ReportPatternChart/ReportPatternChart';
import { PortfolioResultPattern } from '@controllers/experiment/api';
import { theme } from '@styles/themes';
import HelpSVG from '@assets/icons/question_mark_circle_fill.svg?react';
import {
  ResultItemContainer,
  ResultItemHelpContainer,
  ResultItemTitle,
  ResultItemTitleHighlight,
} from '../Common.Style';

export type PatternQuadrantKey = 'trend-preemptive' | 'lagging-follower' | 'reverse-investor' | 'value-preemptive';

export const patternQuadrantKeys: PatternQuadrantKey[] = [
  'trend-preemptive',
  'lagging-follower',
  'reverse-investor',
  'value-preemptive',
];

export interface PatternQuadrant {
  icon: string;
  name: string;
  buySignal: string;
  outcome: '수익' | '손실';
  copy: {
    primary: string;
    secondary: string;
  };
}

export const patternQuadrantMap: Record<PatternQuadrantKey, PatternQuadrant> = {
  'trend-preemptive': {
    icon: '✅',
    name: '트렌드 선점형',
    buySignal: '인간지표 높을 때 매수',
    outcome: '수익',
    copy: {
      primary: '점수가 높을 때 매수하여, 수익을 보는 투자 패턴',
      secondary: '군중심리 활용을 잘하고 있는 유형이에요!',
    },
  },
  'lagging-follower': {
    icon: '❕',
    name: '후행 추종형',
    buySignal: '인간지표 높을 때 매수',
    outcome: '손실',
    copy: {
      primary: '점수가 높을 때 매수하여, 손실을 보는 투자 패턴',
      secondary: '유행을 따라가다 시장이 과열되어 있어 물리게되는 경우가 많아요!',
    },
  },
  'reverse-investor': {
    icon: '📉',
    name: '역행 투자형',
    buySignal: '인간지표 낮을 때 매수',
    outcome: '손실',
    copy: {
      primary: '점수가 낮을 때 매수하여, 손실을 보는 투자 패턴',
      secondary: '남들과 반대로 하다 실패하는 경우가 많아요!',
    },
  },
  'value-preemptive': {
    icon: '💎',
    name: '가치 선점형',
    buySignal: '인간지표 낮을 때 매수',
    outcome: '수익',
    copy: {
      primary: '점수가 낮을 때 매수하여, 수익을 보는 투자 패턴',
      secondary: '남들이 관심 없을 때 진입을 해두는 경우가 많아요!',
    },
  },
};

export const patternQuadrantList: ({
  key: PatternQuadrantKey;
} & PatternQuadrant)[] = Object.entries(patternQuadrantMap).map(
  ([key, value]) =>
    ({
      key,
      ...value,
    }) as { key: PatternQuadrantKey } & PatternQuadrant,
);

const PatternExplainContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',

  padding: '16px 10px',
  background: `${theme.colors.sub_white}0D`,
  borderRadius: '4px',

  ['>p']: {
    margin: '0',

    ['&.primary']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_gray2,
    },
    ['&.secondary']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray7,
    },
  },
});

const PatternExplainTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_blue5,
    },
    ['&.sub']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const PatternHistoryContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  borderRadius: '4px',
  padding: '8px 10px 12px',
  background: `${theme.colors.sub_white}0D`,
});

const PatternHistoryHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  ['>p']: {
    margin: 0,

    ['&.title']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_gray6,
    },
    ['&.sub']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray7,
    },
  },
});

const PatternHistoryContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const PatternHistoryItem = styled.div(
  ({ delta }: { delta: number }) => ({
    ['span.roi']: {
      ['>p']: {
        color: deltaToColor(delta) ?? theme.colors.sub_gray6,
      },
      ['>svg']: {
        fill: deltaToColor(delta) ?? theme.colors.sub_gray6,
      },
    },
  }),
  {
    display: 'flex',
    flexDirection: 'column',
    background: `${theme.colors.sub_white}05`,
    borderRadius: '4px',
    padding: '8px 10px',
    border: `1px solid ${theme.colors.sub_gray10}`,
    gap: '4px',

    ['>div']: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '4px',

      ['p']: {
        margin: '0',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },

      ['&.primary']: {
        ['>p.name']: {
          ...theme.font.body16Medium,
          color: theme.colors.sub_gray2,
        },
        ['>span.roi']: {
          display: 'flex',
          alignItems: 'center',
          gap: '4px',

          ['>p']: {
            ...theme.font.body14Semibold,
          },

          ['>svg']: {
            width: '10px',
            height: 'auto',
          },
        },
      },
      ['&.secondary']: {
        ['>p.date']: {
          ...theme.font.detail12Medium,
          color: theme.colors.sub_gray7,
        },
        ['>p.score']: {
          ...theme.font.detail12Medium,
          color: theme.colors.sub_gray6,
          background: theme.colors.sub_gray10,
          borderRadius: '5px',
          padding: '2px 4px',
        },
      },
    },
  },
);

const LabResultPattern = ({
  pattern,
  openHelpModal,
}: {
  pattern?: PortfolioResultPattern;
  openHelpModal: () => void;
}) => {
  if (!pattern) return null;

  const { type, percentile, history } = pattern;

  const patternQuadrant = patternQuadrantMap[type];
  const { icon, name, copy } = patternQuadrant;

  return (
    <ResultItemContainer>
      <ResultItemTitle>
        <p className="title">그동안 지켜본 당신의 투자패턴은</p>
        <p className="description">
          <ResultItemTitleHighlight type="PATTERN">
            {icon} {name}
          </ResultItemTitleHighlight>
          에 속하는 <wbr />
          경우가 많아요
        </p>
      </ResultItemTitle>
      <PatternExplainContainer>
        <PatternExplainTitle>
          <p className="title">
            {icon} {name} 이란?
          </p>
          <p className="sub">({percentile}% 유저가 이에 속해요)</p>
        </PatternExplainTitle>
        <p className="primary">{copy.primary}</p>
        <p className="secondary">{copy.secondary}</p>
      </PatternExplainContainer>
      <ResultItemHelpContainer onClick={() => openHelpModal()}>
        <HelpSVG />
        <p>각 사분면은 무슨 패턴이에요?</p>
      </ResultItemHelpContainer>
      <ReportPatternChart type={type} history={history} isTutorial={false} />
      <PatternHistoryContainer>
        <PatternHistoryHeader>
          <p className="title">상세 데이터({history.length})</p>
          <p className="sub">최근 완료순</p>
        </PatternHistoryHeader>
        <PatternHistoryContent>
          {history.map((e, idx) => {
            const Caret = deltaToCaret(e.roi);

            return (
              <PatternHistoryItem delta={e.roi} key={`LAB_RESULT_PATTERN_ITEM_${idx}`}>
                <div className="primary">
                  <p className="stockName">{e.stockName}</p>
                  <span className="roi">
                    <Caret />
                    <p>{getDiffText({ percentDiff: e.roi, option: { percentFixed: 1 } })}</p>
                  </span>
                </div>
                <div className="secondary">
                  <p className="date">XX.XX.XX ~ XX.XX.XX</p>
                  <p className="score">인간지표 {e.score}</p>
                </div>
              </PatternHistoryItem>
            );
          })}
        </PatternHistoryContent>
      </PatternHistoryContainer>
    </ResultItemContainer>
  );
};

export default LabResultPattern;
