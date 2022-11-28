import React from 'react';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import AllCategory from './AllCategory';

const Category = () => {
    const { data: availableCategory = [], isLoading } = useQuery({
        queryKey: ['availableCategories'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-silk.vercel.app/category');
            const data = await res.json();
            return data
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-full p-5'>
            <div className='mt-16 '>
                <h3 className='text-xl font-bold text-cyan-800 uppercase text-center'>Our Categories</h3>
                <h2 className='text-3xl text-center'>Find Your Category</h2>
            </div>
            <div className='grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7'>
                {
                    availableCategory?.length &&
                    availableCategory.map(category => <AllCategory key={category._id} category={category}></AllCategory>)
                }
            </div>
        </div>
    );
};

export default Category;