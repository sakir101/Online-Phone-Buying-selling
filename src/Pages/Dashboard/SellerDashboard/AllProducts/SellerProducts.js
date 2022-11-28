import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../../Shared/Loading/Loading';

const SellerProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://assignment-12-server-silk.vercel.app/allproducts/${user?.email}`,{
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
            fetch(`https://assignment-12-server-silk.vercel.app/deleteproduct/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Delete Product Successfully');
                        deleteAdvertise(id);
                        refetch()
                    }

                })

        }
    }

    const handleAdvertise = (product, id) => {
        const advertiseItem = {
            productID: id,
            name: product.name,
            img: product.img,
            location: product.location,
            rsPrice: product.rsPrice,
            orgPrice: product.orgPrice,
            yearOfUse: product.yearOfUse,
            sellerName: product.sellerName,
            categoryId: product.categoryId,
            payment: product.payment,
            phoneNumber: product.phoneNumber,
            condition: product.condition,
            purchaseyear: product.purchaseyear,
            sellerEmail: product.sellerEmail,
            desc: product.desc
        }

        fetch(`https://assignment-12-server-silk.vercel.app/addadvertise/${id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                
            },
            body: JSON.stringify(advertiseItem)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast('Product successfully advertised');
                    refetch()
                }
                
            })
            .catch(err => console.error(err));
    }

    const deleteAdvertise=(id)=>{
        const proceed = true
        console.log(id);
        if (proceed) {
            fetch(`https://assignment-12-server-silk.vercel.app/deleteadvertise/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch()
                    }

                })

        }
    }

   

    if (isLoading) {
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
                                    product?.advertise ?
                                    <span className='mx-3 my-3 text-blue-500'>Advertised</span>
                                     :<button className='btn btn-sm bg-red-600 my-3 mx-3' onClick={() => handleAdvertise(product, product._id)}>Advertise</button>
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

export default SellerProducts;