import React,{useContext} from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Navbar from '../Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isSeller] = useSeller(user?.email);
    const [isAdmin] = useAdmin(user?.email);
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>


                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        
                        {
                           
                            isSeller &&
                            <><li><Link to='/dashboard/allproductsmobile'>All Products</Link></li>
                            <li><Link to='/dashboard/addproducts'>Add Products</Link></li>
                               
                            </>
                        }
                        {
                            isAdmin &&
                            <><li><Link to='/dashboard/allsellers'>All Sellers</Link></li>
                            <li><Link to='/dashboard/addbuyers'>All Buyers</Link></li>
                               
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;