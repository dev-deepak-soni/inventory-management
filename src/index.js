import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './component/error/Error';
import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Profile from './component/Profile';

const router = createBrowserRouter([
  {
    path : '/',
    element : <App/>,
    errorElement : <Error/>,
    children : [
      {
        path : '/',
        element : <Login/>
      },
      {
        path : 'signup',
        element : <Signup/>
      },
      {
        path : 'dashboard',
        element : <Dashboard/>
      },
      {
        path : 'profile',
        element : <Profile/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENTE_ID}><RouterProvider router={router}/></GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
