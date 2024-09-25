import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import BookingModal from "../BookingModal/BookingModal";
import ReportModal from "../ReportModal/ReportModal";

const CategoryProductDetail = () => {
  const [bookingProduct, setBookingProduct] = useState(null);
  const [reportProduct, setReportProduct] = useState(null);
  const {
    name,
    img,
    location,
    rsPrice,
    orgPrice,
    yearOfUse,
    sellerName,
    phoneNumber,
    condition,
    purchaseyear,
    sellerEmail,
    desc,
  } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/2">
          <img
            src={img}
            alt={name}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mt-4 md:mt-0">{name}</h1>
          <p className="text-gray-600 mt-2">Location: {location}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-semibold text-green-600">
              {rsPrice}
            </span>
            <span className="text-lg line-through text-gray-500">
              {orgPrice}
            </span>
          </div>
          <p className="mt-2 text-gray-600">Condition: {condition}</p>
          <p className="mt-2 text-gray-600">Year of Use: {yearOfUse}</p>
          <p className="mt-2 text-gray-600">Seller: {sellerName}</p>
          <p className="mt-2 text-gray-600">Phone: {phoneNumber}</p>
          <p className="mt-2 text-gray-600">Email: {sellerEmail}</p>
          <p className="mt-2 text-gray-600">Purchase Year: {purchaseyear}</p>
          <div className="flex  my-5">
            <label
              htmlFor="booking-modal"
              className="btn btn-primary btn-sm"
              onClick={() => setBookingProduct(useLoaderData)}
            >
              Book Now
            </label>

            <label
              htmlFor="report-modal"
              className="btn bg-red-700 btn-sm mx-4"
              onClick={() => setReportProduct(useLoaderData)}
            >
              Report
            </label>
          </div>
        </div>
      </div>
      <div className="my-5 text-justify">
        <p className="mt-4 text-gray-700">{desc}</p>
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

export default CategoryProductDetail;
