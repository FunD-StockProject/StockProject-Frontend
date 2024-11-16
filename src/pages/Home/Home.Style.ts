import styled from '@emotion/styled';

const width = Math.min(600, window.innerWidth);

const StyledHome = styled('div')`
  width: ${window.innerWidth}px;
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  justify-content: center; /* 세로 방향 중앙 정렬 */
  align-items: center; /* 가로 방향 중앙 정렬 */
  padding-bottom: 100px;
`;

const StyledContainer = styled('div')`
  width: ${width}px;
`;

const StyledImage = styled('img')`
  padding: 10px 10px;
  width: 40%;
`;

const StyleTabMenu = styled('ul')`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin: 0px;
  padding-inline-start: 0px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px 0px;
    font-size: 15px;
    font-weight: bold;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: black;
    color: white;
  }
`;

export { StyledHome, StyledContainer, StyledImage, StyleTabMenu };
