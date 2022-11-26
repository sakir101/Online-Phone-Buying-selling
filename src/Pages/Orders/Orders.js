import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import Order from './Order';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
           
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [user])
    return (
        <div className='w-full'>
        {
            orders?.length? 
            orders.map(order => <Order key={order._id} order={order}></Order>):
            <p className='font-bold text-2xl text-red-700 text-center'>No Orders To Show</p>
        }

    </div>
    );
};

export default Orders;