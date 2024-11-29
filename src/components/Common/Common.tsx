import styled from '@emotion/styled';
import { media, theme, themeColor, themeFontSizeBody, themeTextType } from '../../styles/themes';
import { AbsoluteDivProps, ButtonDivProps, FlexDivProps, ImgDivProps } from './Common.Props';

const FlexDiv = styled.div(
  ({
    flexDirection = 'row',
    alignItems = 'normal',
    justifyContent = 'normal',
    padding = '0',
    width = 'auto',
    gap = '0',
  }: FlexDivProps) => ({
    display: 'flex',
    flexDirection: flexDirection,
    alignItems: alignItems,
    justifyContent: justifyContent,
    padding: padding,
    width: width,
    gap: gap,
  }),
);

const ButtonDiv = styled.div(
  ({ gap = '0', padding = '0', background, width = 'auto', height = 'auto', radius = 'auto' }: ButtonDivProps) => ({
    display: 'flex',
    padding: padding,
    background: theme.colors[background ?? 'transparent'],
    cursor: 'pointer',
    gap: gap,
    width: width,
    height: height,
    borderRadius: radius,
  }),
);

const RelativeDiv = styled.div({
  position: 'relative',
});

const AbsoluteDiv = styled.div(
  { position: 'absolute' },
  ({
    width = 'auto',
    height = 'auto',
    top = 'auto',
    bottom = 'auto',
    left = 'auto',
    right = 'auto',
  }: AbsoluteDivProps) => ({
    width: width,
    height: height,
    top: top,
    bottom: bottom,
    left: left,
    right: right,
  }),
);

const ImgDiv = styled.img(({ width = 'auto', height = 'auto', objectFit = 'contain' }: ImgDivProps) => ({
  width: width,
  height: height,
  objectFit: objectFit,
}));

const StyledSVG = ({
  svg,
  fill,
  stroke,
  type,
  size,
}: {
  svg: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  fill?: themeColor;
  stroke?: themeColor;
  type?: themeTextType;
  size?: themeFontSizeBody;
}) => {
  const SVG = styled(svg)({
    fill: fill ? theme.colors[fill] : 'current',
    stroke: stroke ? theme.colors[stroke] : 'current',
    width: 'auto',
    height: type ? (size ? theme.fontSize[type][size].Web : theme.fontSize[type].Medium.Web) : 'auto',
    [media[0]]: {
      height: type ? (size ? theme.fontSize[type][size].Mobile : theme.fontSize[type].Medium.Mobile) : 'auto',
    },
  });
  return <SVG />;
};

export { FlexDiv, ButtonDiv, RelativeDiv, AbsoluteDiv, ImgDiv, StyledSVG };
