// TODO: 프로필 이미지 수정 기능 재오픈 시 아래 import와 편집 UI를 함께 복구한다.
// import EditCircleSVG from '@assets/edit_circle.svg?react';
import ProfilePNG from '@assets/profile.png';
import { ProfileCircleContainer } from './ProfileCircle.Style';

const ProfileCircle = ({
  profileImage,
  handleChangeFile,
  size,
  canEdit = true,
  handleClickCircle,
}: {
  profileImage: string;
  handleChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: 'small' | 'medium' | 'large';
  canEdit?: boolean;
  handleClickCircle?: (e: React.MouseEvent<HTMLLabelElement>) => void;
}) => {
  return (
    <ProfileCircleContainer size={size} onClick={handleClickCircle}>
      <img src={profileImage ?? ProfilePNG} />
      {canEdit && handleChangeFile && (
        <>
          {/* <EditCircleSVG /> */}
          <input type="file" accept="image/*" onChange={handleChangeFile} />
        </>
      )}
    </ProfileCircleContainer>
  );
};

export default ProfileCircle;
