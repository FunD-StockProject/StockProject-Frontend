import { ThemeProvider } from '@emotion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';
import queryClient from './queryClient';
import { theme } from './styles/themes.ts';

registerSW({
  immediate: true,
  onNeedRefresh() {
    const userConfirmed = confirm('새 버전이 있습니다. 페이지를 새로고침하시겠습니까?');
    if (userConfirmed) {
      window.location.reload();
    }
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
