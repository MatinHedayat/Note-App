import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './tailwind.css';
import Providers from './contexts/Providers.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>
);
