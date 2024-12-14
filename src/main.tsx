import './styles/main.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <main
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          ⚠️ Во время отрисовки страницы произошла ошибка ‼️{' '}
        </main>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
