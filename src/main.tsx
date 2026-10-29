import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Gracefully catch third-party cross-origin script errors in iframe preview
window.addEventListener('error', (e) => {
  if (e.message && e.message.toLowerCase().includes('script error')) {
    e.preventDefault();
    e.stopPropagation();
    return true;
  }
});

window.addEventListener('unhandledrejection', (e) => {
  if (e.reason && String(e.reason).toLowerCase().includes('script error')) {
    e.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

