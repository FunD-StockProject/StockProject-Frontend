import styled from '@emotion/styled';
import { deltaToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const FavoritesContainer = styled.div({
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 20px 40px',
  gap: '12px',
  boxSizing: 'border-box',
  overflow: 'hidden',
});

const FavoritesTitleContainer = styled.div({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Semibold,
    color: theme.colors.sub_white,
  },

  ['>svg']: {
    fill: theme.colors.sub_gray6,
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
  },
});

const FavoritesEmptyContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',

  ['>img']: {
    width: '100%',
    height: '120px',
    objectFit: 'contain',
    background: theme.colors.sub_gray11,
    borderRadius: '10px',
    padding: '40px 0px',
  },

  ['>button']: {
    display: 'flex',
    gap: '10px',
    padding: '12px 20px',
    background: theme.colors.sub_gray2,
    alignItems: 'center',
    outline: 'none',
    border: 'none',
    borderRadius: '10px',
    justifyContent: 'center',

    ['>svg']: {
      width: '24px',
      height: 'auto',
      aspectRatio: '1 / 1',
      fill: theme.colors.sub_black,
    },
    ['>p']: {
      margin: '0',
      ...theme.font.body18Semibold,
      color: theme.colors.sub_black,
    },
  },
});

const FavoritesContents = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',

  ['>p']: {
    margin: '0',
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
  },
});

const FavoritesListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const FavoritesItemContainer = styled.label({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  boxSizing: 'border-box',

  ['>input[type="checkbox"]']: {
    display: 'none',
  },

  ['>svg']: {
    stroke: 'transparent',
    width: '18px',
    height: 'auto',
    aspectRatio: '1 / 1',
    borderRadius: '2px',
    border: '2px solid #525658',
    boxSizing: 'border-box',
    flexShrink: '0',
  },

  ['> input[type="checkbox"]:checked + svg']: {
    border: 'none',
    background: '#F6F6F6',
    stroke: '#101010',

    ['>svg']: {
      display: 'block',
    },
  },

  ['>div']: {
    width: '100%',
    boxSizing: 'border-box',
    background: theme.colors.sub_gray11,
    borderRadius: '10px',
    padding: '20px',
    gap: '10px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    ['>div.title']: {
      display: 'flex',

      ['>p']: {
        margin: '0',
        ...theme.font.title20Semibold,
        color: theme.colors.sub_white,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
      },
    },

    ['>div.sub']: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
  },
});

const FavoritesItemBellContainer = styled.div(
  ({ isActive }: { isActive?: boolean }) => ({
    ['>svg']: {
      fill: isActive ? theme.colors.sub_blue6 : theme.colors.sub_gray9,
    },
  }),
  {
    ['>svg']: {
      flexShrink: '0',
      width: '30px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
);

const FavoritesItemSubtextContainer = styled.p(
  ({ delta }: { delta: number }) => ({
    ['>span']: {
      color: deltaToColor(delta) ?? theme.colors.sub_gray1,
    },
  }),
  {
    margin: '0',
    display: 'flex',
    gap: '6px',
    ...theme.font.body16Medium,
    color: theme.colors.sub_gray4,
    alignItems: 'center',

    ['>span']: {
      ...theme.font.body14Semibold,
    },
  },
);

const FavoritesAddButtonContainer = styled.div({
  display: 'flex',
  gap: '10px',
  padding: '12px 20px',
  background: theme.colors.sub_gray11,
  alignItems: 'center',
  outline: 'none',
  border: 'none',
  borderRadius: '10px',
  justifyContent: 'center',

  ['>p']: {
    margin: '0',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_gray6,
  },

  ['>svg']: {
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: theme.colors.sub_gray6,
  },
});

const FavoritesDeleteButton = styled.button({
  position: 'fixed',
  bottom: 'calc(96px + 24px)',
  left: '20px',
  right: '20px',
  borderRadius: '10px',
  padding: '10px 0px',
  border: 'none',
  background: theme.colors.sub_gray1,
  ...theme.font.body18Semibold,
  color: theme.colors.sub_black,
});

export {
  FavoritesContainer,
  FavoritesTitleContainer,
  FavoritesEmptyContainer,
  FavoritesContents,
  FavoritesListContainer,
  FavoritesItemContainer,
  FavoritesItemBellContainer,
  FavoritesItemSubtextContainer,
  FavoritesAddButtonContainer,
  FavoritesDeleteButton,
};
