import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './css/globals.css';
import { ItemListProvider } from './provider/ItemListProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ItemListProvider>
      <App />
    </ItemListProvider>
  </React.StrictMode>
);
