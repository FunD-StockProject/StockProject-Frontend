import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import ProfileCircle from '@components/MyPage/ProfileCircle/ProfileCircle';
import { fetchUpdateUserImage } from '@controllers/auth/api';
import { theme } from '@styles/themes';
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

  const [profileImage, setProfileImage] = useState<string | null>(localStorage.getItem('profileImg'));
  const username = localStorage.getItem('username') ?? '아직 정보가 없어요!';
  const useremail = localStorage.getItem('useremail') ?? '로그인을 진행해주세요';

  const handleClickProfile = () => {
    if (!isLogin) {
      navigate(webPath.login());
    } else {
      navigate(webPath.editProfile());
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const fileType = file.type;

    if (!fileType.includes('image')) {
      alert(`해당 파일은 이미지 파일이 아닙니다.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const data = await fetchUpdateUserImage(reader.result as string);
      if (data) {
        setProfileImage(reader.result as string);
        localStorage.setItem('profileImg', reader.result as string);
      } else {
        alert('프로필 이미지 업데이트 실패');
      }
    };
  };

  const handleClickProfileImage = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (isLogin) {
      e.stopPropagation();
    }
  };

  return (
    <ProfileContainer onClick={handleClickProfile}>
      <ProfileCircle
        profileImage={profileImage ?? ProfilePNG}
        handleChangeFile={handleChangeFile}
        size="medium"
        canEdit={isLogin}
        handleClickCircle={handleClickProfileImage}
      />
      <ProfileContents>
        <p>{username}</p>
        <button>
          {useremail}
          <RightArrowThickSVG />
        </button>
      </ProfileContents>
    </ProfileContainer>
  );
};

export default MyPageProfile;
