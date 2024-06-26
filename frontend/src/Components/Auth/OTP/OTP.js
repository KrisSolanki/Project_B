import React, { useContext, useState } from "react";
import "./OTP.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

const OTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mobileNumber = location.state?.mobileNumber; // Access the mobile number from the state

  let { logoutUser } = useContext(AuthContext);
  
  const [otp, setOtp] = useState("");


  

  const handleVerify = async () => {
    try {
      // alert(otp)
      const response = await axios.post(
        "http://127.0.0.1:8000/api/verify_otp/",
        {
          otp: otp,
          mobile_no: mobileNumber, // Include the mobile number in the request
        }
      );
        let data=response.data
        console.log(data.status);
      if (response.data.status === 200) {
        const token = response.data.token; // Adjust this based on the actual response structure
        // localStorage.setItem("authTokens", JSON.stringify(token));
       
        navigate("/"); // Navigate to the next page after successful OTP verification
        // window.location.href = 'http://127.0.0.1:8000//admin/';
        alert("OTP verified successfully ");
      } else {
        
        // alert("OTP verification failed. Please try again.");
        console.log("Calling logoutUser");
        const f1 = logoutUser;
        f1(); // This calls the logoutUser functio
      }
    } catch (error) {
      
      console.error("Error verifying OTP:", error.message);
      alert("An error occurred while verifying OTP.");
      // f1 = () =>{logoutUser}
      // f1()
      const f1 = logoutUser;
      f1(); // This calls the logoutUser function
    }
  };
  function handlechange(e) {
    if(e.target.value && e.target.nextSibling)
    {
      e.target.nextSibling.focus()
    }
  };

 
  return (
    <div className="main_containerOTP">


    <div className="container_otp">

    <div className="OTP">
      <h2 className="OTPtext">OTP Verification</h2>
      <form>
        {/* <div className="otpWrapper"> */}
        <div className="otpDigit">
          <input
          type="text"
          maxLength="4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="otpInput"
        />
        </div>

        <button type="button" className="buttonverify" onClick={handleVerify}>
          Verify
        </button>

        {/* <button type="button" className="buttonnext" onClick={() => navigate("/")}>
          Next
        </button> */}
      </form>
    </div>
    </div>

          </div>
  );
};

export default OTP;
