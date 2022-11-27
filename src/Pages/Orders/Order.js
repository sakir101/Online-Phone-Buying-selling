import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
    const {_id, productId, productPrice, itemName, image } = order;
    const [orderProduct, setOrderProduct] = useState({})
    useEffect(()=>{
        fetch(`http://localhost:5000/orderProduct/${productId}`)
        .then(res=>res.json())
        .then(data=> setOrderProduct(data))
    },[productId])
    return (
        <div className="card w-96 mx-auto my-5 bg-base-100 shadow-xl">
            <figure><img src={image} alt="product" className='h-56' /></figure>
            <div className="card-body">
                <h2 className="card-title">{itemName}</h2>
                <p>Price: {productPrice}</p>
                <div className="card-actions justify-end">
                    {
                        orderProduct.payment === 'none'? <Link to={`/payment/${_id}`}><button className="btn btn-primary">Pay</button></Link> :
                        <p className='text-blue-600 font-bold'>Paid</p>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Order;