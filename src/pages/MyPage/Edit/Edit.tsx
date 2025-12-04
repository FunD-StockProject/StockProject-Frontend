import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import MyPageInput, { MyPageInputProps } from '@components/MyPage/MyPageInput/MyPageInput';
import ProfileCircle from '@components/MyPage/ProfileCircle/ProfileCircle';
import { fetchUpdateUserImage, fetchUpdateUserProfile } from '@controllers/auth/api';
import { theme } from '@styles/themes';
import ProfilePNG from '@assets/profile.png';

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flexGrow: '1',
  padding: '32px 0px',
  gap: '24px',
});

const RegisterContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  boxSizing: 'border-box',
  flexGrow: '1',
});

const EditProfileValueContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',

  ['>hr']: {
    background: '#1D1E1F',
    width: '100%',
    height: '4px',
    border: 'none',
    margin: '0',
  },
});

const EditProfileButton = styled.button({
  margin: '0 20px',

  padding: '10px 0px',
  border: 'none',
  borderRadius: '8px',
  background: theme.colors.sub_blue6,
  color: theme.colors.sub_white,
  ...theme.font.body18Semibold,

  ['&:disabled']: {
    background: theme.colors.sub_gray8,
    color: theme.colors.sub_black,
  },
});

const EditProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState<string | null>(localStorage.getItem('profileImg'));

  const oldValues = {
    profileImage: localStorage.getItem('profileImg') ?? '',
    name: localStorage.getItem('username') ?? '',
    email: localStorage.getItem('useremail') ?? '',
    birth: localStorage.getItem('birth') ?? '',
  };

  const [values, setValues] = useState({
    name: oldValues.name,
    email: oldValues.email,
    birth: oldValues.birth,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    birth: '',
    system: '',
  });

  const validate = async () => {
    const errors = {
      name: '',
      email: '',
      birth: '',
      system: '',
    };

    const nameRefex = /^[가-힣]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!values.name) {
      errors.name = '닉네임을 입력해주세요';
    } else if (values.name.length > 8) {
      errors.name = '닉네임은 최대 8자까지 입력할 수 있어요';
    } else if (!nameRefex.test(values.name)) {
      errors.name = '닉네임은 한글만 사용할 수 있어요';
    } else if (false) {
      // const res = await fetchAuthNickname(values.name);
      // console.log(res);
      // 닉네임 중복 API
      errors.name = '이미 사용 중인 닉네임입니다';
    }

    if (!values.email) {
      errors.email = '이메일을 입력해주세요';
    } else if (!emailRegex.test(values.email)) {
      errors.email = '이메일 형식을 확인해주세요';
    } else if (false) {
      // 이메일 중복 API
      errors.email = '이미 가입된 이메일입니다';
    }

    if (values.birth) {
      if (!birthRegex.test(values.birth)) {
        errors.birth = '생년월일 형식을 확인해주세요. (예: 1999-06-23)';
      } else if (isNaN(new Date(values.birth).getTime()) || new Date(values.birth) > new Date()) {
        errors.birth = '유효한 생년월일을 입력해주세요.';
      }
    }

    if (
      values.name === oldValues.name &&
      values.email === oldValues.email &&
      values.birth === oldValues.birth &&
      profileImage === oldValues.profileImage
    ) {
      errors.name = ' ';
      errors.birth = '수정된 내용이 없습니다.';
    }

    if (false) {
      errors.system = '서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
    }

    return errors;
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const formatted =
      name === 'birth'
        ? value
            .replace(/\D/g, '')
            .slice(0, 8)
            .replace(/^(\d{4})(\d{0,2})(\d{0,2})$/, (_, y, m, d) => [y, m, d].filter(Boolean).join('-'))
        : name === 'name'
          ? value.slice(0, 10)
          : value;

    setValues((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };

  const valueInputs: MyPageInputProps[] = [
    {
      name: 'name',
      error: errors.name,
      title: '닉네임*',
      sub: (
        <>
          <span>{values.name.length}</span>/10
        </>
      ),
      inputs: [
        {
          key: 'name',
          value: values.name,
          placeholder: '닉네임을 입력해주세요',
          handleChange: handleChangeValue,
        },
      ],
    },
    {
      name: 'email',
      title: '이메일*',
      error: errors.email,
      inputs: [
        {
          key: 'email',
          value: values.email,
          placeholder: 'email@email.com',
          disabled: true,
          handleChange: handleChangeValue,
        },
      ],
    },
    {
      name: 'birth',
      title: '생년월일(선택)',
      error: errors.birth || errors.system,
      inputs: [
        {
          key: 'birth',
          value: values.birth,
          placeholder: 'YYYY-MM-DD',
          handleChange: handleChangeValue,
        },
      ],
    },
  ];

  const handleSubmit = async () => {
    // 필드 검사 후
    const errors = await validate();
    // 에러 값을 설정하고
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    const res = await fetchUpdateUserProfile(values.name, values.birth);

    if (!res) return;

    localStorage.setItem('username', values.name);
    localStorage.setItem('birth', values.birth);
    navigate(webPath.registerDone());
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const data = await fetchUpdateUserImage(reader.result as string);
      if (data) {
        setProfileImage(data.profile_image_url);
        localStorage.setItem('profileImg', data.profile_image_url);
      } else {
        alert('프로필 이미지 업데이트 실패');
      }
    };
  };

  return (
    <RegisterContainer>
      <RegisterContent>
        <ProfileCircle profileImage={profileImage ?? ProfilePNG} handleChangeFile={handleChangeFile} size="large" />
        <EditProfileValueContainer>
          {valueInputs.map((e) => (
            <MyPageInput
              key={`VALUE_INPUT_${e.name}`}
              name={e.name}
              error={e.error}
              title={e.title}
              sub={e.sub}
              inputs={e.inputs}
            />
          ))}
        </EditProfileValueContainer>
      </RegisterContent>
      <EditProfileButton onClick={handleSubmit}>수정 완료</EditProfileButton>
    </RegisterContainer>
  );
};

export default EditProfile;
