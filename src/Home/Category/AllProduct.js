import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllProduct = ({ product, setBookingProduct, setReportProduct }) => {
  const { img, name, location, rsPrice, orgPrice, sellerName, _id } = product;
  const [verify, setVerify] = useState("");

  useEffect(() => {
    fetch(
      `https://assignment-12-server-silk.vercel.app/checkverify/${product?.sellerEmail}`
    )
      .then((res) => res.json())
      .then((data) =>
        data.verify === "verified" ? setVerify(data.verify) : setVerify("")
      );
  }, [product?.sellerEmail]);

  return (
    <div>
      <div className="card  bg-base-100 shadow-xl">
        <Link to={`/categoryProductDetail/${_id}`}>
          <figure>
            <img
              src={img}
              alt="phone"
              className="h-56 transform transition-transform duration-500 hover:scale-110"
            />
          </figure>
        </Link>
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="card-title">{name}</h2>
            </div>
            <div className="bg-blue-300 rounded p-2">
              {verify ? <FaCheck /> : <FaTimes />}
            </div>
          </div>
          <p>Location: {location}</p>
          <p>Resell Price: ${rsPrice}</p>
          <p>Original Price: ${orgPrice}</p>
          <p>Seller Name: {sellerName}</p>
          <div className="card-actions justify-end">
            <label
              htmlFor="booking-modal"
              className="btn btn-primary"
              onClick={() => setBookingProduct(product)}
            >
              Book Now
            </label>

            <label
              htmlFor="report-modal"
              className="btn bg-red-700"
              onClick={() => setReportProduct(product)}
            >
              Report
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
