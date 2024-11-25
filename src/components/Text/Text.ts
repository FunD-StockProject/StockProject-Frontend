import styled from '@emotion/styled';
import { TextBodyProps, TextDetailProps, TextDisplayProps, TextHeadingProps, TextTitleProps } from './Text.Props';
import { media, theme } from '../../styles/themes';

/**
 * TextHeading
 * @size Large : 66px / Medium : 50px / Small : 40px
 */
const TextDisplay = styled.p((props: TextDisplayProps) => ({
  fontSize: props.size ? theme.fontSize.Display[props.size]['Web'] : theme.fontSize.Display.Medium['Web'],
  [media[0]]: {
    fontSize: props.size ? theme.fontSize.Display[props.size]['Mobile'] : theme.fontSize.Display.Medium['Mobile'],
  },
  fontWeight: '700',
  lineHeight: '1.5',
  letterSpacing: '1px',
  color: theme.colors[props.color ?? 'danger'],
  margin: 0,
}));

/**
 * TextHeading
 * @size Large : 50px / Medium : 40px / Small : 32px
 */
const TextHeading = styled.p((props: TextHeadingProps) => ({
  fontSize: props.size ? theme.fontSize.Heading[props.size]['Web'] : theme.fontSize.Heading.Medium['Web'],
  [media[0]]: {
    fontSize: props.size ? theme.fontSize.Heading[props.size]['Mobile'] : theme.fontSize.Heading.Medium['Mobile'],
  },
  fontWeight: '700',
  lineHeight: '1.5',
  letterSpacing: '1px',
  color: theme.colors[props.color ?? 'danger'],
  margin: 0,
}));

/**
 * TextTitle
 * @size XXLarge : 32px / XLarge : 25px / Large : 21px / Medium : 19px / Small : 17px / XSmall : 15px
 */
const TextTitle = styled.p((props: TextTitleProps) => ({
  fontSize: props.size ? theme.fontSize.Title[props.size]['Web'] : theme.fontSize.Title.Medium['Web'],
  [media[0]]: {
    fontSize: props.size ? theme.fontSize.Title[props.size]['Mobile'] : theme.fontSize.Title.Medium['Mobile'],
  },
  fontWeight: '700',
  lineHeight: '1.5',
  letterSpacing: props.size == 'XXLarge' ? '1px' : '0px',
  color: theme.colors[props.color ?? 'danger'],
  margin: 0,
}));

/**
 * TextBody
 * @size Large : 19px / Medium : 17px / Small : 15px
 */
const Text = styled.p((props: TextBodyProps) => ({
  display: 'flex',
  fontSize: props.size ? theme.fontSize.Body[props.size]['Web'] : theme.fontSize.Body.Medium['Web'],
  [media[0]]: {
    fontSize: props.size ? theme.fontSize.Body[props.size]['Mobile'] : theme.fontSize.Body.Medium['Mobile'],
  },
  fontWeight: props.weight == 'Bold' ? '700' : '400',
  lineHeight: '1.5',
  letterSpacing: '0px',
  color: theme.colors[props.color ?? 'danger'],
  margin: 0,
}));

/**
 * TextDetail
 * @size Large : 17px / Medium : 15px / Small : 13px
 */
const TextDetail = styled.p((props: TextDetailProps) => ({
  fontSize: props.size ? theme.fontSize.Detail[props.size]['Web'] : theme.fontSize.Detail.Medium['Web'],
  [media[0]]: {
    fontSize: props.size ? theme.fontSize.Detail[props.size]['Mobile'] : theme.fontSize.Detail.Medium['Mobile'],
  },
  fontWeight: props.weight == 'Bold' ? '700' : '400',
  lineHeight: '1.5',
  letterSpacing: '0px',
  color: theme.colors[props.color ?? 'danger'],
  margin: 0,
  width: 'max-content',
}));

export { Text, TextDisplay, TextHeading, TextTitle, TextDetail };
