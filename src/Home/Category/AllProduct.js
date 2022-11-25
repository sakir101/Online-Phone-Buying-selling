import React from 'react';

const AllProduct = ({ product }) => {
    const { img, name, location, rsPrice, orgPrice, sellerName } = product;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="phone" className='h-56' /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Location: {location}</p>
                <p>Resell Price: ${rsPrice}</p>
                <p>Original Price: ${orgPrice}</p>
                <p>Seller Name: {sellerName}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default AllProduct;