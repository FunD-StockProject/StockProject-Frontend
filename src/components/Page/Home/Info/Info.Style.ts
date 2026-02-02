import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const InfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '0 20px',
});

const InfoScoreContainer = styled.div({
  display: 'flex',
  gap: '10px',
});

const InfoScoreItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 12px',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  width: '100%',
});

const InfoScoreItemTitle = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ['>p']: {
    margin: '0',
    ...theme.font.body16Semibold,
    color: theme.colors.sub_gray1,
    whiteSpace: 'nowrap',
  },

  ['>svg']: {
    width: '16px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray1,
    cursor: 'pointer',
  },
});

const InfoScoreItemValue = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray1,
    },

    ['>svg']: {
      fill: deltaToColor(delta) ?? theme.colors.sub_gray1,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',

    ['>p']: {
      margin: '0',
      ...theme.font.title20Semibold,
      whiteSpace: 'nowrap',
    },

    ['>svg']: {
      width: '10px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

export { InfoContainer, InfoScoreContainer, InfoScoreItemContainer, InfoScoreItemTitle, InfoScoreItemValue };
