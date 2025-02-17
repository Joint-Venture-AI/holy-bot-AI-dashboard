import React, { useState } from "react";
import { Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import exlamIcon from "../../../assets/images/exclamation-circle.png";
import { useGetAllTransactionsQuery } from "../../../redux/features/transactionApi";
import Loading from "../../../Components/Shared/Loading";
import Papa from "papaparse";

const Earnings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { data: datas, isLoading } = useGetAllTransactionsQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // Check if the data is successfully fetched
  const users = datas?.data?.result || [];

  console.log(datas,'sdfsfdfdfd')

  const handlePaginationChange = (page, limit) => {
    setCurrentPage(page);
    setPageSize(limit);
  };

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Subscription ID",
      dataIndex: "subscriptionId",
      key: "subscriptionId",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "user",
      key: "user",
      render: (user) => user?.name || "Unknown",
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "user_email",
      render: (user) => user?.email || "N/A",
    },
    {
      title: "Subscription",
      dataIndex: "package",
      key: "package",
      render: (packageData) => packageData?.name || "N/A",
    },
    {
      title: "Amount",
      key: "amount",
      render: (text, record) => `$${record.amount || "0.00"}`,
    },
    {
      title: "Start Date",
      key: "startDate",
      render: (text, record) => new Date(record.startDate).toLocaleDateString(),
    },
    {
      title: "End Date",
      key: "endDate",
      render: (text, record) => new Date(record.endDate).toLocaleDateString(),
    },
    {
      title: "Status",
      key: "status",
      render: (text, record) => record.status || "Unknown",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, data) => (
        <div className="items-center justify-around textcenter flex">
          <img
            src={exlamIcon}
            alt=""
            className="btn px-3 py-1 text-sm rounded-full cursor-pointer"
            onClick={() => showModal(data)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  const handleDownload = () => {
    const data = {
      TransactionID: modalData._id,
      Date: modalData.startDate?.slice(0, 10),
      UserName: modalData.user?.name,
      Email: modalData.user?.email,
      Amount: `$${modalData.amount || "0.00"}`,
    };

    // Convert the data to CSV format
    const csv = Papa.unparse([data]);

    // Create a link element and trigger the download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `transaction_${modalData._id}.csv`; // Set the file name
    link.click();
  };

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Earnings</h3>
      <Table
        columns={columns}
        dataSource={users} // Use the filtered data
        rowClassName={() => "custom-row"}
        pagination={{
          pageSize: pageSize,
          total: datas?.meta?.total, // Update the pagination total count
          current: currentPage,
          defaultCurrent: 1,
          showSizeChanger: false,
          onChange: handlePaginationChange,
        }}
      />

      <DashboardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        maxWidth="500px"
        backgroundColor="bg-[#EDEAF3]"
      >
        <div>
          <h2 className="text-lg text-center mb-4">Subscriptation Details</h2>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>subscriptation ID:</p>
            <p>{modalData.subscriptionId}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Date:</p>
            <p>{modalData.startDate?.slice(0, 10)}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>User Name:</p>
            <p>{modalData.user?.name}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Email:</p>
            <p>{modalData.user?.email}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Amount:</p>
            <p>{`$${modalData.amount || "0.00"}`}</p>
          </div>

          <div className="p-4 mt-auto text-center mx-auto flex items-center justify-center">
            <button
              onClick={handleDownload} // Add onClick to trigger download
              className="w-fit bg-black text-white px-10 py-2 flex items-center justify-center gap-3 text-lg outline-none rounded-2xl"
            >
              <span className="text-white font-light">Download</span>
            </button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Earnings;
