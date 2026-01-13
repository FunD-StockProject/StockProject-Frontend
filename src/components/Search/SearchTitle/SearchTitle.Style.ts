import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { media, theme } from '@styles/themes';

export const SearchTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0px 20px',

  color: theme.colors.grayscale30,
  background: theme.colors.primary100,

  [media[0]]: {
    gap: '12px',
  },
});

export const SearchTitleHeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',

  fontWeight: '700',
  fontSize: '42px',
  lineHeight: '1',
  color: theme.colors.transparent,

  [media[0]]: {
    fontSize: '32px',
  },

  ['>p.price']: {
    ...theme.font.heading24Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },
});

export const SearchTitleHeaderText = styled.div({
  ...theme.font.heading24Semibold,
  position: 'relative',

  overflow: 'hidden',
  boxSizing: 'content-box',

  textWrap: 'nowrap',
  textOverflow: 'ellipsis',
});

export const SearchTitleHeaderTextAnimated = styled(motion.div)({
  willChange: 'transform',
  position: 'absolute',
  top: '0',

  color: theme.colors.primary0,
});

//

export const SearchTitleDetailContainer = styled.div(
  ({ delta }: { delta: number }) => ({
    ['>span.price-diff']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_gray7,
    },
  }),
  {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    ['>span']: {
      ...theme.font.body14Medium,

      ['&.market-code']: {
        color: theme.colors.sub_gray4,
      },
    },

    ['>*']: {
      display: 'flex',
      alignItems: 'center',
      ['&:not(:last-of-type)']: {
        ['::after']: {
          content: '""',
          display: 'block',
          width: '1px',
          height: '12px',
          background: theme.colors.sub_gray6,
          marginLeft: '8px',
        },
      },
    },
  },
);

export const SearchTitleDetailSymbol = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',

  ['>p']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray4,
    margin: '0',
  },

  ['>img']: {
    height: '13px',
  },
});

// export const SearchTitleDescriptionContainer = styled.div(
//   ({ showMoreDesc }: { showMoreDesc: boolean }) => ({
//     WebkitLineClamp: showMoreDesc ? '' : '2',
//     ['>button']: {
//       display: showMoreDesc ? 'none' : 'block',
//     },
//   }),
//   {
//     overflow: 'hidden',
//     WebkitBoxOrient: 'vertical',
//     display: '-webkit-box',

//     ['>p']: {
//       ...theme.font.body14Medium,
//       color: theme.colors.sub_gray4,
//       margin: '0',
//       whiteSpace: 'pre-line',
//     },

//     ['>button']: {
//       ...theme.font.body14Medium,
//       color: theme.colors.sub_gray4,
//       float: 'right',
//       marginTop: '21px',
//       marginRight: '8px',
//       padding: '0px',
//       background: 'none',
//       border: 'none',
//       shapeOutside: 'border-box',
//     },
//   },
// );
