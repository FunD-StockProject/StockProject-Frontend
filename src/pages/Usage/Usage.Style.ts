import styled from '@emotion/styled';

const UsageContainer = styled.div`
  position: relative;
  height: 100vh;
  padding: 20px;
`;

const BackButton = styled.img`
  position: absolute;
  top: 16px;
  left: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  margin-top: 50px;
  text-align: center;
`;

export { UsageContainer, BackButton, Content };
