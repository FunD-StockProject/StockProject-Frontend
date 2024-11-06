import styled from '@emotion/styled';

const StyledCard = styled('div')`
  background-color: white;
  margin: 0px 5px 10px 5px;
  border: 1px solid black;
  border-radius: 12%;
  overflow: hidden;
  display: inline-block;
  /* 이미지 스타일 */
  img {
    display: block;
    // width: 60px; /* 이미지 너비 */
    height: 100px;
    width: 100px;
    // margin-right: 20px; /* 텍스트와의 간격 */
  }
`;

export { StyledCard };
