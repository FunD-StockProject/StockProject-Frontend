import useAuthInfo from '@hooks/useAuthInfo';
import useRouter from '@router/useRouter';
import ProfileCircle from '@components/MyPage/ProfileCircle/ProfileCircle';
import ProfilePNG from '@assets/profile.png';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';
import { ProfileContainer, ProfileContents } from './Profile.Style';

const MyPageProfile = () => {
  const { navToEditProfile } = useRouter();
  const { isLogin, userInfo, handleNavigateLogin } = useAuthInfo();

  const username = userInfo?.nickname ?? '아직 정보가 없어요!';
  const rawEmail = userInfo?.email;
  const useremail = rawEmail && !rawEmail.endsWith('@apple.local') ? rawEmail : null;

  const handleClickProfile = () => {
    if (!isLogin) {
      handleNavigateLogin();
    } else {
      navToEditProfile();
    }
  };

  // TODO: 프로필 이미지 수정 기능 재오픈 시 아래 핸들러와 ProfileCircle props를 복구한다.
  // const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //
  //   if (!file) return;
  //
  //   const fileType = file.type;
  //
  //   if (!fileType.includes('image')) {
  //     alert('해당 파일은 이미지 파일이 아닙니다.');
  //     return;
  //   }
  //
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //
  //   reader.onloadend = async () => {
  //     const data = await fetchUpdateUserImage(reader.result as string);
  //     if (data) {
  //       setUserInfo({ profileImage: reader.result as string });
  //     } else {
  //       alert('프로필 이미지 업데이트 실패');
  //     }
  //   };
  // };
  //
  // const handleClickProfileImage = (e: React.MouseEvent<HTMLLabelElement>) => {
  //   if (isLogin) {
  //     e.stopPropagation();
  //   }
  // };

  return (
    <ProfileContainer onClick={handleClickProfile}>
      {/* 프로필 이미지 수정은 임시 비활성화 상태 */}
      <ProfileCircle profileImage={userInfo?.profileImage ?? ProfilePNG} size="medium" canEdit={false} />
      <ProfileContents>
        <p>
          {username}
          <RightArrowThickSVG />
        </p>
        {(!isLogin || useremail) && <span>{isLogin ? useremail : '로그인을 진행해주세요'}</span>}
      </ProfileContents>
    </ProfileContainer>
  );
};

export default MyPageProfile;
