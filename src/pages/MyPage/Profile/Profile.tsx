import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { theme } from '@styles/themes';
import EditCircleSVG from '@assets/edit_circle.svg?react';
import ProfilePNG from '@assets/profile.png';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';

const ProfileContainer = styled.div({
  background: 'linear-gradient(180deg, #3457FD 0%, #5270FF 100%)',
  display: 'flex',
  alignItems: 'end',
  padding: '25dvh 24px 24px',
  boxSizing: 'border-box',
  gap: '12px',
});

const ProfileImage = styled.div({
  position: 'relative',
  width: '64px',
  height: 'auto',
  aspectRatio: '1 / 1',
  display: 'flex',

  ['>img']: {
    width: '100%',
    height: '100%',
  },

  ['>svg']: {
    position: 'absolute',
    fill: '#ADB5BD',
    background: '#495057',
    borderRadius: '999px',
    width: '20px',
    height: 'auto',
    aspectRatio: '1 / 1',
    bottom: '0',
    right: '0',
  },
});

const ProfileContents = styled.div({
  gap: '4px',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',

  ['>p']: {
    margin: '0',
    ...theme.font.title20Semibold,
    color: theme.colors.sub_white,
  },

  ['>button']: {
    display: 'flex',
    gap: '6px',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    padding: '0',

    ...theme.font.body16Medium,
    color: theme.colors.sub_blue1,

    ['>svg']: {
      width: '28px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },
  },
});

const MyPageProfile = () => {
  const navigate = useNavigate();
  const isLogin = !!localStorage.getItem('access_token');

  const profileImg = localStorage.getItem('profileImg');
  const username = localStorage.getItem('username') ?? '아직 정보가 없어요!';
  const useremail = localStorage.getItem('useremail') ?? '로그인을 진행해주세요';

  const handleLogin = () => {
    navigate(webPath.login());
  };

  return (
    <ProfileContainer>
      <ProfileImage>
        <img src={profileImg ?? ProfilePNG} />
        {isLogin && <EditCircleSVG />}
      </ProfileImage>
      <ProfileContents>
        <p>{username}</p>
        <button onClick={handleLogin}>
          {useremail}
          <RightArrowThickSVG />
        </button>
      </ProfileContents>
    </ProfileContainer>
  );
};

export default MyPageProfile;
