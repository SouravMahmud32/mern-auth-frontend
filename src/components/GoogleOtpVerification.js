import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleOtpVerification = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleOtpVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "/api/auth/verify-google-otp",
        { email, otp }
      );
      if (response.status === 200) {
        window.location.href = "/api/auth/google"; // Redirect to Google OAuth after OTP verification
      }
    } catch (error) {
      setMessage(error.response?.data?.msg || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-green-400 mb-3">Verify OTP for Google</h2>
      <form onSubmit={handleGoogleOtpVerification}>
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
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <br />
        <button
          className="rounded-full bg-blue-400 py-2 px-2 text-white my-2"
          type="submit"
          disabled={loading}
        >
          {loading ? "Verifying OTP..." : "Verify OTP"}
        </button>
      </form>
      {message && <p className="text-gray-900">{message}</p>}
    </div>
  );
};

export default GoogleOtpVerification;
