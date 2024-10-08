import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../../Home/Category/AllProducts";

import Home from "../../Home/Home/Home";
import DashboardLayout from "../../Layout/DashboardLayout";
import Main from "../../Layout/Main";
import UserLogin from "../../Login/UserLogin";
import AllBuyers from "../../Pages/Dashboard/AdminDashboard/AllBuyers/AllBuyers";
import AllReport from "../../Pages/Dashboard/AdminDashboard/AllReport/AllReport";
import AllSellers from "../../Pages/Dashboard/AdminDashboard/AllSellers/AllSellers";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import AddProducts from "../../Pages/Dashboard/SellerDashboard/AddProducts/AddProducts";
import SellerProducts from "../../Pages/Dashboard/SellerDashboard/AllProducts/SellerProducts";
import Faq from "../../Pages/Faq/Faq";

import Orders from "../../Pages/Orders/Orders";
import Payment from "../../Pages/Payment/Payment";
import SellerSignup from "../../Signup/SellerSignup";
import UserSignup from "../../Signup/UserSignup";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";
import routebg from "../../Asset/404routebg.png";
import Blog from "../../Pages/Blog/Blog";
import ProductDetail from "../../Home/Products/ProductDetail";
import CategoryProductDetail from "../../Home/Category/CategoryProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allproducts/:id",
        element: (
          <PrivateRoute>
            <AllProducts></AllProducts>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-silk.vercel.app/categoryone/${params.id}`
          ),
      },
      {
        path: "/productDetail/:id",
        element: <ProductDetail></ProductDetail>,
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-silk.vercel.app/advertiseproductone/${params.id}`
          ),
      },
      {
        path: "/categoryProductDetail/:id",
        element: (
          <PrivateRoute>
            <CategoryProductDetail></CategoryProductDetail>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-silk.vercel.app/productone/${params.id}`
          ),
      },
      {
        path: "/usersignup",
        element: <UserSignup></UserSignup>,
      },
      {
        path: "/userlogin",
        element: <UserLogin></UserLogin>,
      },
      {
        path: "/sellersignup",
        element: <SellerSignup></SellerSignup>,
      },

      {
        path: "/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-silk.vercel.app/payment/${params.id}`
          ),
      },
      {
        path: "/fa",
        element: <div>404 Page Not Found! About is unable to reach</div>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/addproducts",
        element: (
          <SellerRoute>
            <AddProducts></AddProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allproductsmobile",
        element: (
          <SellerRoute>
            <SellerProducts></SellerProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addbuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allreport",
        element: (
          <AdminRoute>
            <AllReport></AllReport>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/orders",
        element: (
          <PrivateRoute>
            <Orders></Orders>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/fa",
    element: <Faq></Faq>,
  },
  {
    path: "*",
    element: (
      <div className="w-full">
        <img src={routebg} alt="" className="mx-auto" />
      </div>
    ),
  },
]);

export default router;
