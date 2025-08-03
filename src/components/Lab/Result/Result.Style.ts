import styled from '@emotion/styled';
import { theme } from '@styles/themes';

export const ReportPreviewPlaceholder = styled.div`
  width: 100%;
  height: 240px;
  background-color: ${theme.colors.sub_gray11};
  border-radius: 8px;
  margin-top: 32px;
`;

export const Image = styled.img`
  width:100%;  
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  border-radius: 8px;
`;