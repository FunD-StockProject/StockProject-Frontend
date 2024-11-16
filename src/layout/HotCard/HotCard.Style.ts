import styled from '@emotion/styled';

// 추후 분리
const width = Math.min(600, window.innerWidth);

const StyledTitle = styled('h3')`
  padding: 0px 20px;
`;
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
  height: 50%;
  width: ${width - 120}px;
  gap: 10px;

  & > * {
    width: ${width / 6}px;
    height: 80%;
    flex: 1;
    border: 1px solid white;
    border-radius: 12px;
    text-align: center;
  }
`;

const StyledImage = styled('img')`
  height: 100%;
  // display: flex;
`;

const StyledText = styled('div')`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%; /* 부모 요소의 높이를 모두 차지 */
  padding: 10px 0; /* 상하 간격 조정 */
`;

export { StyledTitle, StyledCard, StyledImage, StyledText };
