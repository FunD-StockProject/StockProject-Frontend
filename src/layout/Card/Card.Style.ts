import styled from '@emotion/styled';

const width = Math.min(600, window.innerWidth);

const StyledCard = styled('div')`
  margin: 0px 5px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column; /* 세로 방향으로 배치 */
  width: ${(width - 60) / 3}px;
  height: 240px;

  img {
    flex: 3;
    width: 100%; /* 가로 너비를 부모에 맞춤 */
    object-fit: cover; /* 이미지의 크기 비율을 유지하며 영역을 채움 */
  }

  & > * {
    flex: 2;
    background-color: white;
    color: black;
    text-align: center;
    font-size: 1em;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border: none; /* 불필요한 border 제거 */
    padding: 0; /* padding 제거 */
    margin: 0; /* margin 제거 */
    line-height: 1;
  }
`;

const StyledScore = styled(`div`)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: white;
  font-size: 0.5em;
  padding: 5px 10px;
  border-radius: 50px;
`;

export { StyledCard, StyledScore };
