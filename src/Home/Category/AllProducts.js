import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import AllProduct from './AllProduct';


const AllProducts = () => {
    const { name, categoryId } = useLoaderData();
    const [products, setProducts] = useState([]);

    const { data: availableProducts = [], isLoading } = useQuery({
        queryKey: ['availableProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allproducts');
            const data = await res.json();
            const p = data.filter(x => x.categoryId === categoryId)
            setProducts(p)
            return data
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }



    return (
        <div>
            <div>
                <h1 className='text-4xl font-bold text-center'>{name}</h1>
            </div>
            <div className='grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7'>
                {
                    products?.length &&
                    products.map(product => <AllProduct key={product._id} product={product}></AllProduct>)
                }

            </div>
        </div>

    );
};

export default AllProducts;