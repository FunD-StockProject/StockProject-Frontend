import styled from '@emotion/styled';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import PencilSVG from '@assets/icons/pencil.svg?react';
import RightArrowSVG from '@assets/icons/rightArrow.svg?react';

const RegisterItemContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

const RegisterItemTitle = styled.p({
  margin: '0',
  fontSize: '16px',
  fontWeight: '700',
});

const RegisterItemTextField = styled.input({
  margin: '0',
  fontSize: '13px',
  fontWeight: '500',
  border: '1px solid white',
  padding: '8px',
  lineHeight: '1.5',

  ['::placeholder']: {
    fontSize: '13px',
  },
});

const RegisterItemError = styled.span({
  margin: '0 8px',
  fontSize: '13px',
  color: 'red',
});

const RegisterItemCheckBoxListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  ['hr']: {
    margin: '0',
  },
});

const RegisterItemCheckBoxContainer = styled.label({
  display: 'flex',
  gap: '8px',
  fontSize: '16px',
  fontWeight: '700',
  padding: '0 8px',
  alignItems: 'center',
  ['input']: {
    width: '18px',
    aspectRatio: '1 / 1',
  },
  ['svg']: {
    fill: 'white',
    marginLeft: 'auto',
    width: '24px',
    aspectRatio: '1 / 1',
  },
});

const RegisterDatePicker = ({
  setActive,
  setDate,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: (date: Date) => void;
}) => {
  const datePickerRef = useRef<HTMLDivElement>(null);

  const closeDatePicker = () => {
    setActive(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(e.target as Node)) {
        closeDatePicker();
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  });

  return (
    <div
      ref={datePickerRef}
      style={{
        position: 'absolute',
        width: '100%',
        boxSizing: 'border-box',
        height: '100px',
        top: '100%',
        zIndex: '100',
        background: 'white',
      }}
    >
      <button
        onClick={() => {
          setDate(new Date('1999-12-13'));
        }}
      >
        Test
      </button>
    </div>
  );
};

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  padding: '24px',
  boxSizing: 'border-box',
  gap: '72px',
});

const RegisterContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
});

const RegisterDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [checkedAgreeAll, setCheckedAgreeAll] = useState(false);
  const [checkedAgreeTerms, setCheckedAgreeTerms] = useState(false);
  const [checkedAgreePrivacy, setCheckedAgreePrivacy] = useState(false);
  const [checkedAgreeAge, setCheckedAgreeAge] = useState(false);
  const [checkedAgreeMarketing, setCheckedAgreeMarketing] = useState(false);
  const [activeDatePicker, setActiveDatePicker] = useState(false);

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birth: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    birth: '',
    termsAgreed: '',
    system: '',
  });

  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);

  const handleUploadLocalFile = async () => {
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker({
        types: [
          {
            description: 'Image Files',
            accept: {
              'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
            },
          },
        ],
        multiple: false,
      });

      const file = await fileHandle.getFile();

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
    } catch (err) {
      console.error('파일 선택 취소 또는 실패:', err);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      birth: '',
      termsAgreed: '',
      system: '',
    };

    const nameRefex = /^[가-힣]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordSecureRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!values.name) {
      errors.name = '닉네임을 입력해주세요.';
    } else if (values.name.length > 8) {
      errors.name = '닉네임은 최대 8자까지 입력할 수 있어요.';
    } else if (!nameRefex.test(values.name)) {
      errors.name = '닉네임은 한글만 사용할 수 있어요.';
    } else if (false) {
      // 닉네임 중복 API
      errors.name = '이미 사용 중인 닉네임입니다. 다른 닉네임을 입력해주세요.';
    }

    if (!values.email) {
      errors.email = '이메일을 입력해주세요.';
    } else if (!emailRegex.test(values.email)) {
      errors.email = '이메일 형식을 확인해주세요.';
    } else if (false) {
      // 이메일 중복 API
      errors.email = '이미 가입된 이메일입니다.';
    }

    if (location.state.type == 'email') {
      if (!values.password) {
        errors.password = '비밀번호를 입력해주세요.';
      } else if (values.password.length < 8) {
        errors.password = '비밀번호는 8자 이상 입력해주세요.';
      } else if (!passwordSecureRegex.test(values.password)) {
        errors.password = '영문, 숫자, 특수문자를 모두 포함해주세요.';
      }

      if (!values.passwordConfirm) {
        errors.passwordConfirm = '비밀번호 확인을 입력해주세요.';
      } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = '비밀번호가 일치하지 않습니다. 다시 확인해주세요.';
      }
    }

    if (values.birth) {
      if (!birthRegex.test(values.birth)) {
        errors.birth = '생년월일 형식을 확인해주세요. (예: 1999-06-23)';
      } else if (new Date(values.birth) > new Date()) {
        errors.birth = '유효한 생년월일을 입력해주세요.';
      }
    }

    if (!checkedAgreeTerms || !checkedAgreePrivacy || !checkedAgreeAge) {
      errors.termsAgreed = '필수 약관에 동의해야 가입할 수 있습니다.';
    }

    if (false) {
      errors.system = '서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
    }

    return errors;
  };

  const handleSubmit = () => {
    // 필드 검사 후
    const errors = validate();
    // 에러 값을 설정하고
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    navigate(webPath.registerDone());
  };

  const setBirth = (date: Date) => {
    const _year = date.getFullYear();
    const _month = (date.getMonth() + 1).toString().padStart(2, '0');
    const _date = date.getDate().toString().padStart(2, '0');

    setValues((prev) => ({ ...prev, birth: `${_year}-${_month}-${_date}` }));
  };

  return (
    <RegisterContainer>
      <RegisterContent>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              background: 'gray',
              width: '96px',
              height: '96px',
              aspectRatio: '1 / 1',
              borderRadius: '100%',
              overflow: 'hidden',
            }}
          >
            {profileImage && (
              <img src={profileImage as string} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>

          <PencilSVG
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              background: 'white',
              borderRadius: '100%',
              // border: '1px solid black',
              padding: '4px',
            }}
            onClick={handleUploadLocalFile}
          />
        </div>
        <RegisterItemContainer>
          <RegisterItemTitle>닉네임</RegisterItemTitle>
          <RegisterItemTextField
            type="text"
            placeholder="닉네임을 입력해주세요 (한글 최대 8자)"
            name="name"
            value={values.name}
            onChange={handleChangeValue}
          />
          {errors.name && <RegisterItemError>{errors.name}</RegisterItemError>}
        </RegisterItemContainer>
        <RegisterItemContainer>
          <RegisterItemTitle>{location.state.type == 'email' ? '아이디 (이메일)' : '이메일'}</RegisterItemTitle>
          <RegisterItemTextField
            type="text"
            placeholder="humanzipyo2024@gmail.com"
            name="email"
            value={values.email}
            onChange={handleChangeValue}
          />
          {errors.email && <RegisterItemError>{errors.email}</RegisterItemError>}
        </RegisterItemContainer>
        {location.state.type == 'email' && (
          <RegisterItemContainer>
            <RegisterItemTitle>비밀번호</RegisterItemTitle>
            <RegisterItemTextField
              type="password"
              placeholder="영문 대소문자, 숫자, 특수문자를 섞어 최소 8자리 이상"
              name="password"
              value={values.password}
              onChange={handleChangeValue}
            />
            {errors.password && <RegisterItemError>{errors.password}</RegisterItemError>}
          </RegisterItemContainer>
        )}
        {location.state.type == 'email' && (
          <RegisterItemContainer>
            <RegisterItemTitle>비밀번호 확인</RegisterItemTitle>
            <RegisterItemTextField
              type="password"
              placeholder="비밀번호를 한번 더 입력해주세요"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleChangeValue}
            />
            {errors.passwordConfirm && <RegisterItemError>{errors.passwordConfirm}</RegisterItemError>}
          </RegisterItemContainer>
        )}
        <RegisterItemContainer>
          <RegisterItemTitle>생년월일(선택)</RegisterItemTitle>
          <RegisterItemTextField
            placeholder="YYYY-MM-DD"
            readOnly
            onClick={() => setActiveDatePicker(true)}
            name="birth"
            value={values.birth}
          />
          {activeDatePicker && <RegisterDatePicker setActive={setActiveDatePicker} setDate={setBirth} />}
          {errors.birth && <RegisterItemError>{errors.birth}</RegisterItemError>}
        </RegisterItemContainer>
        <RegisterItemContainer>
          <RegisterItemTitle>약관 동의</RegisterItemTitle>
          <RegisterItemCheckBoxListContainer>
            <RegisterItemCheckBoxContainer>
              <input
                type="checkbox"
                checked={checkedAgreeAll}
                onChange={(e) => {
                  setCheckedAgreeAll(e.target.checked);
                  setCheckedAgreeTerms(e.target.checked);
                  setCheckedAgreePrivacy(e.target.checked);
                  setCheckedAgreeAge(e.target.checked);
                  setCheckedAgreeMarketing(e.target.checked);
                }}
              />
              전체 동의
            </RegisterItemCheckBoxContainer>
            <hr />
            <RegisterItemCheckBoxContainer>
              <input
                type="checkbox"
                checked={checkedAgreeTerms}
                onChange={(e) => {
                  setCheckedAgreeTerms(e.target.checked);
                }}
              />
              [필수] 서비스 이용약관
              <RightArrowSVG />
            </RegisterItemCheckBoxContainer>
            <RegisterItemCheckBoxContainer>
              <input
                type="checkbox"
                checked={checkedAgreePrivacy}
                onChange={(e) => {
                  setCheckedAgreePrivacy(e.target.checked);
                }}
              />
              [필수] 개인정보 수집 및 이용 동의
              <RightArrowSVG />
            </RegisterItemCheckBoxContainer>
            <RegisterItemCheckBoxContainer>
              <input
                type="checkbox"
                checked={checkedAgreeAge}
                onChange={(e) => {
                  setCheckedAgreeAge(e.target.checked);
                }}
              />
              [필수] 본인은 만 14세 이상입니다.
              <RightArrowSVG />
            </RegisterItemCheckBoxContainer>
            <hr />
            <RegisterItemCheckBoxContainer>
              <input
                type="checkbox"
                checked={checkedAgreeMarketing}
                onChange={(e) => {
                  setCheckedAgreeMarketing(e.target.checked);
                }}
              />
              [선택] 광고성 정보 수신 동의
              <RightArrowSVG />
            </RegisterItemCheckBoxContainer>
          </RegisterItemCheckBoxListContainer>
          {errors.termsAgreed && <RegisterItemError>{errors.termsAgreed}</RegisterItemError>}
        </RegisterItemContainer>
      </RegisterContent>
      <button style={{ width: '100%', fontSize: '15px', height: '48px' }} onClick={handleSubmit}>
        회원 가입
      </button>
    </RegisterContainer>
  );
};

export default RegisterDetail;
