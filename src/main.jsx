import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './index'
import More from './more'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
  <React.StrictMode>
    {/*<span className="bg w-full scale-110 h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fixed blur-md bg-cover -z-50 object-cover" alt=""> </span>*/}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
