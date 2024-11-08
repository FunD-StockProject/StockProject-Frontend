import React, { ReactNode } from 'react';
import { LayoutProps } from '../ts/Types';
import styled from '@emotion/styled';

// const StyledTextComponent = styled.p({
//   fontSize: '1rem',
//   fontWeight: '400',
// });

// const Large = styled(StyledTextComponent)((props: TextComponentProps) => ({
//   fontSize: props.fontSize ?? '66px',
//   fontWeight: props.fontWeight ?? '700',
// }));

// const Display = {
//   Large: Large,
//   Medium: StyledTextComponent,
//   // Small:,
// } as const;

// type Display = (typeof Display)[keyof typeof Display];

// const Text = {
//   Display: Display,
//   // Heading: Heading,
//   // Title: Title,
//   // Body: Body,
//   // Detail: Detail,
//   // Label: Label,
//   // Links: Links,
// } as const;

// type Text = (typeof Text)[keyof typeof Text];

interface TextStyleType {
  size?: string;
  mobileSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  letterSpacing?: string;
}

const Display = {
  Large: {
    size: '66px',
    mobileSize: '40px',
    fontWeight: '700',
    lineHeight: '1.5',
    letterSpacing: '1px',
  },
  // Medium: StyledTextComponent,
  // Small:,
} as const;

type Display = (typeof Display)[keyof typeof Display];

const TextType = {
  Display: Display,
} as const;

type TextType = (typeof TextType)[keyof typeof TextType];

interface TextProps {
  textType?: string;
}

const Text = styled.p((props: TextProps) =>
  props.textType
    ? {}
    : {
        // fontSize: props.fontSize ?? '1rem',
      },
);

// const a:TextType = Display.Large

export default Text;
