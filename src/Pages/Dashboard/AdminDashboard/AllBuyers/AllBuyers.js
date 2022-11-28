import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../../Shared/Loading/Loading';

const AllBuyers = () => {
    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-silk.vercel.app/allbuyers',{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}` 
                 }
            });
            const data = await res.json();
            console.log(data)
            return data;
        }
    });

    const handleDelete = id => {
        const proceed = window.confirm(`Are you sure you want to delete`)
        if (proceed) {
            fetch(`https://assignment-12-server-silk.vercel.app/deleteuser/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Delete user Successfully');
                        refetch()
                    }

                })

        }
    }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">All buyers</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Buyer Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyers.map((buyer, i) => <tr key={buyer._id}>
                                <th>{i + 1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td><button className='btn btn-sm bg-red-600' onClick={() => handleDelete(buyer._id)}>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
};

export default AllBuyers;