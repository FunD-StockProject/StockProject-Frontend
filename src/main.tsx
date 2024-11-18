import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import theme from './styles/themes.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  // </StrictMode>,
);
