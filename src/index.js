import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './Pages/Login';
import Reg from './Pages/Reg';
import Home from './Pages/Home';
import CreaViaggio from './Pages/CreaViaggio';
import InspectViaggio from './Pages/InspectViaggio';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Viaggio",
    element: <InspectViaggio />
  },
  {
    path: "/CreaViaggio",
    element: <CreaViaggio />
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Reg",
    element: <Reg />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);
