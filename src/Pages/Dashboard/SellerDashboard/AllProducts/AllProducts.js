import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../../Shared/Loading/Loading';

const AllProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allproducts/${user?.email}`);
            const data = await res.json();
            console.log(data)
            return data;
        }
    });
    const handleDelete = id => {
        const proceed = window.confirm(`Are you sure you want to delete`)
        if (proceed) {
            fetch(`http://localhost:5000/deleteproduct/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Delete Product Successfully');
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
            <h2 className="text-2xl">All Products</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            products.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>{product.name}</td>
                                <td>{product.orgPrice}</td>
                                <td>{product.payment}</td>
                                <button className='btn btn-sm bg-red-600 my-3' onClick={() => handleDelete(product._id)}>Delete</button>
                                {
                                    product.payment==='none'&& <button className='btn btn-sm bg-red-600 my-3 mx-3'>Advertise</button>
                                }
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
};

export default AllProducts;