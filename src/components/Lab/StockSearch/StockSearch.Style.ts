import styled from "@emotion/styled";
import { theme } from "@styles/themes";
import { keyframes } from '@emotion/react';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 1;
  }
  to {
    transform: translateY(0%);
    opacity: 1;
  }
`;

export const SearchModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${theme.colors.sub_black};
  z-index: 1000;
  padding: 20px 30px;
  box-sizing: border-box;
  overflow-y: auto;

  animation: ${slideUp} 0.5s ease-in-out;
`;

export const SearchKeywordSection = styled.div`
  padding: 24px 10px;
  color: ${theme.colors.sub_white};

`;
export const SearchTitle = styled.div`
  ${theme.font.body16Medium};
  margin-bottom: 12px;
`;

export const SearchKeywordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SearchKeywordItem = styled.div`
  ${theme.font.body16Semibold};
  color: ${theme.colors.sub_white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  padding: 4px 0;

  .index {
    color: ${theme.colors.sub_blue6};
    flex-shrink: 0;
    min-width: 20px;
    margin-right: 8px;
    font-weight: 600;
  }

  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1;
    max-width: 80%;
  }
`;

export const RightArrowSVGWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  color: ${theme.colors.sub_gray7};
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const SearchModalFooter = styled.div`
  width: 100%;
  background: ${theme.colors.sub_black};
  text-align: center;
`;

export const SearchModalButton = styled.button`
  ${theme.font.body18Semibold}
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 12px 24px;
  background: ${theme.colors.sub_blue6};
  color: ${theme.colors.sub_white};
  border: none;
  border-radius: 8px;
`;

export const SearchHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  padding: 0 0px;
  justify-content: center;
`;

export const CancelSVGWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.sub_gray4};
  svg {
    width: 18px;
    height: 18px;
  }
}  `;