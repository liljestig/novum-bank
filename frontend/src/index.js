import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { TxnsContextProvider } from './context/TxnContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TxnsContextProvider>
        <App />
      </TxnsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);