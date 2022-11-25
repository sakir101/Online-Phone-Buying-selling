import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const AllProducts = () => {
    const category = useLoaderData();
    const { name, categoryId } = category;
    const { data: availableProducts = [], isLoading } = useQuery({
        queryKey: ['availableProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/products');
            const data = await res.json();
            console.log(data);
            return data
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

        </div>
    );
};

export default AllProducts;