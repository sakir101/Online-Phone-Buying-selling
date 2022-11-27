import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const ReportModal = ({ reportProduct, setReportProduct }) => {
    const { _id, img, name, location, rsPrice, orgPrice, sellerName } = reportProduct;
    const { user } = useContext(AuthContext);
    const [username, setUsername] = useState('')

    useEffect(()=>{
        fetch(`http://localhost:5000/alluser/${user?.email}`)
        .then(res=> res.json())
        .then(data=> setUsername(data.name))
    },[user?.email])

    const handleReport = event => {
        event.preventDefault();
        const form = event.target;
        const username = form.name.value;
        const email = form.email.value;
       const desc = form.desc.value;
        const reporting = {
            itemName: name,
            productId: _id,
            buyerName: username,
            buyerEmail: email,
            desc
        }
        fetch('http://localhost:5000/reportingphone', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(reporting)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setReportProduct(null);
                    toast.success('Report confirmed');
                   
                }
                else {
                    toast.error(data.message);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="report-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="report-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <form onSubmit={handleReport} className='grid grid-cols-1 gap-3 mt-10'>
                        <label htmlFor="">User Name</label>
                        <input name="name" type="text" defaultValue={username} disabled placeholder="Your Name" className="input w-full input-bordered" />
                        <label htmlFor="">User Email</label>
                        <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered" />
                        <label htmlFor="">Product Price</label>
                        <textarea name='desc' placeholder="Your Report" className="textarea textarea-info h-24 w-full" required></textarea>
                        
                       
                        
                        <br />
                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                    </form>
                    <Toaster />
                </div>
            </div>
        </div>
    );
};

export default ReportModal;