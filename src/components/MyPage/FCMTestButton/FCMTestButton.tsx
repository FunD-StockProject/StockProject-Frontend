import styled from '@emotion/styled';
import { useState } from 'react';

const FCMTestButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const testFCMPush = async () => {
    try {
      setLoading(true);
      setResult('');

      const token = localStorage.getItem('access_token');

      if (!token) {
        setResult('❌ 로그인이 필요합니다');
        alert('❌ 로그인이 필요합니다');
        return;
      }

      const response = await fetch('https://api.humanzipyo.com/notification/test-fcm', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setResult('✅ 테스트 알림 발송 성공!\n앱에서 알림을 확인하세요.');
        alert('✅ 테스트 알림 발송 성공!\n앱에서 알림을 확인하세요.');
      } else {
        setResult(`❌ 실패: ${data.message || '알 수 없는 오류'}`);
        alert(`❌ 실패: ${data.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '알 수 없는 오류';
      setResult(`❌ 에러: ${message}`);
      alert(`❌ 에러: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TestButton onClick={testFCMPush} disabled={loading}>
        {loading ? '🔄 발송 중...' : '📱 FCM 알림 테스트'}
      </TestButton>
      {result && <ResultText>{result}</ResultText>}
    </Container>
  );
};

export default FCMTestButton;

const Container = styled.div`
  margin: 20px 0;
  padding: 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const TestButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultText = styled.pre`
  margin-top: 12px;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.5;
  white-space: pre-wrap;
`;
