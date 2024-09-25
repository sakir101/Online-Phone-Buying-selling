import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import BookingModal from "../BookingModal/BookingModal";
import ReportModal from "../ReportModal/ReportModal";
import AllProduct from "./AllProduct";

const AllProducts = () => {
  const [bookingProduct, setBookingProduct] = useState(null);
  const [reportProduct, setReportProduct] = useState(null);
  const { name, categoryId } = useLoaderData();
  const [products, setProducts] = useState([]);

  const {
    data: availableProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["availableProducts"],
    queryFn: async () => {
      const res = await fetch(
        "https://assignment-12-server-silk.vercel.app/products"
      );
      const data = await res.json();
      const p = data.filter((x) => x.categoryId === categoryId);
      setProducts(p);
      return data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full p-5">
      <div>
        <h1 className="text-xl font-bold text-cyan-800 text-center">{name}</h1>
      </div>
      <div className="grid gap-[34px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto my-7">
        {products?.length ? (
          products.map((product) => (
            <AllProduct
              key={product._id}
              product={product}
              setBookingProduct={setBookingProduct}
              setReportProduct={setReportProduct}
            ></AllProduct>
          ))
        ) : (
          <div>
            <p className="text-red-600 font-bold text-center text-2xl">
              No product to show
            </p>
          </div>
        )}
      </div>
      {bookingProduct && (
        <BookingModal
          bookingProduct={bookingProduct}
          setBookingProduct={setBookingProduct}
        ></BookingModal>
      )}
      {reportProduct && (
        <ReportModal
          reportProduct={reportProduct}
          setReportProduct={setReportProduct}
        ></ReportModal>
      )}
    </div>
  );
};

export default AllProducts;
