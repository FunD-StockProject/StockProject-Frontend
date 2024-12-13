import { useNavigate } from 'react-router-dom';
import leftArrow from '../../assets/leftArrow.svg';
import { BackButton, Content, UsageContainer } from './Usage.Style';

const Usage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const now = new Date();

    const fiveMinAgo = new Date(now);
    fiveMinAgo.setHours(now.getHours() - 23);
    fiveMinAgo.setMinutes(now.getMinutes() - 55);
    console.log(fiveMinAgo);
    // localStorage.setItem('LAST_VISIT_POPUP', fiveMinAgo.toISOString());
    navigate(-1);
  };

  return (
    <UsageContainer>
      <BackButton src={leftArrow} onClick={handleGoBack} />
      <Content>
        <h1>Usage 화면</h1>
        <p>이곳에서 PWA 사용법을 안내합니다.</p>
      </Content>
    </UsageContainer>
  );
};

export default Usage;
