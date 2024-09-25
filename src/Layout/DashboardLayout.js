import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import useSeller from "../hooks/useSeller";
import Navbar from "../Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <div className="drawer drawer-mobile flex-1">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col items-center justify-start p-2 lg:p-4 overflow-auto">
          <Outlet />
        </div>
        <div className="drawer-side w-60 h-screen">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 bg-base-100 border-x-2 border-solid border-gray-100 text-base-content">
            {isSeller && (
              <>
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/allproductsmobile">All Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/addproducts">Add Products</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/allsellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/addbuyers">All Buyers</Link>
                </li>
                <li>
                  <Link to="/dashboard/allreport">All Reports</Link>
                </li>
              </>
            )}
            {isBuyer && (
              <>
                <li>
                  <Link to="/dashboard">My Profile</Link>
                </li>
                <li>
                  <Link to="/dashboard/orders">My Orders</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
