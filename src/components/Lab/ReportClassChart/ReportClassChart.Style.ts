import styled from '@emotion/styled';
import { theme } from '@styles/themes';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
});

const Content = styled.div({
  width: '100%',
  height: '200px',
  position: 'relative',

  ['>canvas']: {
    width: '100%',
    height: '100%',
  },
});

const TooltipLine = styled.span(
  ({ successRate }: { successRate: number }) => ({
    left: `${((1 + (successRate / 100) * 20) / 22) * 100}%`,
  }),
  {
    position: 'absolute',
    top: '0',
    bottom: '0',
    transform: 'translateX(-50%)',
    width: '2px',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.12)',
    backgroundImage: `linear-gradient(to bottom, ${theme.colors.sub_white}80 0px, ${theme.colors.sub_blue7} 100%)`,
    maskImage: `repeating-linear-gradient(to bottom, #FFFFFF, #FFFFFF 3px, transparent 3px, transparent 6px)`,
    webkitMaskImage: `repeating-linear-gradient(to bottom, #FFFFFF, #FFFFFF 3px, transparent 3px, transparent 6px)`,
  },
);

const TooltipContainer = styled.div(
  ({ successRate, width }: { successRate: number; width: number }) => {
    return {
      left: `clamp(calc(0% + ${width / 2}px), ${successRate}%, calc(100% - ${width / 2}px))`,
    };
  },
  {
    position: 'absolute',
    top: '0',
    color: theme.colors.sub_white,
    transform: `translateX(-50%)`,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 16px',
    background: 'rgba(255, 255, 255, 0.12)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '999px',
    whiteSpace: 'nowrap',

    ['>p']: {
      margin: '0',

      ['&.title']: {
        ...theme.font.detail12Semibold,
        color: theme.colors.sub_gray4,

        ['>b']: {
          ...theme.font.detail12Semibold,
          color: theme.colors.sub_white,
        },
      },

      ['&.description']: {
        ...theme.font.detail10Medium,
        color: theme.colors.sub_gray4,
      },
    },
  },
);

const IndexContainer = styled.div({
  display: 'flex',

  ['>span']: {
    ...theme.font.body14Medium,
    color: theme.colors.sub_gray6,
    width: '100%',
    textAlign: 'center',
  },
});

export { Container, Content, TooltipLine, TooltipContainer, IndexContainer };
