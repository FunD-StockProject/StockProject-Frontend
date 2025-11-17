import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { STOCK_COUNTRIES, StockCountryKey } from '@ts/StockCountry';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';
import LabResultPNG from '@assets/lab/lab-result.png';

const LabDone = () => {
  const navigate = useNavigate();

  const handleClickEscape = () => {
    navigate(webPath.lab());
  };

  return (
    <LabDoneContainer>
      <LabDoneTitleContainer>
        <p className="title">
          모의 매수 성공!🎉
          <br />
          5영업일 뒤, 결과를 알려드릴게요!
        </p>
        <p className="desc">모의매수한 종목은 언제든, 실험실 홈에서 언제든 변경할 수 있어요!</p>
      </LabDoneTitleContainer>
      <img src={LabResultPNG} />
      <LabTutorialButtonContainer>
        <button onClick={handleClickEscape}>매수현황 보러가기</button>
      </LabTutorialButtonContainer>
    </LabDoneContainer>
  );
};

const LabTutorialButtonContainer = styled.div({
  display: 'flex',
  gap: '12px',
  marginTop: 'auto',

  ['>button']: {
    width: '100%',
    padding: '10px 0px',
    ...theme.font.body18Semibold,
    margin: '0',
    border: 'none',
    borderRadius: '8px',

    [':first-of-type']: {
      background: theme.colors.sub_gray11,
      color: theme.colors.sub_gray5,
    },

    [':last-of-type']: {
      background: theme.colors.sub_blue6,
      color: theme.colors.sub_white,

      ['&:disabled']: {
        background: theme.colors.sub_gray8,
        color: theme.colors.sub_black,
      },
    },
  },
});

const LabDoneTitleContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.desc']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const LabDoneContainer = styled.div({
  padding: '32px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  flexGrow: '1',

  ['>span.divider']: {
    height: '4px',
    width: '100%',
    background: theme.colors.sub_gray11,
  },

  ['>img']: {
    borderRadius: '8px',
    margin: '20px 0',
  },
});

export default LabDone;
