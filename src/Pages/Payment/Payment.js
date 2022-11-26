import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const {orgPrice, name} = useLoaderData();
    return (
        <div>
            <h1 className='text-4xl font-bold text-center'>Payment</h1>
            <h2 className='text-2xl my-5'>You need to pay <strong className='text-red-500'>${orgPrice}</strong> for {name}</h2>
        </div>
    );
};

export default Payment;