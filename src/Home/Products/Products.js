import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import Product from './Product';

const Products = () => {
    const { data: availableProducts = [], isLoading } = useQuery({
        queryKey: ['availableProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <div className='mt-16 text-center'>
                <h3 className='text-xl font-bold text-cyan-800 uppercase'>Our Products</h3>
                <h2 className='text-3xl'>Find Your Favorite One's</h2>
            </div>
            <div className='grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7'>
                {
                    availableProducts.map(product => <Product key={product._id} product={product}></Product>)
                }
            </div>
        </div>

    );
};

export default Products;