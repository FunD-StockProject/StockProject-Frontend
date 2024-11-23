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
    line-height: 1;
  }
`;

const StyledScore = styled(`div`)<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  color: white;
  font-size: 1em;
  padding: 10px 20px;
  border-radius: 40px;
`;

const StyledChangedScore = styled(`span`)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 0.5em;
  padding: 2.5px;
  vertical-align: middle;

  img {
    width: 1em; /* 텍스트 크기에 맞춤 */
    // height: auto;
    // margin-left: 4px; /* 텍스트와 이미지 사이 간격 */
  }
`;

export { StyledCard, StyledScore, StyledChangedScore };
