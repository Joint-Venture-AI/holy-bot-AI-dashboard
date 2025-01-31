import React, { useState } from "react";
import { Button, Table } from "antd";
import Loading from "../Shared/Loading";
import { useGetAllQuestionsQuery } from "../../redux/features/questionApi";
import { Link, useNavigate } from "react-router-dom";

const Question = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  // Correctly passing pagination parameters to the query
  const { data: datas, isLoading } = useGetAllQuestionsQuery({
    page: currentPage,
    limit: pageSize,
  });

  // Check if the data is successfully fetched
  const users = datas?.data?.result || [];

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDetails = (record) => {
    navigate(`/questionDetails/${record._id}`); // Navigate to the details page with the question ID
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
      render: (text) => (text ? text.slice(0, 100) + "..." : "N/A"),
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
      <h3 className="text-2xl text-black mb-4 pl-2">
        All Questions And Answers
      </h3>
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
