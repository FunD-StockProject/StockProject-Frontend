import styled from '@emotion/styled';

const width = Math.min(600, window.innerWidth);

const StyledHome = styled('div')`
  width: ${window.innerWidth}px;
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  justify-content: center; /* 세로 방향 중앙 정렬 */
  align-items: center; /* 가로 방향 중앙 정렬 */
`;

const StyledContainer = styled('div')`
  width: ${width}px;
`;

const StyledHeader = styled('div')`
  text-align: left;
`;

const StyledTitle = styled('span')`
  padding: 16px 16px 16px 10px;
  // text-align: left;
  font-weight: bold;
`;

const StyledImage = styled('img')`
  padding: 10px 15px;
`;

const StyleTabMenu = styled('ul')`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  // margin-top: 10px;
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

export { StyledHome, StyledContainer, StyledHeader, StyledTitle, StyledImage, StyleTabMenu };
