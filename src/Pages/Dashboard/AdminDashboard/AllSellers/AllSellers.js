import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../../Shared/Loading/Loading';

const AllSellers = () => {
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allsellers');
            const data = await res.json();
            console.log(data)
            return data;
        }
    });

    const handleVerify = email =>{
        const update = {
            verify: 'verified'
        }

        fetch(`http://localhost:5000/sellerverify/${email}`,{
            method: 'PATCH',
            headers:{
                'content-type': 'application/json',
            },
            body: JSON.stringify(update)

        })
        .then(res=>res.json())
        .then(data=>{
            if (data.modifiedCount > 0) {
                toast('Update data successfully')
                refetch()
               
            }
        })
        .catch(err => console.log(err))
    }

    if(isLoading){
        return <Loading></Loading>
    }

    const handleDelete = id => {
        const proceed = window.confirm(`Are you sure you want to delete`)
        if (proceed) {
            fetch(`http://localhost:5000/deleteuser/${id}`, {
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
   
    
    return (
        <div>
        <h2 className="text-2xl">All Sellers</h2>
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Seller Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller, i) => <tr key={seller._id}>
                            <th>{i+1}</th>
                            <td>{seller.name}</td>
                            <td>{seller.email}</td>
                            {
                                seller.verify === 'none'? <button className='btn btn-sm bg-orange-600 my-3' onClick={()=> handleVerify(seller.email)}>verify</button>:
                                <p className='font-bold text-blue-700 my-3'>verified</p> 
                            }
                            <td><button className='btn btn-sm bg-red-600' onClick={()=>handleDelete(seller._id)}>Delete</button></td>
                        </tr>)
                    }

                </tbody>
            </table>
        </div>
        <Toaster />
    </div>
    );
};

export default AllSellers;