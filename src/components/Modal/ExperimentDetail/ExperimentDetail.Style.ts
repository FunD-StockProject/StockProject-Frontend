import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const ExperimentDetailContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '0 20px',
});

const RecortSheetTitleContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '14px 10px',
  borderBottom: `1px solid ${theme.colors.sub_gray10}`,

  ['>img']: {
    width: '32px',
    height: '32px',
    borderRadius: '999px',
  },

  ['>p']: {
    margin: '0',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray1,
  },
});

const ExperimentDetailIndexListContainer = styled.div({
  display: 'flex',
});

const ExperimentDetailIndexItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: '1',

  ['p']: {
    margin: '0',
  },

  ['>p.title']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
  },

  ['>div']: {
    height: '52px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    ['>p.value']: {
      ...theme.font.body14Semibold,
      color: theme.colors.sub_white,
    },

    ['>p.subValue']: {
      ...theme.font.detail12Medium,
      color: theme.colors.sub_gray6,

      ['&.white']: {
        color: theme.colors.sub_gray2,
      },
    },

    ['>span']: {
      ...theme.font.body14Semibold,
    },

    ['&.roi']: {
      background: theme.colors.sub_gray11,
      border: `1px solid ${theme.colors.sub_gray9}`,
      borderRadius: '4px',
      width: '100%',
    },
  },
});

// Chart

const ExperimentDetailChartContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  padding: '8px 10px 22px',
  background: theme.colors.sub_gray11,
  boxSizing: 'border-box',
});

const ExperimentDetailChartGraphContainer = styled.div({
  position: 'relative',
  flexGrow: 1,
  height: '200px',

  ['>canvas']: {
    width: '100%',
    height: '100%',
  },
});

const ExperimentDetailChartLayer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-around',
});

const ExperimentDetailChartDot = styled.div(
  ({ score, enabled, selected }: { score: number | null; enabled: boolean; selected: boolean }) => ({
    ['>span']: {
      display: score != undefined ? 'block' : 'none',
      bottom: `${score ? score : 0}%`,
      scale: enabled ? '1' : '0',
      background: selected ? theme.colors.sub_blue6 : theme.colors.sub_gray11,
      boxShadow: selected ? `0 0 0px 3px ${theme.colors.sub_blue6}33, 0 0 0px 9px ${theme.colors.sub_blue6}33` : 'none',
    },
  }),
  {
    position: 'relative',
    width: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20px 0px',

    ['>span']: {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: `2px solid ${theme.colors.sub_blue6}`,
      boxSizing: 'border-box',
      borderRadius: '50%',
      transform: 'translateY(50%)',
      transition: 'all 0.2s ease-in-out',
    },
  },
);

const ExperimentDetailChartInfoLine = styled.div(
  ({ index, score }: { index: number; score: number }) => {
    const direction = score > 50 ? 'bottom' : 'top';

    return {
      left: `${10 + index * 20}%`,
      ['>span']: {
        top: direction == 'bottom' ? `calc(${100 - score}% + 6px)` : '45%',
        bottom: direction == 'top' ? `calc(${score}% + 6px)` : '40%',

        backgroundImage: `linear-gradient(to ${direction}, #FFFFFF80 0px, #2947D2 100%)`,
        maskImage: `repeating-linear-gradient(to ${direction}, #FFFFFF, #FFFFFF 3px, transparent 3px, transparent 6px)`,
        webkitMaskImage: `repeating-linear-gradient(to ${direction}, #FFFFFF, #FFFFFF 3px, transparent 3px, transparent 6px)`,
      },
    };
  },
  {
    position: 'absolute',
    top: '0',
    bottom: '0',
    margin: '20px 0px',
    // background: 'rgba(255, 255, 255, 1)',

    ['>span']: {
      position: 'absolute',
      width: '2px',
      transform: 'translateX(-50%)',
    },
  },
);

const ExperimentDetailChartInfoContent = styled.div(
  ({ index, score }: { index: number; score: number }) => {
    const left = index == 0 ? '0' : index == 1 ? '20%' : index == 2 ? '50%' : 'auto';
    const right = index == 4 ? '0' : index == 3 ? '20%' : 'auto';
    const transform = `translateX(${index == 4 ? '0%' : index == 3 ? '50%' : index == 2 ? '-50%' : index == 1 ? '-50%' : '0%'})`;
    const margin = `24px ${[1, 3].includes(index) ? '10%' : '0px'} 24px`;

    const direction = score > 50 ? 'bottom' : 'top';

    return {
      left,
      right,
      transform,
      margin,
      bottom: direction == 'bottom' ? '0' : 'auto',
      top: direction == 'top' ? `0` : 'auto',
    };
  },
  {
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '999px',
    padding: '10px 20px',
    boxSizing: 'border-box',
    position: 'absolute',

    ['>div']: {
      display: 'flex',
      flexDirection: 'column',
    },

    ['>p']: {
      margin: '0',
      ...theme.font.detail10Medium,
      color: theme.colors.sub_gray5,
    },
  },
);

const ExperimentDetailChartInfoItemContainer = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p.diff']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    ['>p']: {
      margin: '0',
      whiteSpace: 'nowrap',
      textAlign: 'left',

      ['&.name']: {
        ...theme.font.detail10Bold,
        color: theme.colors.sub_white,
        width: '36px',
      },
      ['&.value']: {
        ...theme.font.detail10Medium,
        color: theme.colors.sub_white,
      },
      ['&.diff']: {
        ...theme.font.detail10Medium,
      },
    },

    ['>span.divider']: {
      width: '1px',
      height: '10px',
      background: theme.colors.sub_gray7,
    },
  },
);

const ExperimentDetailChartDateContainer = styled.div({
  display: 'flex',

  ['>p']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
    width: '100%',
    textAlign: 'center',
    margin: '0',
  },
});

//

const ColoredDiffLabel = styled.span(({ delta }: { delta: number }) => ({
  color: deltaScoreToColor(delta) ?? theme.colors.sub_gray7,
}));

export {
  ExperimentDetailContent,
  RecortSheetTitleContainer,
  ExperimentDetailIndexListContainer,
  ExperimentDetailIndexItemContainer,
  ExperimentDetailChartContainer,
  ExperimentDetailChartGraphContainer,
  ExperimentDetailChartLayer,
  ExperimentDetailChartDot,
  ExperimentDetailChartInfoLine,
  ExperimentDetailChartInfoContent,
  ExperimentDetailChartInfoItemContainer,
  ExperimentDetailChartDateContainer,
  ColoredDiffLabel,
};
