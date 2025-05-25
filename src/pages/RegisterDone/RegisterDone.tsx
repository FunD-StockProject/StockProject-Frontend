import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const RegisterDone = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        height: '100%',
        // flexGrow: '1',
        justifyContent: 'center',
        gap: '64px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        <p style={{ textAlign: 'center', fontWeight: '700', fontSize: '15px', margin: '0' }}>환영합니다!</p>
        <div
          style={{
            width: '160px',
            border: '1px solid white',
            aspectRatio: '1 / 1',
          }}
        ></div>
        <p style={{ textAlign: 'center', fontSize: '15px', margin: '0' }}>
          민심을 읽고, 타이밍을 실험하세요.
          <br />
          당신의 직감은 얼마나 정확할까요?
        </p>
      </div>
      <button style={{ height: '42px', fontSize: '15px' }} onClick={() => navigate('/')}>
        홈으로 이동
      </button>
    </div>
  );
};

export default RegisterDone;
