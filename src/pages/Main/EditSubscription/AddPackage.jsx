import React, { useState } from "react";
import { useCreatePackageMutation } from "../../../redux/features/packageApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddPackage = () => {
  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [packageExpiration, setPackageExpiration] = useState("");
  const [features, setFeatures] = useState(["View Members Directory"]);
  const [newFeature, setNewFeature] = useState("");
  const router = useNavigate();

  const [createPackage] = useCreatePackageMutation();

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures((prevFeatures) => [...prevFeatures, newFeature]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures((prevFeatures) => prevFeatures.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const value = {
        name: packageName,
        unitAmount: Number(packageAmount),
        interval: packageExpiration,
        description: features,
      };

      const res = await createPackage(value).unwrap();

      if (res) {
        Swal.fire({
          title: "Success!",
          text: "Package created successfully",
          icon: "success",
        });
        router("/subscription");
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
    <div className="w-full mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Add Package</h1>
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
              placeholder="Enter package name"
              className="border rounded-md p-2 text-sm"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
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
              placeholder="Enter package amount"
              className="border rounded-md p-2 text-sm"
              value={packageAmount}
              onChange={(e) => setPackageAmount(e.target.value)}
            />
          </div>
        </div>

        {/* Package Expiration */}
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
                aria-label={`Remove feature: ${feature}`}
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
              aria-label="Add feature"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="w-1/4 mx-auto mt-8">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white rounded-md px-4 py-2 font-medium w-full hover:bg-orange-600 transition"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default AddPackage;
