import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Select correct endpoint based on user type
    const endpoint = userType === "user" ? "http://localhost:8000/v1/users/login" : "http://localhost:8000/v1/ngo/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.usernameOrEmail.includes("@") ? formData.usernameOrEmail : undefined,
          username: formData.usernameOrEmail.includes("@") ? undefined : formData.usernameOrEmail,
          password: formData.password,
        }),
        credentials: "include", // Important for handling cookies
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login successful!");
        console.log(result);
        if(userType==="user"){
            dispatch(login(result.data.user))
            navigate("/userhome")
        }else{
            dispatch(login(result.data.ngo))
            navigate("/ngohome")
        }
       
        console.log("User Data:", result.user);
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* User Type Selection */}
        <div className="mb-4">
          <label className="font-semibold">Login as:</label>
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
          {/* Username or Email */}
          <div className="mb-4">
            <label className="block font-semibold">Username or Email:</label>
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
