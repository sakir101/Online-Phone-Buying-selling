import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { FaCheck, FaTimes } from "react-icons/fa";

const Product = ({ product, setBookingProduct, setReportProduct }) => {
  const { img, name, location, rsPrice, orgPrice, sellerName, _id } = product;
  const { user } = useContext(AuthContext);
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
      <div className="card bg-base-100 shadow-xl">
        <Link to={`/productDetail/${_id}`}>
          <figure className="overflow-hidden">
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
          <p>Resell Price: {rsPrice}</p>
          <p>Original Price: {orgPrice}</p>
          <p>Seller Name: {sellerName}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
