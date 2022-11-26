import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
const Payment = () => {
    const orderPay = useLoaderData();
    const {productPrice, itemName} = orderPay;
    return (
        <div>
            <h1 className='text-4xl font-bold text-center'>Payment</h1>
            <h2 className='text-2xl my-5'>You need to pay <strong className='text-red-500'>${productPrice}</strong> for {itemName}</h2>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        orderPay={orderPay}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;