import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TermKey } from '@ts/Term';
import useRouter from '@router/useRouter';
import useAuthInfo from '@hooks/useAuthInfo';
import Button from '@components/Common/Button';
import MyPageInput, { MyPageInputProps } from '@components/MyPage/MyPageInput/MyPageInput';
import ProfileCircle from '@components/MyPage/ProfileCircle/ProfileCircle';
import { fetchAuthNickname, fetchAuthRegister } from '@controllers/auth/api';
import CheckSVG from '@assets/check.svg?react';
import AlertSVG from '@assets/icons/alert.svg?react';
import ProfilePNG from '@assets/profile.png';
import RightArrowThickSVG from '@assets/right_arrow_thick.svg?react';
import {
  RegisterButtonContainer,
  RegisterContainer,
  RegisterContent,
  RegisterTermCheckBox,
  RegisterTermContainer,
  RegisterTermErrorContainer,
  RegisterTermItemContainer,
  RegisterTermListContainer,
  RegisterValueContainer,
} from './Register.Style';

type TermState = Record<TermKey, boolean>;

interface TermInputItem {
  key: TermKey;
  essential?: boolean;
  text: string;
}

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
  const { navToRegisterDone, navToTerm } = useRouter();
  const location = useLocation();
  const { setAuthInfo } = useAuthInfo();

  // WebView 환경 감지
  const isWebView = !!(window as any).ReactNativeWebView;

  const [values, setValues] = useState({
    name: '',
    email: location.state?.email || sessionStorage.getItem('register_email') || '',
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

  const [profileImage, setProfileImage] = useState<string | null>(null);

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

  const handleChangeAllCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    setCheckedAll(checked);
    if (!checked) return;
    setTerms((prev) => Object.fromEntries(Object.keys(prev).map((key) => [key, true])) as TermState);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setErrors((prev) => ({
      ...prev,
      termsAgreed: '',
    }));

    if (!checked) setCheckedAll(false);
    setTerms((prev) => ({ ...prev, [name]: checked }));
  };

  const validate = async () => {
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
      errors.name = '닉네임을 입력해주세요';
    } else if (values.name.length > 8) {
      errors.name = '닉네임은 최대 8자까지 입력할 수 있어요';
    } else if (values.name.includes(' ')) {
      errors.name = '닉네임에 띄어쓰기를 사용할 수 없어요';
    } else if (!nameRefex.test(values.name)) {
      errors.name = '닉네임은 한글만 사용할 수 있어요';
    } else {
      const res = await fetchAuthNickname(values.name);
      if (res.duplicate) {
        errors.name = '이미 사용 중인 닉네임입니다';
      }
    }

    if (!values.email) {
      errors.email = '이메일을 입력해주세요';
    } else if (!emailRegex.test(values.email)) {
      errors.email = '이메일 형식을 확인해주세요';
    }
    // else if (false) {
    //   // 이메일 중복 API
    //   errors.email = '이미 가입된 이메일입니다';
    // }

    if (values.birth) {
      if (!birthRegex.test(values.birth)) {
        errors.birth = '생년월일 형식을 확인해주세요. (예: 1999-06-23)';
      } else if (isNaN(new Date(values.birth).getTime()) || new Date(values.birth) > new Date()) {
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
      errors.termsAgreed = '필수 약관에 동의해야 가입할 수 있습니다';
    }

    // if (false) {
    //   errors.system = '서버와의 연결에 문제가 있습니다. 잠시 후 다시 시도해주세요.';
    // }

    return errors;
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
      error: errors.birth,
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

    const provider = location.state?.provider || sessionStorage.getItem('register_provider') || '';

    const res = await fetchAuthRegister(
      profileImage as string,
      values.email,
      values.name,
      values.birth,
      true,
      provider.toUpperCase(),
    );

    if (!res) return;

    // 토큰 및 사용자 정보 저장 (브라우저/WebView 모두)
    if (res.access_token && res.refresh_token) {
      setAuthInfo(res.access_token, res.refresh_token, {
        email: values.email,
        nickname: values.name,
        profileImage: profileImage || undefined,
        provider: provider.toUpperCase(),
      });
    }

    // sessionStorage 정리
    sessionStorage.removeItem('register_email');
    sessionStorage.removeItem('register_provider');

    // WebView 환경: 앱으로 토큰 전달
    if (isWebView && res.access_token) {
      (window as any).ReactNativeWebView?.postMessage(
        JSON.stringify({
          type: 'TOKEN',
          token: res.access_token,
        }),
      );
    }

    // Done 페이지로 이동
    navToRegisterDone();
  };

  const handleOpenTerm = (termKey: TermKey) => () => {
    navToTerm(termKey);
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
  };

  return (
    <RegisterContainer>
      <RegisterContent>
        <ProfileCircle profileImage={profileImage ?? ProfilePNG} handleChangeFile={handleChangeFile} size="large" />
        <RegisterValueContainer>
          {valueInputs.map((e) => (
            <MyPageInput key={e.name} name={e.name} error={e.error} title={e.title} sub={e.sub} inputs={e.inputs} />
          ))}
          <hr />
          <RegisterTermContainer>
            <p>약관 동의</p>
            <RegisterTermListContainer>
              <RegisterTermItemContainer>
                <RegisterTermCheckBox>
                  <input type="checkbox" checked={checkedAll} onChange={handleChangeAllCheckbox} />
                  <CheckSVG />
                  전체 동의
                </RegisterTermCheckBox>
              </RegisterTermItemContainer>
              <hr />
              {termInputs.map((e) => (
                <RegisterTermItemContainer key={`TERM_${e.key}`}>
                  <RegisterTermCheckBox>
                    <input type="checkbox" name={e.key} checked={terms[e.key]} onChange={handleChangeCheckbox} />
                    <CheckSVG />
                    {e.text}
                  </RegisterTermCheckBox>
                  <RightArrowThickSVG onClick={handleOpenTerm(e.key)} />
                </RegisterTermItemContainer>
              ))}
            </RegisterTermListContainer>
          </RegisterTermContainer>
        </RegisterValueContainer>
      </RegisterContent>
      <RegisterButtonContainer>
        {errors.termsAgreed && (
          <RegisterTermErrorContainer>
            <AlertSVG />
            <p>{errors.termsAgreed}</p>
          </RegisterTermErrorContainer>
        )}
        <Button onClick={handleSubmit}>회원 가입</Button>
      </RegisterButtonContainer>
    </RegisterContainer>
  );
};

export default Register;
