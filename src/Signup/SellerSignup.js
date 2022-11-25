import { GoogleAuthProvider } from 'firebase/auth';
import React,{useContext, useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

const SellerSignup = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signUpError, setSignUPError] = useState('');
    const { createUser, signInGoogleHandler} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const handleSignUp = (data) =>{
       setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('Seller Created Successfully.')
                
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    
    const googleSignIn = () => {
        signInGoogleHandler(googleProvider)
            .then(result => {
                const users = result.user;
                console.log(users)
            })
            .catch(error => {
                console.log('error:', error)
                setSignUPError(error.message)
            })
    }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Sign Up As a Seller</h2>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Name</span></label>
                        <input type="text" {...register("name", {
                            required: "Name is Required"
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="email" {...register("email", {
                            required: true
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password" {...register("password", {
                            required: "Password is required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value="Sign Up" type="submit" />
                    {signUpError && <p className='text-red-600'>{signUpError}</p>}
                </form>
                <p>Already have an account <Link className='text-secondary' to="/userlogin">Please Login</Link></p>
                <div className="divider">OR</div>
                <button className='btn btn-outline w-full' onClick={googleSignIn}>CONTINUE WITH GOOGLE</button>
                <Toaster />
            </div>
        </div>
    );
};

export default SellerSignup;