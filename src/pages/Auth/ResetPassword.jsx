import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/reset-pass.png";

import PageHeading from "../../Components/PageHeading";
import { useDispatch } from "react-redux";
import {
  useChangePasswordMutation,
  useResetPasswordMutation,
} from "../../redux/features/authSlice";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mutation, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Failed !!",
        text: "Password doesn't match!",
      });
    }

    try {
      const res = mutation(values).unwrap();

      if (res) {
        navigate("/");
      }

      if (res) {
        Swal.fire({
          icon: "success",
          title: `Password Changed Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: `${error.data.message}`,
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[96%] lg:p-[10%] ">
        <img src={image} alt="" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px] space-y-8">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={-1}
              title={"Set new password"}
              disbaledBackBtn={true}
            />
            <p className=" drop-shadow text-[#464343] mt-5">
              Your password must be 8-10 characters long.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            requiredMark={false}
            onFinish={onFinish}
          >
            <Form.Item
              label={
                <span className="font-medium text-base">New Password</span>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input new password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-medium text-base">
                  Confirm New Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please Re-Enter the password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <div className="w-full flex justify-center pt-4 ">
              <Button
                // disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2 "
              >
                Reset Password
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
