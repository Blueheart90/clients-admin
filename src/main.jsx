import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import NewClient, { action as actionNewClient } from './pages/NewClient';
import Index, { loader as loaderClients } from './pages/Index';
import ErrorPage from './components/ErrorPage';
import ClientEdit, {
  loader as loaderClientEdit,
  action as actionClientEdit,
} from './pages/ClientEdit';
import { action as actionClientDestroy } from './components/Client';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: loaderClients,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/nuevo',
        element: <NewClient />,
        action: actionNewClient,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:clientId/editar',
        element: <ClientEdit />,
        loader: loaderClientEdit,
        action: actionClientEdit,
        errorElement: <ErrorPage />,
      },
      {
        path: '/clientes/:clientId/eliminar',
        action: actionClientDestroy,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
