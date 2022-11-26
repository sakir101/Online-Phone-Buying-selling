import React from 'react';

const Order = ({ order }) => {
    const { productPrice, itemName, image } = order;
    return (
        <div className="card w-96 mx-auto my-5 bg-base-100 shadow-xl">
            <figure><img src={image} alt="product" className='h-56' /></figure>
            <div className="card-body">
                <h2 className="card-title">{itemName}</h2>
                <p>Price: {productPrice}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Pay</button>
                </div>
            </div>
        </div>
    );
};

export default Order;