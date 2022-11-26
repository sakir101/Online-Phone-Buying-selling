import React, { useContext } from 'react';
import { AuthContext } from '../../../../Contexts/AuthProvider';

const AddProducts = () => {
    const {user} = useContext(AuthContext);
    const handlePlaceService = event => {
        event.preventDefault();
        const form = event.target;
        const productName = form.title.value;
        const orgPrice = form.orgprice.value;
        const rsPrice = form.rsprice.value;
        const img = form.img.value;
        const phoneNumber = form.phoneNumber.value;
        const condition = form.condition.value;
        const category = form.category.value;
        const purchaseyear = form.purchaseyear.value;
        const email = form.email.value;
        const desc = form.desc.value;
    }
    return (
        <form className='w-full text-center p-10' onSubmit={handlePlaceService}>
            <h3 className='text-3xl text-blue-600 text-center'>Add Your Product</h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-6 my-6 mx-auto'>
                <input type="text" name='title' placeholder="Title of the Product" className="input input-bordered input-primary w-full" required />
                <input type="text" name='orgprice' placeholder="Original Price" className="input input-bordered input-primary w-full" required />
                <input type="text" name='rsprice' placeholder="Resell Price" className="input input-bordered input-primary w-full" required />
                <input type="text" name='img' placeholder="Photo Url" className="input input-bordered input-primary w-full" />
                <input type="text" name='phoneNumber' placeholder="Mobile Number" className="input input-bordered input-primary w-full" required />
                <label htmlFor="" className='text-start'>City Name <select name="location" className="select select-bordered select-primary w-full">

                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>



                </select></label>
                <label htmlFor="" className='text-start'>Select Condition <select name="condition" className="select select-bordered select-primary w-full">

                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>

                </select></label>
                <label htmlFor="" className='text-start'>Select Category <select name="category" className="select select-bordered select-primary w-full">

                    <option value="1">First Category</option>
                    <option value="2">Second Category</option>
                    <option value="3">Third Category</option>

                </select></label>
                <input type="text" name='purchaseyear' placeholder="Year of Purchase" className="input input-bordered input-primary w-full" required />
                <input type="text" name='email' placeholder="User Email" defaultValue={user?.email} className="input input-bordered input-primary w-full" disabled/>

            </div>
            <textarea name='desc' placeholder="Product desc" className="textarea textarea-info h-24 w-full" required></textarea>
            <button className='btn btn-info my-5'>Submit</button>

        </form>
    );
};

export default AddProducts;