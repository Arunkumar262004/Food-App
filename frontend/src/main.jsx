import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import StorecontextProvider from './context/Storecontext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StorecontextProvider>
      <App />
    </StorecontextProvider>
  </BrowserRouter>
);
