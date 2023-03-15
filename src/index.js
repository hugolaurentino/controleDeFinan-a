import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import PrincipalRotas from './rotas';
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <PrincipalRotas />
    </BrowserRouter>

  </React.StrictMode>
);