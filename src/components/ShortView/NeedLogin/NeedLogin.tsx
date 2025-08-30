import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { NeedLoginButton, NeedLoginContainer, NeedLoginText } from './NeedLogin.Style';

const ShortViewNeedLogin = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate(webPath.login());
  };

  return (
    <NeedLoginContainer>
      <NeedLoginText>
        <p className="title">
          지금 로그인을 하고 <br />
          요즘 괜찮은 종목이 있는지 탐색해보아요
        </p>
        <p className="description">
          👋 로그인을 하면 <b>#심리지수</b>와 <b>#종목 키워드</b>
          <br />
          같은 기능을 사용할 수 있어요
        </p>
      </NeedLoginText>
      <NeedLoginButton onClick={handleClickLogin}>회원가입/로그인 하기</NeedLoginButton>
    </NeedLoginContainer>
  );
};

export default ShortViewNeedLogin;
