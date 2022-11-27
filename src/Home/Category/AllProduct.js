import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from "react-icons/fa";
const AllProduct = ({ product, setBookingProduct }) => {
    const { img, name, location, rsPrice, orgPrice, sellerName } = product;
    const [verify, setVerify] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5000/checkverify/${product?.sellerEmail}`)
            .then(res => res.json())
            .then(data => data.verify ==='verified'? setVerify(data.verify): setVerify(''))
    }, [product?.sellerEmail])


    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="phone" className='h-56' /></figure>
            <div className="card-body">
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className="card-title">{name}</h2>
                    </div>
                    <div className='bg-blue-300 rounded p-2'>
                        {
                            verify? <FaCheck/> : <FaTimes/>
                        }
                    </div>

                </div>
                <p>Location: {location}</p>
                <p>Resell Price: ${rsPrice}</p>
                <p>Original Price: ${orgPrice}</p>
                <p>Seller Name: {sellerName}</p>
                <div className="card-actions justify-end">
                    <label
                        htmlFor="booking-modal"
                        className="btn btn-primary"
                        onClick={() => setBookingProduct(product)}
                    >Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;