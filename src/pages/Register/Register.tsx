import styled from '@emotion/styled';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PencilSVG from '@assets/icons/pencil.svg?react';
import RightArrowSVG from '@assets/icons/rightArrow.svg?react';

const LoginButton = styled.button({
  padding: '8px',
  [':focused']: {
    outline: 'none',
  },
});

const RegisterItemContainer = styled.div({
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

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [checkedAgreeAll, setCheckedAgreeAll] = useState(false);
  const [checkedAgreeTerms, setCheckedAgreeTerms] = useState(false);
  const [checkedAgreePrivacy, setCheckedAgreePrivacy] = useState(false);
  const [checkedAgreeAge, setCheckedAgreeAge] = useState(false);
  const [checkedAgreeMarketing, setCheckedAgreeMarketing] = useState(false);

  if (location.state?.type == 'email') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          padding: '24px',
          boxSizing: 'border-box',
          gap: '24px',
        }}
      >
        <div style={{ position: 'relative', width: '96px' }}>
          <div
            style={{
              background: 'gray',
              aspectRatio: '1 / 1',
              borderRadius: '100%',
            }}
          ></div>
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
          />
        </div>
        <RegisterItemContainer>
          <RegisterItemTitle>닉네임</RegisterItemTitle>
          <RegisterItemTextField type="text" placeholder="닉네임을 입력해주세요 (한글 최대 8자)" />
        </RegisterItemContainer>
        <RegisterItemContainer>
          <RegisterItemTitle>아이디 (이메일)</RegisterItemTitle>
          <RegisterItemTextField type="text" placeholder="humanzipyo2024@gmail.com" />
        </RegisterItemContainer>
        <RegisterItemContainer>
          <RegisterItemTitle>비밀번호</RegisterItemTitle>
          <RegisterItemTextField type="password" placeholder="영문 대소문자, 숫자, 특수문자를 섞어 최소 8자리 이상" />
        </RegisterItemContainer>
        <RegisterItemContainer>
          <RegisterItemTitle>비밀번호 확인</RegisterItemTitle>
          <RegisterItemTextField type="password" placeholder="비밀번호를 한번 더 입력해주세요" />
        </RegisterItemContainer>
        <RegisterItemContainer>
          <RegisterItemTitle>생년월일(선택)</RegisterItemTitle>
          <div
            style={{
              border: '1px solid white',
              padding: '8px',
            }}
          >
            YYYY-MM-DD
          </div>
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
        </RegisterItemContainer>
        <button>회원 가입</button>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ textAlign: 'center' }}>당신은 '인간지표'인가요?</p>
        <div
          style={{
            width: '120px',
            border: '1px solid white',
            aspectRatio: '1 / 1',
          }}
        ></div>
        <p style={{ textAlign: 'center' }}>
          주식투자 심리도우미 인간지표에
          <br />
          오신걸 환영합니다!
        </p>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          flexGrow: '1',
          justifyContent: 'center',
        }}
      >
        <LoginButton>카카오로 시작하기</LoginButton>
        <LoginButton>네이버로 시작하기</LoginButton>
        <LoginButton>Apple로 시작하기</LoginButton>
        <LoginButton>구글로 시작하기</LoginButton>
        <LoginButton
          onClick={() => {
            navigate('.', { state: { type: 'email' } });
          }}
        >
          이메일 아이디로 시작하기
        </LoginButton>
      </div>
    </div>
  );
};

export default Register;
