import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGetAllPackagesQuery } from "../../../redux/features/packageApi";
import Loading from "../../../Components/Shared/Loading";

export default function Subscription() {
  const { data, isLoading } = useGetAllPackagesQuery();
  const navigate = useNavigate();
  if (isLoading) {
    return <Loading />;
  }

  // Ensure data is available
  const plans =
    data?.data?.map((plan) => ({
      id: plan._id,
      title: plan.name, // "Premium Package" / "Basic Package"
      price: `$${plan.unitAmount}`, // "$50.99"
      billing: plan.interval === "year" ? "Yearly" : "Monthly", // "year" => "Yearly"
      features: plan.description || [], // Ensure it's an array
    })) || [];

  const handleDetails = (plan) => {
    navigate(`/settings/editSubscription/${plan.id}`); // ✅ Correct usage
  };
  return (
    <div>
      <div className="flex justify-end">
        <Link to={"/add-package"}>
          <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition">
            Add Package
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
          {plans?.map((plan, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6"
            >
              <h3 className="text-2xl font-bold text-center mb-4">
                {plan?.title}
              </h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{plan?.price}</span>
                <span className="text-gray-500">/ {plan?.billing}</span>
              </div>
              <ul className="space-y-4 mb-6">
                {plan?.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-orange-500 mr-2">✔</span>
                    <p className="text-gray-600">{feature}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDetails(plan)}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
