import styled from '@emotion/styled';

// 추후에 반응형 수정
const StyledHeader = styled('div')`
  text-align: left;
`;

const StyledTitle = styled('span')`
  padding: 16px 16px 16px 10px;
  // text-align: left;
  font-weight: bold;
`;

const Styledtext = styled('span')`
  float: right;
`;

const StyleTabMenu = styled('ul')`
  background-color: lightgrey;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  margin-top: 10px;
  padding-inline-start: 0px;

  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    justify-content: center;
    flex: 1;
    // width: calc(100% / 1);
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    background-color: white;
    color: black;
  }
`;

export { StyledHeader, StyledTitle, Styledtext, StyleTabMenu };
