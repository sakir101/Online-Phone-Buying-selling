import React, { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
  const { _id, img, name, rsPrice } = bookingProduct;
  const { user } = useContext(AuthContext);
  console.log(user);
  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const username = form.name.value;
    const email = form.email.value;
    const rawPrice = form.price.value;
    const price = Number(rawPrice.replace(/[, ]|BDT/g, ""));
    const phnNumber = form.phone.value;
    const meet = form.meetingLocation.value;
    const booking = {
      itemName: name,
      productId: _id,
      buyerName: username,
      buyerEmail: email,
      productPrice: price,
      phoneNumber: phnNumber,
      meet,
      image: img,
    };
    fetch("https://assignment-12-server-silk.vercel.app/bookingphone", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setBookingProduct(null);
          toast.success("Booking confirmed");
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <label htmlFor="">User Name</label>
            <input
              name="name"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Your Name"
              className="input w-full input-bordered"
            />
            <label htmlFor="">User Email</label>
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email Address"
              className="input w-full input-bordered"
            />
            <label htmlFor="">Product Price</label>
            <input
              name="price"
              type="text"
              defaultValue={rsPrice}
              disabled
              placeholder="Product Price"
              className="input w-full input-bordered"
            />
            <label htmlFor="">User Phone Number</label>
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
              required
            />
            <label htmlFor="">Meeting Location</label>
            <input
              name="meetingLocation"
              type="text"
              placeholder="Meeting Location"
              className="input w-full input-bordered"
              required
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
