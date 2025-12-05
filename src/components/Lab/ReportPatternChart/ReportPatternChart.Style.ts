import styled from '@emotion/styled';
import { theme } from '@styles/themes';
import { PatternQuadrantKey } from './ReportPatternChart.Type';

const ReportPatternChartContainer = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  ['>div']: {
    position: 'relative',
    height: '200px',
    width: '100%',

    ['>canvas']: {
      width: '100%',
      height: '100%',
    },
  },
});

const ReportPatternChartAxisLabel = styled.p(
  ({ isTutorial }: { isTutorial?: boolean }) => ({
    ['&.roi']: {
      color: isTutorial ? theme.colors.sub_blue6 : theme.colors.sub_gray6,
    },

    ['&.index']: {
      color: isTutorial ? theme.colors.sub_red : theme.colors.sub_gray6,
    },
  }),
  {
    margin: '0px',
    ...theme.font.body16Semibold,
    whiteSpace: 'nowrap',

    ['&.index']: {
      position: 'absolute',
      right: '0',
      top: 'calc(50% + 8px)',
    },
  },
);

const ReportPatternChartItem = styled.div(
  ({ x, y, quadrant }: { x: number; y: number; quadrant: PatternQuadrantKey }) => {
    const inQuadrant =
      x - 50 >= 0
        ? y - 50 >= 0
          ? quadrant === 'top-right'
          : quadrant === 'bottom-right'
        : y - 50 >= 0
          ? quadrant === 'top-left'
          : quadrant === 'bottom-left';

    return {
      left: `${x}%`,
      bottom: `${y}%`,

      ['>p']: {
        color: inQuadrant ? theme.colors.sub_gray2 : theme.colors.sub_gray7,
      },
    };
  },
  {
    position: 'absolute',
    width: '0px',
    height: '0px',

    ['>p']: {
      margin: '0',
      position: 'absolute',
      bottom: 'calc(50% + 16px)',
      left: '50%',
      transform: 'translate(-50%, 50%)',
      ...theme.font.detail12Medium,
    },

    ['>span']: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: theme.colors.sub_blue6,
    },
  },
);

const ReportPatternChartQuadrant = styled.div(
  ({ quadrant }: { quadrant: PatternQuadrantKey }) => ({
    top: quadrant.includes('top') ? '0' : '',
    left: quadrant.includes('left') ? '0' : '',
    right: quadrant.includes('right') ? '0' : '',
    bottom: quadrant.includes('bottom') ? '0' : '',
  }),
  {
    position: 'absolute',
    width: 'calc(50% - 6px)',
    height: 'calc(50% - 6px)',
    opacity: 0.2,
    padding: '6px',
    boxSizing: 'border-box',
    background: theme.colors.sub_blue6,
    borderRadius: '4px',
  },
);

const ReportPatternChartTutorialQuadrant = styled.div({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',

  ['>div']: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'start',
    justifyContent: 'center',
    padding: '12px',
    boxSizing: 'border-box',

    ['&.top']: {
      top: '0',
    },
    ['&.right']: {
      right: '0',
    },
    ['&.bottom']: {
      bottom: '0',
    },
    ['&.left']: {
      left: '0',
    },

    ['>div']: {
      display: 'flex',
      flexDirection: 'column',

      ['>p']: {
        margin: '0',
        ['&.title']: {
          ...theme.font.detail12Semibold,
          color: theme.colors.sub_white,
        },
        ['&.description']: {
          ...theme.font.detail12Medium,
          color: theme.colors.sub_gray6,
        },
      },
    },

    ['>span']: {
      ...theme.font.detail10Semibold,
      color: theme.colors.sub_white,
      padding: '4px 8px',
      background: theme.colors.sub_gray9,
      borderRadius: '999px',
    },
  },
});

export {
  ReportPatternChartContainer,
  ReportPatternChartAxisLabel,
  ReportPatternChartItem,
  ReportPatternChartQuadrant,
  ReportPatternChartTutorialQuadrant,
};
