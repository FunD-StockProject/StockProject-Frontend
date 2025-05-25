import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ padding: '24px 12px' }}>
        <p
          style={{
            background: 'gray',
            width: '100%',
            textAlign: 'center',
            padding: '32px',
            boxSizing: 'border-box',
            margin: '0',
          }}
        >
          이벤트 배너 영역
        </p>
      </div>
      <div style={{ borderBottom: '1px solid white' }} />
      <div
        style={{
          padding: '24px 12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            border: '1px solid white',
            alignItems: 'center',
            padding: '18px 24px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ margin: '0', fontSize: '15px' }}>로그인하고</p>
            <p style={{ margin: '0', fontSize: '17px', fontWeight: '700' }}>내가 '인간지표'인지 확인하기</p>
          </div>
          <p
            style={{ border: '1px solid white', padding: '12px', margin: '0' }}
            onClick={() => {
              navigate(webPath.login());
            }}
          >
            로그인
          </p>
        </div>
        <p style={{ fontSize: '12px', margin: '0' }}>
          아직 인간지표 계정이 없으시가면?{' '}
          <span
            style={{
              cursor: 'pointer',
              borderBottom: '1px solid white',
            }}
            onClick={() => {
              alert('asd');
            }}
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default MyPage;
