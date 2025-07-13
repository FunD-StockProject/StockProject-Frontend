import { useNavigate } from 'react-router-dom';
import { webPath } from '@router/index';
import { fetchAuthWithdraw } from '@controllers/api';
import TmpPNG from '@assets/tmp_img.png';

const Withdraw = () => {
  const navigate = useNavigate();

  const UserService = [
    { img: TmpPNG, name: '매수 타이밍 실험실' },
    { img: TmpPNG, name: '맞춤형 종목 추천(숏뷰)' },
    { img: TmpPNG, name: '급등락 종목 알림' },
    { img: TmpPNG, name: '관심 종목 설정' },
  ];

  const handleClickCancelWithdraw = () => {
    navigate(webPath.mypage());
  };

  const handleClickWithdraw = async () => {
    if (window.confirm('정말 탈퇴 하시겠어요?')) {
      await fetchAuthWithdraw();
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('provider');
      window.alert(`[탈퇴 완료]
그동안 인간지표와 함께해주셔서 정말 감사했어요.
다시 감정지표가 궁금해질 땐 언제든 돌아오셔도 괜찮아요.`);
      navigate('/');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        height: '100%',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        탈퇴하신다니 아쉬워요
        <img
          src={TmpPNG}
          style={{
            width: '149px',
            height: '142px',
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          // alignItems: 'center',
          maxWidth: '420px',
          gap: '24px',
        }}
      >
        회원 전용 서비스는
        <br />더 이상 이용하실 수 없어요.
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)',
            gap: '24px',
            rowGap: '12px',
          }}
        >
          {UserService.map((e) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '12px',
                border: '1px solid white',
              }}
            >
              <img
                src={e.img}
                style={{
                  width: '100px',
                  height: '100px',
                }}
              />
              {e.name}
            </div>
          ))}
        </div>
        그동안 감정 지표를 함께 나눌 수 있어서,
        <br />
        인간지표는 행복했어요..
        <br />
        <br />
        조금 아쉽지만...
        <br />
        탈퇴를 계속 진행할까요?
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
        }}
      >
        <button
          style={{
            padding: '8px',
          }}
          onClick={handleClickCancelWithdraw}
        >
          인간지표와 평생 함께하기♡
        </button>
        <button
          style={{
            padding: '8px',
          }}
          onClick={handleClickWithdraw}
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
