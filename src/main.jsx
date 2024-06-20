import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from "./Redux/Store/Store"
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Home from './Components/Routes/Home/Home';
import SearchPage from './Components/Routes/SearchPage/SearchPage';
import LoginSignInModal from './Components/Layouts/Modal/LoginSignInModal';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/searchPage",
    element:<SearchPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

