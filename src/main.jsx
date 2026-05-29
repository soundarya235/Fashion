import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // BrowserRouter-க்கு பதில் HashRouter
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* HashRouter பயன்படுத்தும்போது basename தேவையில்லை */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);