import styled from '@emotion/styled';
import { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchAuthRegister } from '@controllers/api';
import ArrowLeftSVG from '@assets/arrowLeft.svg?react';
import CheckSVG from '@assets/check.svg?react';
import EditCircleSVG from '@assets/edit_circle.svg?react';
import ProfilePNG from '@assets/profile.png';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';

const RegisterItemContainer = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  padding: '0 24px',
  boxSizing: 'border-box',

  ['>p']: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '400',
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
  gap: '10px',
  ['>hr']: {
    margin: '0',
    backgroundColor: '#303033',
    height: '1px',
    border: 'none',
  },
});

const RegisterItemCheckBoxContainer = styled.label({
  display: 'flex',
  gap: '8px',
  fontSize: '16px',
  fontWeight: '700',
  alignItems: 'center',

  ['>p']: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '400',
    color: '#FFFFFF',
  },

  ['>svg']: {
    stroke: '#707374',
    marginLeft: 'auto',
    width: '28px',
    height: 'auto',
    aspectRatio: '1 / 1',
  },
});

const RegisterContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  flexGrow: '1',
});

const RegisterContent = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  padding: '32px 0px',
  boxSizing: 'border-box',
  flexGrow: '1',
});

const RegisterItemCheckBox = styled.label({
  width: '24px',
  padding: '3px',
  boxSizing: 'border-box',
  height: 'auto',
  aspectRatio: '1 / 1',

  ['>input[type="checkbox"]']: {
    appearance: 'none',
    width: '0',
    height: '0',
    margin: '0',
    position: 'absolute',
  },

  ['>span.checkmark']: {
    display: 'block',
    width: '100%',
    height: '100%',
    border: '2px solid #525658',
    boxSizing: 'border-box',
    borderRadius: '1px',

    ['>svg']: {
      display: 'none',
      width: '100%',
      height: 'auto',
      aspectRatio: '1 / 1',
      stroke: '#101010',
    },
  },

  ['> input[type="checkbox"]:checked + .checkmark']: {
    border: 'none',
    background: '#F6F6F6',

    ['>svg']: {
      display: 'block',
    },
  },
});

type TermKey = 'agreeTerm' | 'agreePrivacy' | 'agreeMarketing';
type TermState = Record<TermKey, boolean>;
type InputKey = 'name' | 'email' | 'birth';

interface TermInputItem {
  key: TermKey;
  essential?: boolean;
  text: string;
}
interface InputItem {
  key: InputKey;
  title: string;
  placeholder: string;
  sub?: React.ReactElement;
  essential?: boolean;
  disabled?: boolean;
}

const valueInputs: InputItem[] = [
  {
    key: 'name',
    title: '닉네임',
    essential: true,
    placeholder: '닉네임을 입력해주세요',
    sub: (
      <>
        <span>0</span>/10
      </>
    ),
  },
  {
    key: 'email',
    title: '이메일',
    essential: true,
    placeholder: 'email@email.com',
    disabled: true,
  },
  {
    key: 'birth',
    title: '생년월일',
    essential: false,
    placeholder: 'YYYY-MM-DD',
  },
];

