import styled from '@emotion/styled';
import { media, theme, themeColor, themeFontSizeBody, themeTextType } from '../../styles/themes';

export { FlexDiv, ButtonDiv, RelativeDiv, AbsoluteDiv, ImgDiv, Container } from './Common.Style';

export const StyledSVG = ({
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
