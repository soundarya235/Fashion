import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 இந்த லைனை ஆட் பண்ணுங்க நா
import App from './App.jsx';
import './index.css'; // Unga CSS file path

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 👈 App-க்கு மேல இத ஓபன் பண்ணுங்க */}
      <App />
    </BrowserRouter> {/* 👈 இங்க க்ளோஸ் பண்ணிடுங்க நா */}
  </React.StrictMode>
);