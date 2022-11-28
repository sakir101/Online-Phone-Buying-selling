import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../../../Shared/Loading/Loading';
import toast, { Toaster } from 'react-hot-toast';

const AllReport = () => {
    const { data: reports = [], refetch, isLoading } = useQuery({
        queryKey: ['reports'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allreports',{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}` 
                 }
            });
            const data = await res.json();
            console.log(data)
            return data;
        }
    });

    const handleDelete = (id, idReport) => {
        console.log(id)
        const proceed = window.confirm(`Are you sure you want to delete`)
        if (proceed) {
            fetch(`http://localhost:5000/deleteproducts/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast('Delete Product Successfully');
                        deleteReport(idReport,id)
                    }

                })
                .catch(err=>console.log(err))

        }
    }

    const deleteReport = (idReport,id) =>{
        const proceed = window.confirm(`Are you sure you want to delete`)
        if (proceed) {
        fetch(`http://localhost:5000/deletereport/${idReport}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        deleteReportAd(id)
                    }

                })
            }
    }

    const deleteReportAd = (id) =>{
        const proceed = true
        if (proceed) {
        fetch(`http://localhost:5000/deleteReportAd/${id}`, {
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

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className="text-2xl">All reports</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>reported Item</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reports.map((report, i) => <tr key={report._id}>
                                <th>{i + 1}</th>
                                <td>{report.itemName}</td>
                                <td>{report.buyerName}</td>
                                <td>{report.buyerEmail}</td>
                                <td>{report.desc}</td>
                                <td><button className='btn btn-sm bg-red-600' onClick={() => handleDelete(report.productId, report._id)}>Delete</button></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <Toaster />
        </div>
    );
};

export default AllReport;