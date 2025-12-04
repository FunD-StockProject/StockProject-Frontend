import styled from '@emotion/styled';
import EditCircleSVG from '@assets/edit_circle.svg?react';
import ProfilePNG from '@assets/profile.png';

const ProfileCircleContainer = styled.label(
  ({ size }: { size: 'small' | 'medium' | 'large' }) => ({
    ['>img']: {
      width: size === 'small' ? '48px' : size === 'medium' ? '64px' : '76px',
    },

    ['>svg']: {
      width: size === 'small' ? '16px' : size === 'medium' ? '20px' : '24px',
    },
  }),
  {
    display: 'flex',
    position: 'relative',

    ['>img']: {
      height: 'auto',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      borderRadius: '999px',
      flexShrink: '0',
    },

    ['>svg']: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      height: 'auto',
      aspectRatio: '1 / 1',
      fill: '#ADB5BD',
      background: '#495057',
      borderRadius: '999px',
    },

    ['>input']: {
      display: 'none',
    },
  },
);

const ProfileCircle = ({
  profileImage,
  handleChangeFile,
  size,
  canEdit = true,
  handleClickCircle,
}: {
  profileImage: string;
  handleChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: 'small' | 'medium' | 'large';
  canEdit?: boolean;
  handleClickCircle?: (e: React.MouseEvent<HTMLLabelElement>) => void;
}) => {
  return (
    <ProfileCircleContainer size={size} onClick={handleClickCircle}>
      <img src={profileImage ?? ProfilePNG} />
      {canEdit && (
        <>
          <EditCircleSVG />
          <input type="file" accept="image/*" onChange={handleChangeFile} />
        </>
      )}
    </ProfileCircleContainer>
  );
};

export default ProfileCircle;
