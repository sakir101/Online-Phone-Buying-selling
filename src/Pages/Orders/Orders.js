import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import Order from './Order';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch(`https://assignment-12-server-silk.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}` 
             }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user])
    return (
        <div className='w-full my-20'>
        {
            orders?.length? 
            orders.map(order => <Order key={order._id} order={order}></Order>):
            <p className='font-bold text-2xl text-red-700 text-center'>No Orders To Show</p>
        }

    </div>
    );
};

export default Orders;