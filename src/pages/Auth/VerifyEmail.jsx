import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import image from "../../assets/images/verify.png";
import PageHeading from "../../Components/PageHeading";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import { useVerifyEmailMutation } from "../../redux/features/authSlice";
// import { useVerifyEmailMutation } from "../../redux/features/Auth/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [mutation] = useVerifyEmailMutation();

  const location = useLocation();
  const email = location.state?.email || "";

  console.log(email);

  const onFinish = async () => {
    if (!otp || otp.length !== 6) {
      return Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Please enter a 6-digit OTP number!",
      });
    }

    const value = {
      email,
      oneTimeCode: Number(otp),
    };

    try {
      const response = await mutation(value).unwrap();

      if (response?.success === true) {
        localStorage.setItem("verify-token", response?.data);
        Swal.fire({
          icon: "success",
          title: "Success!!",
          text: response.message,
        });
        navigate(`/auth/reset-password`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text:
            response?.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-[92vh] w-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-1 lg:gap-8">
      <div className="lg:border-r-2 border-primary mx-auto w-[90%] lg:p-[8%]">
        <img src={image} alt="" />
      </div>
      <div className="lg:p-[5%] order-first lg:order-last">
        <div className="w-full py-[64px] lg:px-[44px] space-y-5">
          <div className="flex flex-col items-center lg:items-start">
            <PageHeading
              backPath={"/auth/forgot-password"}
              title={"Verify Email"}
              disbaledBackBtn={true}
            />
            <p className=" drop-shadow text-hash mt-5 text-center lg:text-left">
              Please check your email. We have sent a code to contact @gmail.com
            </p>
          </div>
          <Form
            name="normal_login"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <div className="py-3 text-2xl font-semibold flex justify-center">
              <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                inputStyle={{
                  height: "70px",
                  width: "70px",
                  margin: "20px",
                  // background: "#ECE8F1",
                  border: "1px solid #61D0FF",
                  // marginRight: "auto",
                  outline: "none",
                  borderRadius: "16px",
                  color: "black",
                }}
                renderSeparator={<span> </span>}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="w-full flex justify-center pt-5">
              <Button
                // disabled={isLoading}
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full px-2 "
              >
                Verify Email
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
