import { ChangeEvent, useState } from 'react';
import useAuthInfo from '@hooks/useAuthInfo';
import useRouter from '@router/useRouter';
import MyPageInput, { MyPageInputProps } from '@components/MyPage/MyPageInput/MyPageInput';
import ProfileCircle from '@components/MyPage/ProfileCircle/ProfileCircle';
import { fetchAuthNickname, fetchUpdateUserProfile } from '@controllers/auth/api';
import ProfilePNG from '@assets/profile.png';
import { EditProfileButton, EditProfileValueContainer, RegisterContainer, RegisterContent } from './Edit.Style';

const EditProfile = () => {
  const { navToEditProfileDone } = useRouter();

  const { userInfo, setUserInfo } = useAuthInfo();

  const oldValues = {
    name: userInfo?.nickname ?? '',
    birth: '',
  };

  const [values, setValues] = useState({
    name: oldValues.name,
    birth: oldValues.birth,
  });

  const [errors, setErrors] = useState({
    name: '',
    birth: '',
    system: '',
  });

  const validate = async () => {
    const errors = {
      name: '',
      birth: '',
      system: '',
    };

    const nameRefex = /^[가-힣]+$/;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!values.name) {
      errors.name = '닉네임을 입력해주세요';
    } else if (values.name.length > 8) {
      errors.name = '닉네임은 최대 8자까지 입력할 수 있어요';
    } else if (values.name.includes(' ')) {
      errors.name = '닉네임에 띄어쓰기를 사용할 수 없어요';
    } else if (!nameRefex.test(values.name)) {
      errors.name = '닉네임은 한글만 사용할 수 있어요';
    } else if (values.name !== oldValues.name) {
      const res = await fetchAuthNickname(values.name);
      if (res.duplicate) {
        errors.name = '이미 사용 중인 닉네임입니다';
      }
    }

    if (values.birth) {
      if (!birthRegex.test(values.birth)) {
        errors.birth = '생년월일 형식을 확인해주세요. (예: 1999-06-23)';
      } else if (isNaN(new Date(values.birth).getTime()) || new Date(values.birth) > new Date()) {
        errors.birth = '유효한 생년월일을 입력해주세요.';
      }
    }

    if (values.name === oldValues.name && values.birth === oldValues.birth) {
      errors.name = ' ';
      errors.birth = '수정된 내용이 없습니다.';
    }

    // if (false) {
    //   errors.system = '서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
    // }

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

    if (formatted != values[name as keyof typeof values]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

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

    setUserInfo({ nickname: values.name });
    //birth는 나중에 얻어와야 함
    navToEditProfileDone();
  };

  // TODO: 프로필 이미지 수정 기능 재오픈 시 아래 핸들러와 ProfileCircle props를 복구한다.
  // const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
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

  return (
    <RegisterContainer>
      <RegisterContent>
        {/* 프로필 이미지 수정은 임시 비활성화 상태 */}
        <ProfileCircle profileImage={userInfo?.profileImage ?? ProfilePNG} size="large" canEdit={false} />
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
