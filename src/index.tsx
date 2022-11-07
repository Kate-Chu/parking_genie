import React from 'react';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import About from './pages/About';
import store from './store';
import './css/app.scss';

// react router v6.4.3
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
  {
    path: '/about',
    element: <About />,
    children: [],
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
