import React from 'react';

const Category = () => {
    return (
        <div>
            <div className='mt-16 text-center'>
                <h3 className='text-xl font-bold text-cyan-800 uppercase'>Our Categories</h3>
                <h2 className='text-3xl'>Find Your Category</h2>
            </div>
            <div className='grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7'>
                {
                    availableProducts.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>
    );
};

export default Category;