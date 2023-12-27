import { createRoot } from 'react-dom/client';
import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ContextProvider from './components/context/ContextProvider';

const root = document.getElementById('root') || document.createElement('div');

// Use createRoot to render your app
const rootElement = createRoot(root);
rootElement.render(
 < ContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ContextProvider>
);

