import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../../../Components/Shared/Loading";
import {
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
} from "../../../redux/features/packageApi";
import { IoMdArrowBack } from "react-icons/io";
import Swal from "sweetalert2";

const EditSubscription = () => {
  const { id } = useParams(); // Get ID from URL
  const { data, isLoading } = useGetSinglePackageQuery(id); // Fetch subscription by ID
  const router = useNavigate();
  const [dataUpdate] = useUpdatePackageMutation();

  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [packageExpiration, setPackageExpiration] = useState("");
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");

  // Populate form with fetched data
  useEffect(() => {
    if (!isLoading && data?.data) {
      setPackageName(data.data.name || "");
      setPackageAmount(data.data.unitAmount || "");
      setPackageExpiration(data.data.interval || "");
      setFeatures(data.data.description || []);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <Loading />;
  }

  // const handleAddFeature = () => {
  //   if (newFeature.trim()) {
  //     setFeatures([...features, newFeature]);
  //     setNewFeature("");
  //   }
  // };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      // Update state with the new feature added
      setFeatures((prevFeatures) => {
        const updatedFeatures = [...prevFeatures, newFeature];
        return updatedFeatures;
      });
      setNewFeature(""); // Clear the input field after adding
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleUpdate = async () => {
    try {
      const value = {
        name: packageName,
        unitAmount: Number(packageAmount),
        interval: packageExpiration,
        description: features,
      };

      const res = await dataUpdate({ id, value }).unwrap();

      if (res) {
        Swal.fire({
          title: "Success!",
          text: "Package Updated successfully",
          icon: "success",
        });
        // router("/subscription");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error?.data?.message ||
          "An error occurred while creating the package",
      });
    }
  };

  return (
    <div className="w-full mx-auto p-6 ">
      <div>
        <button
          className="bg-gray-200 rounded-md px-5 py-2 text-sm font-medium"
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <IoMdArrowBack className="size-5" />
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Subscription</h1>
      <div className="space-y-6">
        {/* Package Name and Amount */}
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="package-name" className="text-sm font-medium mb-1">
              Package Name
            </label>
            <input
              id="package-name"
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="border rounded-md p-2 text-sm"
            />
          </div>
          <div className="flex flex-col w-full">
            <label
              htmlFor="package-amount"
              className="text-sm font-medium mb-1"
            >
              Package Amount
            </label>
            <input
              id="package-amount"
              type="number"
              value={packageAmount}
              onChange={(e) => setPackageAmount(e.target.value)}
              className="border rounded-md p-2 text-sm"
            />
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <label
            htmlFor="package-expiration"
            className="text-sm font-medium mb-1"
          >
            Package Expiration
          </label>
          <select
            id="package-expiration"
            className="border rounded-md p-2 text-sm"
            value={packageExpiration}
            onChange={(e) => setPackageExpiration(e.target.value)}
          >
            <option value="">Select Expiration</option>
            <option value="week">1 week</option>
            <option value="month">1 Month</option>
            <option value="half-year">6 Months</option>
            <option value="year">1 Year</option>
          </select>
        </div>

        {/* Package Features */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Package Features</label>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={feature}
                readOnly
                className="border rounded-md p-2 text-sm flex-grow"
              />
              <button
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 font-bold"
              >
                &times;
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add new feature"
              className="border rounded-md p-2 text-sm flex-grow"
            />
            <button
              onClick={handleAddFeature}
              className="bg-gray-200 rounded-md px-3 py-1 text-sm font-medium"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Update Button */}
      <div className="w-1/4 mx-auto mt-8">
        <button
          onClick={handleUpdate}
          className="bg-orange-500 text-white rounded-md px-4 py-2 font-medium w-full hover:bg-orange-600 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditSubscription;
