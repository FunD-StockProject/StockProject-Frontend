import styled from '@emotion/styled';
import theme from '../../styles/themes';
import { TextBodyProps, TextDetailProps, TextDisplayProps, TextHeadingProps, TextTitleProps } from './Text.Props';

/**
 * TextHeading
 * @size Large : 66px / Medium : 50px / Small : 40px
 */
const TextDisplay = styled.p((props: TextDisplayProps) => ({
  fontSize: props.size ? theme.fontSize.Display[props.size] : theme.fontSize.Display.Medium,
  fontWeight: '700',
  lineHeight: '1.5',
  letterSpacing: '1px',
  color: props.color ? theme.colors[props.color] : '#000000',
  margin: 0,
}));

/**
 * TextHeading
 * @size Large : 50px / Medium : 40px / Small : 32px
 */
const TextHeading = styled.p((props: TextHeadingProps) => ({
  fontSize: props.size ? theme.fontSize.Heading[props.size] : theme.fontSize.Heading.Medium,
  fontWeight: '700',
  lineHeight: '1.5',
  letterSpacing: '1px',
  color: props.color ? theme.colors[props.color] : '#000000',
  margin: 0,
}));

/**
 * TextTitle
 * @size XXLarge : 32px / XLarge : 25px / Large : 21px / Medium : 19px / Small : 17px / XSmall : 15px
 */
const TextTitle = styled.p((props: TextTitleProps) => ({
  fontSize: props.size ? theme.fontSize.Title[props.size] : theme.fontSize.Title.Medium,
  fontWeight: '700',
  lineHeight: '1.5',
  letterSpacing: props.size == 'XXLarge' ? '1px' : '0px',
  color: props.color ? theme.colors[props.color] : '#000000',
  margin: 0,
}));

/**
 * TextBody
 * @size Large : 19px / Medium : 17px / Small : 15px
 */
const Text = styled.p((props: TextBodyProps) => ({
  display: 'flex',
  fontSize: props.size ? theme.fontSize.Body[props.size] : theme.fontSize.Body.Medium,
  fontWeight: props.weight == 'Bold' ? '700' : '400',
  lineHeight: '1.5',
  letterSpacing: '0px',
  color: props.color ? theme.colors[props.color] : '#000000',
  margin: 0,
}));

/**
 * TextDetail
 * @size Large : 17px / Medium : 15px / Small : 13px
 */
const TextDetail = styled.p((props: TextDetailProps) => ({
  fontSize: props.size ? theme.fontSize.Detail[props.size] : theme.fontSize.Detail.Medium,
  fontWeight: props.weight == 'Bold' ? '700' : '400',
  lineHeight: '1.5',
  letterSpacing: '0px',
  color: props.color ? theme.colors[props.color] : '#000000',
  margin: 0,
  width: 'max-content',
}));

export { Text, TextDisplay, TextHeading, TextTitle, TextDetail };
