import { useState } from "react";
import axios from "axios";

const CreateDonation = () => {
  const [donation, setDonation] = useState({
    title: "",
    status: "",
    desc: "",
    quantity: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setDonation({ ...donation, [e.target.name]: e.target.value });
  };

  // Submit Donation Request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (Object.values(donation).some((field) => field.trim() === "")) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/v1/donations/postDonation",
        donation,
        { withCredentials: true } // Ensures session cookies are sent
      );

      setMessage("Donation request posted successfully!");
      setError("");
      setDonation({ title: "", status: "", desc: "", quantity: "", category: "" });
    } catch (err) {
      console.error("Error posting donation:", err);
      setError("Failed to post donation. Try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Create Donation Request</h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title (e.g., Food Donation)"
            value={donation.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Status (e.g., Urgent, Needed Soon)"
            value={donation.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="desc"
            placeholder="Description"
            value={donation.desc}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity (e.g., 100)"
            value={donation.quantity}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Clothes, Food)"
            value={donation.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Post Donation Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonation;
