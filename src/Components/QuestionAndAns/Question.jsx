import React, { useState } from "react";
import { Button, Input, Table } from "antd";
import Loading from "../Shared/Loading";
import { useGetAllQuestionsQuery } from "../../redux/features/questionApi";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Question = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchQuestion, setSearchQuestion] = useState("");
  const [searchTermEmail, setSearchTermEmail] = useState("");
  const [searchTermQuestion, setSearchTermQuestion] = useState("");
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
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            className="bg-[#F6FAFF] text-[#023F86]"
            onClick={() => handleDetails(record)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <div className="flex justify-between gap-2">
        <div>
          <button className="bg-[#DD800C] text-white h-10 w-60 flex items-center justify-center rounded-full shadow-md cursor-pointer">
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
          <Button type="primary" onClick={handleSearch}>
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
    </div>
  );
};

export default Question;
