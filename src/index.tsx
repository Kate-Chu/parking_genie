import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import About from './pages/About';
import store from './store';
import AppLayout from './layout/AppLayout';
import './css/app.scss';

// react router v6.4.3
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: 'about', element: <About /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
