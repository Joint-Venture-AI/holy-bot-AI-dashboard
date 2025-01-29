import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/images/reset-pass.png";

import Swal from "sweetalert2";
import { useLoginMutation } from "../../redux/features/authSlice";

// import { setUser } from "../../redux/features/Auth/authSlice";
// import Swal from "sweetalert2";

const SignIn = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onFinish = async (values) => {
    const userInfo = { email: values.email, password: values.password };

    try {
      // Unwrap to get a clean response (avoids undefined error)
      const res = await login(userInfo).unwrap();

      // Store token correctly
      localStorage.setItem("accessToken", res.data.accessToken);

      Swal.fire({
        position: "top",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.data?.message || "An error occurred while logging in",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[92%] lg:p-[15%] lg:pr-[20%] ">
        <img src={image} alt="" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[44px] lg:px-[44px]">
          <div className="pb-[30px] space-y-2">
            <h1 className="text-[33px] text-center font-semibold ">
              Login to Account!
            </h1>
            <p className="text-hash text-center lg:text-lg">
              Please enter your email and password to continue.
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: false,
            }}
            onFinish={onFinish}
            requiredMark={false}
            className="text-start"
          >
            <Form.Item
              label={<span className="font-medium text-base">Email</span>}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please input a valid Email!",
                },
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input size="large" placeholder="admin@gmail.com" />
            </Form.Item>
            <Form.Item
              label={<span className="font-medium text-base">Password</span>}
              className="mt-6"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" placeholder="**********" />
            </Form.Item>
            <div className="flex justify-between items-center">
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox className="text-base font-medium">
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => navigate("/auth/forgot-password")}
                  type="link"
                  className="text-base font-medium text-info"
                >
                  Forget password?
                </Button>
              </Form.Item>
            </div>
            <div className="w-full flex justify-center ">
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="px-2 w-full bg-playground"
              >
                Sign In
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
