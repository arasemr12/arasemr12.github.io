import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loaduser from "./loadUser";
import Index from ".";
import More from "./more";

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

const App = () => {
    return (
        <>
            <Loaduser/>
            <RouterProvider router={router} />
        </>
    )
};

export default App;
