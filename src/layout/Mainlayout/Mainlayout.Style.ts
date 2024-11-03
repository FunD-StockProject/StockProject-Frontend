import styled from '@emotion/styled';

const layoutWidth = Math.min(600, window.innerWidth);
// 추후에 반응형 수정
const StyledMainlayout = styled('div')`
  text-align: center;
  width: ${layoutWidth}px;
`;

export { StyledMainlayout };
