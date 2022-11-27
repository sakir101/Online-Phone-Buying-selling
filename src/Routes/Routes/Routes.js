import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../../Home/Category/AllProducts";

import Home from "../../Home/Home/Home";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import UserLogin from "../../Login/UserLogin";
import AllBuyers from "../../Pages/Dashboard/AdminDashboard/AllBuyers/AllBuyers";
import AllSellers from "../../Pages/Dashboard/AdminDashboard/AllSellers/AllSellers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import AddProducts from "../../Pages/Dashboard/SellerDashboard/AddProducts/AddProducts";
import SellerProducts from "../../Pages/Dashboard/SellerDashboard/AllProducts/SellerProducts";

import Orders from "../../Pages/Orders/Orders";
import Payment from "../../Pages/Payment/Payment";
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
            },
            {
                path: '/payment/:id',
                element: <Payment></Payment>,
                loader: ({params}) => fetch(`http://localhost:5000/payment/${params.id}`)
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/addproducts',
                element: <AddProducts></AddProducts>
            },
            {
                path: '/dashboard/allproductsmobile',
                element: <SellerProducts></SellerProducts>
            },
            {
                path: '/dashboard/allsellers',
                element: <AllSellers></AllSellers>
            },
            {
                path: '/dashboard/addbuyers',
                element: <AllBuyers></AllBuyers>
            },
            
        ]
    }

])

export default router