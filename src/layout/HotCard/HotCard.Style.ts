import styled from '@emotion/styled';

// 카드 컴포넌트 스타일
const StyledCard = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333; /* 배경색 검정 */
  color: white; /* 텍스트 색상 흰색 */
  padding: 10px 20px;
  border-radius: 8px;
  margin: 0px 5px 10px 5px;
  min-width: 480px;

  /* 이미지 스타일 */
  img {
    display: block;
    height: 100px;
  }

  /* 텍스트 정렬 */
  .text {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
`;

const StyledDivider = styled('div')`
  height: 60px; /* 세로줄 길이 */
  width: 6px; /* 세로줄 두께 */
  background-color: white; /* 세로줄 색상 */
  margin: 0 10px; /* 좌우 여백 */
`;

export { StyledCard, StyledDivider };
