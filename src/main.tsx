import React from 'react';
import ReactDOM from 'react-dom/client';

import ErrorBoundary from 'components/ErrorBoundary';

import App from './App.tsx';
import './index.css';
import CityContextProvider from './context/CityContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CityContextProvider>
        <App />
      </CityContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
