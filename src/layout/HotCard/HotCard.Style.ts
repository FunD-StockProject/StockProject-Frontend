import styled from '@emotion/styled';

// 추후 분리
const width = Math.min(600, window.innerWidth);

const StyledContainer = styled(`div`)`
  height: 200px;
  width: ${width - 60}px;
  margin: 0px 5px;
  border-radius: 10px;
  // background-color: white;
  background-color: #1d1e1f;
`;
const StyledTitle = styled('h2')`
  padding: 10px 0px 0px 10px;
  margin: 5px;
`;
// 카드 컴포넌트 스타일
const StyledCard = styled('div')`
  display: flex;
  // align-items: center;
  align-items: stretch;
  justify-content: space-around;
  // background-color: #333; /* 배경색 검정 */
  color: white; /* 텍스트 색상 흰색 */
  padding: 10px;
  border-radius: 8px;
  height: 60%;
  gap: 10px;

  & > * {
    width: 30%;
    height: 100%;
    flex: 1;
    border: 1px solid white;
    border-radius: 12px;
    text-align: center;
  }
`;

const StyledImage = styled('img')`
  object-fit: cover;
`;

const StyledText = styled('div')`
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  width: 100%; /* 부모 요소의 높이를 모두 차지 */
  // padding: 10px 0; /* 상하 간격 조정 */
`;

export { StyledContainer, StyledTitle, StyledCard, StyledImage, StyledText };
