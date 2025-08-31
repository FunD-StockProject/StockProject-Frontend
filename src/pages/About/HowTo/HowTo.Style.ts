import styled from '@emotion/styled';
import { deltaScoreToColor } from '@utils/ScoreConvert';
import { theme } from '@styles/themes';

const HowToContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: '28px 20px',
  background: theme.colors.sub_blue6,
});

const HowToTitle = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',

  ...theme.font.title20Semibold,
  color: theme.colors.sub_white,
  whiteSpace: 'nowrap',

  ['>svg']: {
    flexShrink: 0,
    height: '17px',
    width: 'auto',
  },
});

const HowToStepContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '11px 12px',
  background: theme.colors.sub_black,
  borderRadius: '8px',
});

const HowToStepTitle = styled.span({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  background: theme.colors.sub_white,
  padding: '4px 12px',
  marginRight: 'auto',
  borderRadius: '8px',

  ...theme.font.detail12Semibold,
  color: theme.colors.primary90,
});

const HowToStepContents = styled.div({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

const HowToStepDescriptionContainer = styled.div({
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const HowToStepDescriptionItem = styled.span({
  padding: '10px',
  wordBreak: 'keep-all',
  textAlign: 'center',
  borderRadius: '4px',
  border: `1px solid ${theme.colors.sub_gray7}`,

  ...theme.font.detail12Medium,
  color: theme.colors.sub_white,
});

// Step1

const Step1Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  marginBottom: '10px',
  background: 'rgba(255, 255, 255, 0.16)',
  flexGrow: 1,
  padding: '12px',
  borderRadius: '28px',

  ['>svg']: {
    position: 'absolute',
    top: '100%',
    right: '28px',
    height: '10px',
    fill: 'rgba(255, 255, 255, 0.16)',
  },

  ['>p']: {
    margin: '0',
    fontSize: '10px',
    fontWeight: '400',
    color: theme.colors.sub_white,
  },
});

const Step1SubContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '3px',
});

const Step1SubItem = styled.span({
  fontSize: '9px',
  fontWeight: '600',
  color: theme.colors.sub_black,
  background: theme.colors.sub_white,
  border: `1px solid ${theme.colors.sub_black}`,
  borderRadius: '999px',
  padding: '2px 4px',
  width: '32px',
  textAlign: 'center',
});

// Step2

const Step2Container = styled.div({
  flexGrow: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
});

const Step2Grid = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '100%',
  maxWidth: '150px',
});

const Step2Row = styled.div({
  display: 'flex',
  gap: '2px',
});

const Step2Item = styled.span(
  ({ delta }: { delta: number }) => ({
    ['>p']: {
      color: deltaScoreToColor(delta) ?? theme.colors.sub_black,
    },
  }),
  {
    fontSize: '10px',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    ['>p']: {
      margin: '0',
      background: theme.colors.sub_white,
      width: '100%',
      borderRadius: '999px',
      fontSize: '8px',
      fontWeight: '700',
    },

    ['&:not(:last-of-type)']: {
      ['::after']: {
        content: '"+"',
        display: 'block',
        color: theme.colors.sub_white,
        fontSize: '8px',
        marginLeft: '2px',
        fontWeight: '700',
      },
    },
  },
);

// Step3

const Step3Container = styled.div({
  flexGrow: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  padding: '0px 12px',

  ['>span']: {
    width: '1px',
    height: '10px',
    background: theme.colors.sub_blue5,
  },

  ['>p']: {
    margin: '0',
    background: theme.colors.sub_white,
    color: theme.colors.sub_black,
    fontSize: '10px',
    textAlign: 'center',
    borderRadius: '999px',

    ['&.message']: {
      padding: '4px',
      fontWeight: '700',
      width: '100%',
    },
    ['&.result']: {
      padding: '2px 4px',
      fontWeight: '400',
      width: '48px',
    },
  },
});

// Step4

const Step4Container = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  alignItems: 'center',
  flexGrow: 1,

  ['>svg']: {
    position: 'absolute',
    width: '100%',
    transform: 'translateY(-50%)',
  },
});

export {
  HowToContainer,
  HowToTitle,
  HowToStepContainer,
  HowToStepTitle,
  HowToStepContents,
  HowToStepDescriptionContainer,
  HowToStepDescriptionItem,
  Step1Container,
  Step1SubContainer,
  Step1SubItem,
  Step2Container,
  Step2Grid,
  Step2Row,
  Step2Item,
  Step3Container,
  Step4Container,
};
