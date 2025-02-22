import { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";

const Signup = () => {
    const Navigate = useNavigate()
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    location: "",
    donationHistory: "",
    volunteeringHistory: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Select correct endpoint based on user type
    const endpoint = userType === "user" ? "http://localhost:8000/v1/users/register" : "http://localhost:8000/v1/ngo/register";

    // Prepare request body
    const requestBody = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      location: formData.location,
    };

    // Add specific fields based on user type
    if (userType === "user") {
    //   requestBody.donationHistory = formData.donationHistory;
    //   requestBody.volunteeringHistory = formData.volunteeringHistory;
    } else {
      requestBody.bio = formData.bio;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Signup successful!");
        Navigate("/login")
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        {/* User Type Selection */}
        <div className="mb-4">
          <label className="font-semibold">Sign up as:</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="ngo">NGO</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label className="block font-semibold">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block font-semibold">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block font-semibold">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* User-Specific Fields */}
          {userType === "user" && (
            <>
              <div className="mb-4">
                <label className="block font-semibold">Donation History:</label>
                <input
                  type="text"
                  name="donationHistory"
                  value={formData.donationHistory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Volunteering History:
                </label>
                <input
                  type="text"
                  name="volunteeringHistory"
                  value={formData.volunteeringHistory}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}

          {/* NGO-Specific Fields */}
          {userType === "ngo" && (
            <div className="mb-4">
              <label className="block font-semibold">Bio:</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
