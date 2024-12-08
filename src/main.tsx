// queryClient.ts에서 설정한 queryClient를 임포트
import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';
import queryClient from './queryClient';
import { theme } from './styles/themes.ts';

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    const userConfirmed = confirm('새 버전이 있습니다. 페이지를 새로고침하시겠습니까?');
    if (userConfirmed) {
      window.location.reload();
    }
  },
});

// 예: 개발 환경에서 업데이트를 강제로 트리거
if (process.env.NODE_ENV === 'development') {
  console.log('Service Worker 업데이트 테스트:', updateSW);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
