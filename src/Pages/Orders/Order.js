import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order }) => {
    const {_id, productId, productPrice, itemName, image } = order;
    return (
        <div className="card w-96 mx-auto my-5 bg-base-100 shadow-xl">
            <figure><img src={image} alt="product" className='h-56' /></figure>
            <div className="card-body">
                <h2 className="card-title">{itemName}</h2>
                <p>Price: {productPrice}</p>
                <div className="card-actions justify-end">
                    <Link to={`/payment/${_id}`}><button className="btn btn-primary">Pay</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Order;