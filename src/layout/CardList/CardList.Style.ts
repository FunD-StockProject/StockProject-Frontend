import styled from '@emotion/styled';

const NoScrollbar = styled('div')`
  padding: 10px;
  border-radius: 10px;

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
`;

export { NoScrollbar };
