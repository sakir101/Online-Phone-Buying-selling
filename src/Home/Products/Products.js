import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Product from './Product';
import BookingModal from '../BookingModal/BookingModal';
import { AuthContext } from '../../Contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ReportModal from '../ReportModal/ReportModal';
import axios from 'axios'

const Products = () => {
    const [bookingProduct, setBookingProduct] = useState(null)
    const [reportProduct, setReportProduct] = useState(null)
    const [availableProducts, setAvailableProducts] = useState([])
    const { user } = useContext(AuthContext);

    axios.get('https://assignment-12-server-silk.vercel.app/advertiseProduct',{
        headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}` 
         }
    })
        .then(res => {
            console.log(res.data);
            setAvailableProducts(res.data)
        })
        .catch((error)=> {
            console.log(error);
        })
        .finally(()=> {
           
        });

    return (
        <div className='w-full p-5'>
            <div className='mt-16 text-center'>
                <h3 className='text-xl font-bold text-cyan-800 uppercase text-center'>Our Products</h3>
                <h2 className='text-3xl text-center'>Find Your Favorite One's</h2>
            </div>
            <div className='grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7'>
                {
                    availableProducts.length?
                    availableProducts.map(product => <Product key={product._id} product={product} setBookingProduct={setBookingProduct} setReportProduct={setReportProduct}></Product>):
                    <p className='text-red-600 font-bold text-center text-2xl'>No Advertise Product to show</p>
                }
            </div>
           
           
        </div>

    );
};

export default Products;