import { Table } from "antd";
import { useFetchUsersQuery } from "../redux/features/userSlice";
import { useState } from "react";

const DashboardHomeTable = () => {
  const { data, isLoading } = useFetchUsersQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  // Check if the data is successfully fetched
  const users = data?.data?.result || [];

  const handlePaginationChange = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <a>{index + 1}</a>, // Display index + 1 as the serial number
    },

    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        const isExternalImage =
          image.startsWith("http") || image.startsWith("https");
        return isExternalImage ? (
          <img
            src={image}
            alt="product"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          <img
            src={`${import.meta.env.VITE_BASE_URL}${image}`}
            alt="product"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        );
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "Address",
      render: (text, record) => record.status, // If Address is the status in your data structure
    },
  ];

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Recent Users</h3>
      {/* Ant Design Table */}

      <Table
        columns={columns}
        dataSource={users} // Use the filtered data
        rowClassName={() => "custom-row"}
        pagination={{
          pageSize: pageSize,
          total: data?.meta?.total, // Update the pagination total count
          current: currentPage,
          defaultCurrent: 1,
          showSizeChanger: false,
          onChange: handlePaginationChange,
        }}
      />
    </div>
  );
};

export default DashboardHomeTable;
