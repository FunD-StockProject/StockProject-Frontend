import styled from '@emotion/styled';
import { useNavigate } from 'react-router';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';
import LabResultPNG from '@assets/lab/lab-result.png';

const MockPurchaseContainer = styled.div({
  paddingTop: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '36px',
  flexGrow: '1',
  padding: '32px 20px',

  ['>img']: {
    borderRadius: '8px',
  },
});

const MockPurchaseTextGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',

  ['>p']: {
    margin: '0',

    ['&.title']: {
      ...theme.font.title20Semibold,
      color: theme.colors.sub_white,
    },

    ['&.subtitle']: {
      ...theme.font.body14Medium,
      color: theme.colors.sub_gray6,
    },
  },
});

const MockPurchaseButtonContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: 'auto',

  ['>button']: {
    ...theme.font.body16Medium,
    color: theme.colors.sub_white,

    padding: '10px 0px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',

    ['&.primary']: {
      background: theme.colors.sub_blue6,
    },

    ['&.secondary']: {
      background: theme.colors.sub_gray7,
    },
  },
});

const MockPurchase = () => {
  const navigate = useNavigate();

  const handleClickPrimary = () => {
    navigate(webPath.lab, { replace: true });
  };

  const handleClickSecondary = () => {
    navigate(-1);
  };

  return (
    <MockPurchaseContainer>
      <MockPurchaseTextGroup>
        <p className="title">
          모의 매수 성공! 🎉 <br />
          5영업일 뒤, 결과를 알려드릴께요!
        </p>
        <p className="subtitle">
          모의매수한 종목은 언제든, <br />
          실험실 홈에서 언제든 변경할 수 있어요!
        </p>
      </MockPurchaseTextGroup>
      <img src={LabResultPNG} />
      <MockPurchaseButtonContainer>
        <button className="primary" onClick={handleClickPrimary}>
          매수현황 보러가기
        </button>
        <button className="secondary" onClick={handleClickSecondary}>
          닫기
        </button>
      </MockPurchaseButtonContainer>
    </MockPurchaseContainer>
  );
};

export default MockPurchase;
