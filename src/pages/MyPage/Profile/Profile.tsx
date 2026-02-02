import useAuthInfo from '@hooks/useAuthInfo';
import useRouter from '@router/useRouter';
import ProfileCircle from '@components/MyPage/ProfileCircle/ProfileCircle';
import { fetchUpdateUserImage } from '@controllers/auth/api';
import ProfilePNG from '@assets/profile.png';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';
import { ProfileContainer, ProfileContents } from './Profile.Style';

const MyPageProfile = () => {
  const { navToEditProfile } = useRouter();
  const { isLogin, userInfo, handleNavigateLogin, setUserInfo } = useAuthInfo();

  const username = userInfo?.nickname ?? '아직 정보가 없어요!';
  const useremail = userInfo?.email ?? '로그인을 진행해주세요';

  const handleClickProfile = () => {
    if (!isLogin) {
      handleNavigateLogin();
    } else {
      navToEditProfile();
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
        setUserInfo({ profileImage: reader.result as string });
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
        profileImage={userInfo?.profileImage ?? ProfilePNG}
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
