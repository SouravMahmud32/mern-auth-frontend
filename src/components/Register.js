import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email, password }
      );
      setMessage(response.data.msg);
      setStep(2); //OTP entry step
    } catch (error) {
      setMessage(error.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );
      setMessage(response.data.msg);
      if (response.status === 200) {
        navigate("/home"); // Redirect to home page on successful OTP verification
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleRegister}>
          <h2 className="text-xl font-bold text-blue-900 mb-3">Register</h2>
          <br></br>
          <input
            className="py-3 px-3 my-2 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br></br>
          <input
            className="py-3 px-3 my-2 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br></br>
          <button
            className="rounded-full bg-green-600 py-2 px-2 text-white my-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-lg">or</p>
          <button
            className="rounded-full bg-blue-400 py-2 px-2 text-white my-2"
            onClick={handleGoogleRegister}
          >
            Register with Google
          </button>
        </form>
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
          <br></br>
          <button
            className="rounded-full bg-blue-400 py-2 px-2 text-white my-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying OTP..." : "Verify OTP"}
          </button>
        </form>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
