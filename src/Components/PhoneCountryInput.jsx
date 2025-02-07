import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input, Select } from "antd";
import { FlagIcon } from 'react-world-flags';

const PhoneCountryInput = ({ disabled }) => {
  const [phoneNumber, setPhoneNumber] = useState("+1 4575454545");
  const [countryCode, setCountryCode] = useState("US");

  const handleCountryChange = (value) => {
    setCountryCode(value);
  };
  return (
    <PhoneInput
      disabled={disabled}
      className="custom-phone "
      placeholder="Enter phone number"
      international
      countryCallingCodeEditable={false}

      defaultCountry="RU"
      value={phoneNumber?.toString()}
      onChange={setPhoneNumber}
    />
 
  );
};

export default PhoneCountryInput;
