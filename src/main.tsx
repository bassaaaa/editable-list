import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './css/globals.css';
import { ItemListProvider } from './provider/ItemListProvider';
import { EditStateProvider } from './provider/EditStateProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ItemListProvider>
      <EditStateProvider>
        <App />
      </EditStateProvider>
    </ItemListProvider>
  </React.StrictMode>
);
