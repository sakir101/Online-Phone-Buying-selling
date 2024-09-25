import React, { useContext, useState, useEffect } from "react";

import Product from "./Product";
import { AuthContext } from "../../Contexts/AuthProvider";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";

const Products = () => {
  const [bookingProduct, setBookingProduct] = useState(null);
  const [reportProduct, setReportProduct] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://assignment-12-server-silk.vercel.app/advertiseProduct",
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(res.data);
        setAvailableProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />; // Show loading indicator
  }

  return (
    <div className="w-full p-5">
      <div className="mt-16 text-center">
        <h3 className="text-xl font-bold text-cyan-800 uppercase text-center">
          Our Products
        </h3>
        <h2 className="text-3xl text-center">Find Your Favorite One's</h2>
      </div>
      <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7">
        {availableProducts.length ? (
          availableProducts.map((product) => (
            <Product
              key={product._id}
              product={product}
              setBookingProduct={setBookingProduct}
              setReportProduct={setReportProduct}
            />
          ))
        ) : (
          <p className="text-red-600 font-bold text-center text-2xl">
            No Advertise Product to show
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
