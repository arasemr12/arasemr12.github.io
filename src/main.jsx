import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Index from './index'
import Loaduser from './Loaduser';
import LoadingBar from "react-top-loading-bar";
import More from './more'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
  {
    path:"/more",
    element: <More/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Loaduser/>
    <RouterProvider router={router} />
  </Provider>,
)
