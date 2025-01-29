import { Select } from "antd";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetTotalEarningQuery } from "../../../redux/features/dashboardApi";
import Loading from "../../../Components/Shared/Loading";

const BarChartComponent = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  const years = Array.from({ length: 12 }, (_, i) => currentYear - 10 + i);

  const { data, isLoading } = useGetTotalEarningQuery({ year });

  const selectedYearData = data?.data?.find(
    (item) => item._id === year.toString()
  );

  const chartData =
    selectedYearData?.earnings?.map((item) => ({
      name: item.month, // Month (e.g., 'Jan', 'Feb', etc.)
      totalAmount: item.totalAmount, // Amount for that month
    })) || [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="px-2 flex items-center justify-between">
        <h1 className="text-xl font-medium">Earnings</h1>
        <Select
          onChange={(value) => setYear(value)}
          value={year}
          className="w-32 h-[40px]"
        >
          {years
            .slice()
            .reverse() // Reverse the years array so recent years appear first
            .map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
        </Select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData} // Use chartData for the current year
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid horizontal vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}k`} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar dataKey="totalAmount" fill="#dd800c" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
