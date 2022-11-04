import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import App from './components/App';
import store from './store';
import './css/app.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
