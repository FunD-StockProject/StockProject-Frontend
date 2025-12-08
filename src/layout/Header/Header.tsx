import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';

const HeaderContainer = styled.div({
  paddingBottom: '8px',
  borderBottom: `4px solid ${theme.colors.sub_gray11}`,
});

const HeaderContents = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '8px 20px',
  gap: '12px',

  ['>svg']: {
    width: '32px',
    height: 'auto',
    aspectRatio: '1 / 1',
    cursor: 'pointer',
    fill: theme.colors.sub_gray5,
  },

  ['>p']: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    ...theme.font.body18Semibold,
    color: theme.colors.sub_white,
    margin: '0',
  },
});

const Header = ({ location, onBefore }: { location: string; onBefore?: () => void }) => {
  const navigate = useNavigate();

  const headerTitle = {
    [webPath.register()]: '회원가입',
    [webPath.registerDone()]: '회원가입',
    [webPath.editProfile()]: '내 정보 수정',
    [webPath.editeProfileDone()]: '내 정보 수정',
    [webPath.about()]: '인간지표란?',
    [webPath.callbackKakao()]: '로그인',
    [webPath.usage()]: 'PWA 사용방법',
    [webPath.notification()]: '알림',
    [webPath.labRecordSheet()]: '매수 기록지',
    ['searchBar']: '검색',
    ['labTutorial']: '실험실 소개',
    ['labPurchase']: '포트폴리오 생성하기',
  };

  const handleBefore = () => {
    if (onBefore) {
      onBefore();
    } else {
      navigate(-1);
    }
  };

  if (!headerTitle[location]) return null;

  return (
    <HeaderContainer>
      <HeaderContents>
        <ArrowLeftSVG onClick={handleBefore} />
        <p>{headerTitle[location]}</p>
      </HeaderContents>
    </HeaderContainer>
  );
};

export default Header;
