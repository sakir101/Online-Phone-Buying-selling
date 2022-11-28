import React from 'react';
import dashboard from '../../../Asset/dashboard.png'

const Dashboard = () => {
    return (
        <div>
            <h1 className='text-3xl text-center my-3'>Dashboard</h1>
            <img src={dashboard} alt="" className='sm:h-48 lg:h-full'/>
        </div>
    );
};

export default Dashboard;