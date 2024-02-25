import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './context/AuthContext';

import global_en from './translations/en/global.json';
import global_uk from './translations/uk/global.json';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { LoadingProvider } from './context/LoadingContext';

i18next.init({
  interpolation: {escapeValue: false},
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    uk: {
      global: global_uk,
    },
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <I18nextProvider i18n={i18next}>
          <LoadingProvider>
            <App /> 
          </LoadingProvider>
        </I18nextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
