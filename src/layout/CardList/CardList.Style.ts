import styled from '@emotion/styled';

const NoScrollbar = styled('div')`
  padding: 10px;
  border-radius: 10px;
  position: relative;
  & .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  & .react-horizontal-scrolling-menu--scroll-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
    width: 100%;
    height: auto;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-direction: row;
  }
  & .react-horizontal-scrolling-menu--arrow-left {
    position: absolute;
    top: 50%;
    left: -40px;
  }
  & .react-horizontal-scrolling-menu--arrow-right {
    position: absolute;
    top: 50%;
    right: -40px;
  }
`;

const ArrowButton = styled('button')`
  cursor: pointer;
  display: flex;
  margin: 0 5px; /* 좌우 간격 조정 */
  opacity: ${(props) => (props.disabled ? 0 : 1)};
  user-select: none;
  border-radius: 6px;
  border-width: 1px;
  padding: 10px; /* 버튼 크기 조정 */
  background-color: #2e2e2e; /* 버튼 색상 */
  color: white;
`;

export { NoScrollbar, ArrowButton };
