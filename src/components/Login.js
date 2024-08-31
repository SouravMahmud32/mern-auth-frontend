import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Login form, Step 2: OTP form
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post(
        "https://mern-auth-otp-server.vercel.app/api/auth/login",
        { email, password }
      );
      setMessage(response.data.msg);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.msg || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      // Send OTP initiation request for Google OAuth
      const response = await axios.post(
        "https://mern-auth-otp-server.vercel.app/api/auth/google/initiate-otp"
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
        { otp }
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
          <form onSubmit={handleLogin}>
            <h2 className="text-xl font-bold text-green-500 mb-3">Login</h2>
            <input
              className="py-3 px-3 my-2 rounded-lg"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="py-3 px-3 my-2 rounded-lg"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="rounded-full bg-red-600 py-2 px-2 text-white my-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className=" text-lg">or</p>
          <button
            className="rounded-full bg-blue-400 py-2 px-2 text-white my-2"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Login with Google"}
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
      {message && <p className=" text-gray-900">{message}!</p>}
    </div>
  );
};

export default Login;
