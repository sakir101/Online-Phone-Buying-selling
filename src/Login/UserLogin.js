import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import useToken from "../hooks/useToken";

const UserLogin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { signIn } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from, { replace: true });
  }

  const handleLogin = (data) => {
    setLoginError("");
    signIn(data.email, data.password)
      .then((result) => {
        toast("Login Successfully.");
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="w-96 p-3 my-8">
        <div className="py-7 px-4 border-2 border-solid border-gray-300 mb-5 bg-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-center">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters or longer",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />

              {errors.password && (
                <p className="text-red-600">{errors.password?.message}</p>
              )}
            </div>
            <div className="flex justify-center mx-auto">
              <input
                className="btn btn-accent btn-md mt-4"
                value="Login"
                type="submit"
              />
            </div>
            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </form>
        </div>
        <p className="text-center">
          New to Mobile Hunter{" "}
          <Link className="text-secondary" to="/usersignup">
            Create new Account as Buyer
          </Link>
        </p>
        <p className="text-center">
          New to Mobile Hunter{" "}
          <Link className="text-secondary" to="/sellersignup">
            Create new Account as Seller
          </Link>
        </p>

        <Toaster />
      </div>
    </div>
  );
};

export default UserLogin;
