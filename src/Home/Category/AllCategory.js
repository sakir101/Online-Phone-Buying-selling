import React from 'react';
import { Link } from 'react-router-dom';

const AllCategory = ({ category }) => {
    const {_id, name, desc } = category;
    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{desc}</p>
                <div className="card-actions justify-end">
                    <Link to={`/allproducts/${_id}`}><button className="btn btn-primary">See List</button></Link>
                </div>
            </div>
        </div>
    );
};

export default AllCategory;