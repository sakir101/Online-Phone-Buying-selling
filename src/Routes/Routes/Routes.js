import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../../Home/Category/AllProducts";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allproducts/:id',
                element: <AllProducts></AllProducts>,
                loader: ({params}) => fetch(`http://localhost:5000/categoryone/${params.id}`)
            }
        ]
    }

])

export default router