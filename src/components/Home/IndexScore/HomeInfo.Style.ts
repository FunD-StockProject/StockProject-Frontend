import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const HomeInfoContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '0 20px',
});

const HomeInfoScoreContainer = styled.div({
  display: 'flex',
  gap: '10px',
});

const HomeInfoScoreItemContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 12px',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  width: '100%',
});

const HomeInfoScoreItemHeader = styled.div({
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
    height: '16px',
    fill: theme.colors.sub_gray1,
  },
});

const HomeInfoScoreItemValue = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>p']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray1,
    },

    ['>svg']: {
      fill: deltaScoreToColor(delta) ?? theme.colors.sub_gray1,
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

const HomeInfoBannerContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 14px',
  background: theme.colors.sub_gray11,
  borderRadius: '4px',
  gap: '16px',

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray1,
    padding: '12px',
    background: theme.colors.sub_gray10,
    borderRadius: '999px',
    flexShrink: '0',
  },

  ['>div']: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        ...theme.font.body16Semibold,
        color: theme.colors.sub_gray3,
      },

      ['&.description']: {
        ...theme.font.body14Medium,
        color: theme.colors.sub_gray6,
        whiteSpace: 'nowrap',
      },
    },
  },
});

export {
  HomeInfoContainer,
  HomeInfoScoreContainer,
  HomeInfoScoreItemContainer,
  HomeInfoScoreItemHeader,
  HomeInfoScoreItemValue,
  HomeInfoBannerContainer,
};
