import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/reset-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert("Password reset link has been sent to your email.");
        setStep(2);
      } else {
        alert("Failed to send reset link.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      if (response.ok) {
        alert("Password has been reset successfully.");
      } else {
        alert("Failed to reset password.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Reset Password
            </h2>
            <form onSubmit={handleSubmitEmail}>
              <input
                type="email"
                placeholder="E-Mail Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white-500 font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Send Password Reset Link
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
              Enter New Password
            </h2>
            <form onSubmit={handleSubmitNewPassword}>
              <input
                type="text"
                placeholder="Reset Token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white-500 font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
