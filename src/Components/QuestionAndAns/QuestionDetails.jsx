import { Card, Col, Row, Typography } from "antd";
import React from "react";
import { useGetSingleQuestionQuery } from "../../redux/features/questionApi";
import { Link, useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import { IoArrowBack } from "react-icons/io5";

const { Title, Paragraph } = Typography;

function QuestionDetails() {
  const { id } = useParams();
  const { data } = useGetSingleQuestionQuery(id);

  if (!data) {
    return <Loading />;
  }

  return (
    <div>
      <Link to={"/question"}>
        <div className="flex items-center gap-2 mb-4">
          <IoArrowBack className="size-7" />
          <h1>Question Details</h1>
        </div>
      </Link>
      <div style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
        <Row justify="center">
          <Col xs={24} sm={18} md={12} lg={8}>
            <Card
              hoverable
              bordered={false}
              style={{
                width: "100%",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
              }}
            >
              <Title level={3}>{data?.data?.question}</Title>
              <Paragraph>{data?.data?.answer}</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default QuestionDetails;
