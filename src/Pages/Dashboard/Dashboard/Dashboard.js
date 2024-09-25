import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import Loading from "../../../Shared/Loading/Loading";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    if (user?.email) {
      setLoading(true); // Set loading to true when fetching starts
      fetch(
        `https://assignment-12-server-silk.vercel.app/alluser/${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch(() => setLoading(false)); // Handle any errors by stopping loading
    } else {
      setLoading(false); // Stop loading if no user email is found
    }
  }, [user?.email]);

  // Conditionally render the content based on the loading state
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center bg-white py-10 w-full">
      {/* User Information Card */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, <span className="text-blue-700">{userData?.name}</span>!
        </h1>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Email:</span> {userData?.email}
        </p>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Role:</span> {userData?.role || "N/A"}
        </p>
      </div>

      {/* Extra Information (Optional) */}
      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Recent Activities
            </h3>
            <p className="text-gray-600">No recent activities to show.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-5">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Your Statistics
            </h3>
            <p className="text-gray-600">No statistics available.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
