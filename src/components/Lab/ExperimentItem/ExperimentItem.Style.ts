import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const ExperimentItemContainer = styled.div({
  display: 'flex',
  alignItems: 'center',

  ['>p.index']: {
    width: '32px',
    margin: '0px',
    ...theme.font.body14Semibold,
    color: theme.colors.sub_blue6,
    flexShrink: '0',
    textAlign: 'center',
  },

  ['>button.more']: {
    ...theme.font.body14Semibold,
    background: theme.colors.sub_blue6,
    color: theme.colors.sub_white,
    borderRadius: '5px',
    padding: '4px 16px',
    border: 'none',
    flexShrink: '0',
  },
});

const ExperimentItemContent = styled.div({
  display: 'flex',
  padding: '6px 10px',
  alignItems: 'center',
  gap: '12px',
  overflow: 'hidden',
  flexGrow: 1,

  ['>img']: {
    width: '28px',
    height: '28px',
    aspectRatio: '1 / 1',
    borderRadius: '999px',
    objectFit: 'contain',
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    ['>p']: {
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',

      ['&.name']: {
        ...theme.font.body14Semibold,
        color: theme.colors.sub_gray1,
      },
      ['&.date']: {
        ...theme.font.detail12Medium,
        color: theme.colors.sub_gray6,
      },
      ['&.diff']: {
        ...theme.font.detail12Medium,
        color: theme.colors.sub_gray6,
      },
    },
  },
});

const ColoredDiffLabel = styled.span(({ delta }: { delta: number }) => ({
  color: deltaToColor(delta) ?? theme.colors.sub_gray7,
}));

export { ExperimentItemContainer, ExperimentItemContent, ColoredDiffLabel };
