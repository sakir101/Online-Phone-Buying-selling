import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../../Home/Category/AllProducts";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import UserLogin from "../../Login/UserLogin";
import Orders from "../../Pages/Orders/Orders";
import SellerSignup from "../../Signup/SellerSignup";
import UserSignup from "../../Signup/UserSignup";

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
            },
            {
                path: '/usersignup',
                element: <UserSignup></UserSignup>
            },
            {
                path: '/userlogin',
                element: <UserLogin></UserLogin>
            },
            {
                path: '/sellersignup',
                element: <SellerSignup></SellerSignup>
            },
            {
                path: '/orders',
                element: <Orders></Orders>
            }
        ]
    }

])

export default router