import styled from '@emotion/styled';

// 추후 분리
const width = Math.min(600, window.innerWidth);

// 카드 컴포넌트 스타일
const StyledCard = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #333; /* 배경색 검정 */
  color: white; /* 텍스트 색상 흰색 */
  padding: 10px 20px;
  border-radius: 8px;
  margin: 0px 5px 10px 5px;
  width: ${width - 120}px;

  /* 이미지 스타일 */
  img {
    display: block;
    height: ${width / 6}px;
  }

  /* 텍스트 정렬 */
  .text {
    font-size: 1em;
    font-weight: bold;
    text-align: center;
  }
`;

const StyledDivider = styled('div')`
  height: ${width / 10}px; /* 세로줄 길이 */
  width: ${width / 100}px; /* 세로줄 두께 */
  background-color: white; /* 세로줄 색상 */
  margin: 0 10px; /* 좌우 여백 */
`;

export { StyledCard, StyledDivider };
