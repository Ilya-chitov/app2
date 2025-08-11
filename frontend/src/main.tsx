import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import './i18n';
import './assets/base.css';

// Import services to initialize them
import './services/firebase';
import './services/offlineQueue';

// Components
import Layout from './components/Layout';
import DashboardPage from './modules/DashboardPage';
import AnimalsPage from './modules/livestock/AnimalsPage';
import InventoryPage from './modules/inventory/InventoryPage';
import FinancePage from './modules/finance/FinancePage';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Listen for online/offline events
window.addEventListener('online', () => {
  console.log('App is online');
});

window.addEventListener('offline', () => {
  console.log('App is offline');
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="animals" element={<AnimalsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="reports" element={<div className="p-8 text-center text-gray-500">Reports page coming soon</div>} />
            <Route path="settings" element={<div className="p-8 text-center text-gray-500">Settings page coming soon</div>} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// TODO: Add error boundary
// TODO: Add loading states
// TODO: Add authentication guards