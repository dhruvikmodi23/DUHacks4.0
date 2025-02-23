import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      userType === "user"
        ? "http://localhost:8000/v1/users/login"
        : "http://localhost:8000/v1/ngo/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.usernameOrEmail.includes("@")
            ? formData.usernameOrEmail
            : undefined,
          username: formData.usernameOrEmail.includes("@")
            ? undefined
            : formData.usernameOrEmail,
          password: formData.password,
        }),
        credentials: "include",
      });

      const result = await response.json();
      console.log("API Response:", result); // Debugging

      if (response.ok) {
        alert("Login successful!");

        localStorage.setItem("accessToken",result.data.accessToken)

        // Add role manually before dispatching
        const userData = userType === "user" ? result.data.user : result.data.ngo;
        const finalUserData = { ...userData, role: userType };

        console.log("Dispatching to Redux:", finalUserData);
        dispatch(login(finalUserData));

        navigate(userType === "user" ? "/userhome" : "/ngohome");
      } else {
        alert(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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

        <form onSubmit={handleLogin}>
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
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
           
          >
           Don,t Have Account ?
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