const termInputs: TermInputItem[] = [
  {
    key: 'agreeTerm',
    essential: true,
    text: '[필수] 만 14세 이상이며, 이용약관에 동의합니다',
  },
  {
    key: 'agreePrivacy',
    essential: true,
    text: '[필수] 개인정보 수집 및 이용에 동의합니다',
  },
  {
    key: 'agreeMarketing',
    essential: false,
    text: '[선택] 광고성 정보 수신 동의합니다',
  },
];

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state?.provider);
  const [values, setValues] = useState({
    name: '',
    email: location.state?.email,
    birth: '',
  });


  const [terms, setTerms] = useState<TermState>({
    agreeTerm: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });
  const [checkedAll, setCheckedAll] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
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
    const { name, value } = e.target;

    const formatted =
      name === 'birth'
        ? value
          .replace(/\D/g, '')
          .slice(0, 8)
          .replace(/^(\d{4})(\d{0,2})(\d{0,2})$/, (_, y, m, d) => [y, m, d].filter(Boolean).join('-'))
        : value;

    setValues((prev) => ({
      ...prev,
      [name]: formatted,
    }));
  };

  const handleChangeAllCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setCheckedAll(checked);
    if (!checked) return;
    setTerms((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, true])) as TermState);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    if (!checked) setCheckedAll(false);
    setTerms((prev) => ({ ...prev, [name]: checked }));
  };

  const validate = () => {
    const errors = {
      name: '',
      email: '',
      birth: '',
      termsAgreed: '',
      system: '',
    };

    const nameRefex = /^[가-힣]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    if (values.birth) {
      if (!birthRegex.test(values.birth)) {
        errors.birth = '생년월일 형식을 확인해주세요. (예: 1999-06-23)';
      } else if (new Date(values.birth) > new Date()) {
        errors.birth = '유효한 생년월일을 입력해주세요.';
      }
    }

    if (
      termInputs.reduce((acc, e) => {
        if (!e.essential) return acc;
        if (!terms[e.key]) return true;
        return acc;
      }, false)
    ) {
      errors.termsAgreed = '필수 약관에 동의해야 가입할 수 있습니다.';
    }

    if (false) {
      errors.system = '서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
    }

    return errors;
  };

  const handleSubmit = async () => {
    // 필드 검사 후
    const errors = validate();
    // 에러 값을 설정하고
    setErrors(errors);
    // 잘못된 값이면 제출 처리를 중단한다.
    if (Object.values(errors).some((v) => v)) {
      return;
    }

    const res = await fetchAuthRegister(values.email, values.name, new Date(values.birth), true, location.state?.provider);


    console.log(2, res);
    navigate(webPath.registerDone());
  };

  return (
    <RegisterContainer>
      <RegisterHeaderContainer>
        <div>
          <ArrowLeftSVG onClick={() => navigate(-1)} />
          <p>회원가입</p>
          <span />
        </div>
        <span className="divider" />
      </RegisterHeaderContainer>
      <RegisterContent>
        <RegisterContentProfileImage onClick={handleUploadLocalFile}>
          <img src={(profileImage as string) ?? ProfilePNG} />
          <EditCircleSVG />
        </RegisterContentProfileImage>
        <RegisterContentListContainer>
          {valueInputs.map((e) => (
            <RegisterContentInputContainer key={e.key}>
              <p>
                {e.title}
                {e.essential ? '*' : '(선택)'}
              </p>
              <input
                type="text"
                placeholder={e.placeholder}
                disabled={e.disabled}
                name={e.key}
                value={values[e.key]}
                onChange={handleChangeValue}
              />
              <RegisterContentInputSubContainer>
                <RegisterItemError>{errors[e.key]}</RegisterItemError>
                <RegisterContentInputSubText>{e.sub}</RegisterContentInputSubText>
              </RegisterContentInputSubContainer>
            </RegisterContentInputContainer>
          ))}
          <span className="divider" />
        </RegisterContentListContainer>
        <RegisterItemContainer>
          <p>약관 동의</p>
          <RegisterItemCheckBoxListContainer>
            <RegisterItemCheckBoxContainer>
              <RegisterItemCheckBox>
                <input type="checkbox" checked={checkedAll} onChange={handleChangeAllCheckbox} />
                <span className="checkmark">
                  <CheckSVG />
                </span>
              </RegisterItemCheckBox>
              <p>전체 동의</p>
            </RegisterItemCheckBoxContainer>
            <hr />
            {termInputs.map((e) => (
              <RegisterItemCheckBoxContainer>
                <RegisterItemCheckBox>
                  <input type="checkbox" name={e.key} checked={terms[e.key]} onChange={handleChangeCheckbox} />
                  <span className="checkmark">
                    <CheckSVG />
                  </span>
                </RegisterItemCheckBox>
                <p>{e.text}</p>

                <RightArrowThickSVG />
              </RegisterItemCheckBoxContainer>
            ))}
          </RegisterItemCheckBoxListContainer>
          {errors.termsAgreed && <RegisterItemError>{errors.termsAgreed}</RegisterItemError>}
        </RegisterItemContainer>
      </RegisterContent>
      <RegisterButtonContainer>
        <RegisterButton onClick={handleSubmit}>회원 가입</RegisterButton>
      </RegisterButtonContainer>
    </RegisterContainer>
  );
};

const RegisterButtonContainer = styled.div({
  padding: '0px 24px 24px',
  width: '100%',
  boxSizing: 'border-box',
});

const RegisterButton = styled.button({
  width: '100%',
  fontSize: '18px',
  fontWeight: '600',
  height: '48px',
  borderRadius: '8px',
  padding: '10px 0px',
  border: 'none',
  background: '#3457FD',
  color: 'white',
  [':disabled']: {
    color: '#101010',
  },
});

const RegisterHeaderContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '9px',

  ['>div']: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 20px',
    boxSizing: 'border-box',
    gap: '12px',

    ['>svg,>span']: {
      width: '32px',
      height: 'auto',
      aspectRatio: '1 / 1',
    },

    ['>p']: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#FFFFFF',
      flexGrow: '1',
      textAlign: 'center',
    },
  },

  ['>span.divider']: {
    background: '#1D1E1F',
    height: '4px',
  },
});

const RegisterContentProfileImage = styled.div({
  display: 'flex',
  position: 'relative',
  ['>img']: {
    width: '78px',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: '999px',
  },
  ['>svg']: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '24px',
    height: 'auto',
    aspectRatio: '1 / 1',
    fill: '#ADB5BD',
    background: '#495057',
    borderRadius: '999px',
  },
});

const RegisterContentListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',

  ['>span.divider']: {
    background: '#1D1E1F',
    height: '4px',
  },
});

const RegisterContentInputContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '0 24px',

  ['>p']: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '400',
    color: '#DEE2E6',
  },
  ['>input']: {
    border: 'none',
    padding: '20px 16px',
    height: '48px',
    boxSizing: 'border-box',
    fontSize: '18px',
    fontWeight: '500',
    borderRadius: '5px',
  },
});

const RegisterContentInputSubContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  height: '20px',
});

const RegisterContentInputSubText = styled.span({
  display: 'block',
  fontSize: '14px',
  fontWeight: '300',
  color: '#DEE2E6',

  ['>span']: {
    fontWeight: '500',
  },
});

export default Register;
