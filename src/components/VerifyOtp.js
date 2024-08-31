import React, { useState } from 'react';
import { verifyOtp } from '../api';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp({ email, otp });
      setMessage('OTP verified successfully!');
      if (response.status === 200) {
        navigate("/home"); 
      }
    } catch (error) {
      setMessage(error.response.data.msg || 'An error occurred');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-green-400 mb-3">Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
        className="py-3 px-3 my-2 rounded-lg"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <input
        className="py-3 px-3 my-2 rounded-lg"
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <br></br>
        <br></br>
        <button className="rounded-full bg-blue-400 py-2 px-2 text-white my-2" type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
