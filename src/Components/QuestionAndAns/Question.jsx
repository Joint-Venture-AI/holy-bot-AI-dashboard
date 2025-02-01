import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import Loading from "../Shared/Loading";
import { useGetAllQuestionsQuery } from "../../redux/features/questionApi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import DashboardModal from "../DashboardModal";
import exlamIcon from "../../assets/images/exclamation-circle.png";
import Papa from "papaparse";

const Question = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchQuestion, setSearchQuestion] = useState("");
  const [searchTermEmail, setSearchTermEmail] = useState("");
  const [searchTermQuestion, setSearchTermQuestion] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();

  // Fetch data with the confirmed search terms
  const { data: datas, isLoading } = useGetAllQuestionsQuery({
    page: currentPage,
    limit: pageSize,
    email: searchTermEmail,
    question: searchTermQuestion,
  });

  const users = datas?.data?.result || [];

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = () => {
    setSearchTermEmail(searchEmail);
    setSearchTermQuestion(searchQuestion);
  };

  const handleDetails = (record) => {
    navigate(`/questionDetails/${record._id}`);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "_id",
      key: "_id",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      render: (text) => (text ? text.slice(0, 50) + "..." : "N/A"),
    },
    {
      title: "Answer",
      dataIndex: "answer",
      key: "answer",
      render: (text) => (text ? text.slice(0, 100) + "..." : "N/A"),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      //   render: (_, record) => (
      //     <div style={{ display: "flex", gap: "8px" }}>
      //       <Button
      //         className="bg-[#F6FAFF] text-[#023F86]"
      //         onClick={() => handleDetails(record)}
      //       >
      //         View
      //       </Button>
      //     </div>
      //   ),

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

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };
  console.log(datas, "datas");
  const handleDownload = () => {
    if (!modalData) return;

    const data = [
      {
        Question: modalData.question || "N/A",
        Answer: modalData.answer || "N/A",
        UserName: modalData.user?.name || "Anonymous",
        UserEmail: modalData.user?.email || "N/A", // Add more fields if needed
      },
    ];

    console.log(data, "data");

    // Convert the data to CSV format
    const csv = Papa.unparse(data);

    // Create a link element and trigger the download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `question_${modalData._id}.csv`; // Set the file name
    document.body.appendChild(link); // Append to body to ensure proper triggering
    link.click();
    document.body.removeChild(link); // Clean up after download
  };

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <div className="flex justify-between gap-2">
        <div>
          <button className=" text-black h-10 w-60 flex items-center justify-center rounded-full">
            All Questions and Answers
          </button>
        </div>
        <div className="flex gap-2 my-2">
          <Input
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            style={{ width: "250px", height: "40px" }}
            prefix={<CiSearch />}
          />
          <Input
            placeholder="Search by Question"
            value={searchQuestion}
            onChange={(e) => setSearchQuestion(e.target.value)}
            style={{ width: "250px", height: "40px" }}
            prefix={<CiSearch />}
          />
          <Button type="" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        rowClassName={() => "custom-row"}
        pagination={{
          pageSize: pageSize,
          total: datas?.data?.meta?.total,
          current: currentPage,
          showSizeChanger: true,
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
            <p>User Email :</p>
            <p>{modalData.user?.email}</p>
          </div>

          <div className="flex justify-between mb-6 text-gray-600">
            <p>User Name:</p>
            <p>{modalData.user?.name}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Question:</p>
            <p>{modalData.question}</p>
          </div>
          <div className="flex justify-between mb-6 text-gray-600">
            <p>Answer:</p>
            <p>{modalData.answer}</p>
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

export default Question;
