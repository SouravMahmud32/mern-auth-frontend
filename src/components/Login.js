import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleInitiateOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "https://mern-auth-otp-server.vercel.app/api/auth/google/initiate-otp",
        { email }
      );
      setMessage(response.data.msg);
      setStep(2); // Move to OTP verification step
    } catch (error) {
      setMessage(error.response?.data?.msg || "Failed to initiate Google login");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "https://mern-auth-otp-server.vercel.app/api/auth/google/verify-otp",
        { email, otp }
      );
      setMessage(response.data.msg);
      if (response.status === 200) {
        // After OTP verification, redirect to Google OAuth
        window.location.href = "https://mern-auth-otp-server.vercel.app/api/auth/google";
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-green-500 mb-3">Login</h2>
          <p className="text-lg">To continue with Google, please verify your email first.</p>
          <input
            className="py-3 px-3 my-2 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="rounded-full bg-blue-400 py-2 px-2 text-white my-2"
            onClick={handleGoogleInitiateOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Verify Email"}
          </button>
        </div>
      )}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <h2 className="text-xl font-bold text-green-400 mb-3">Enter OTP</h2>
          <input
            className="py-3 px-3 my-2 rounded-lg"
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button
            className="rounded-full bg-blue-400 py-2 px-2 text-white my-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      )}
      {message && <p className="text-gray-900">{message}!</p>}
    </div>
  );
};

export default Login;
