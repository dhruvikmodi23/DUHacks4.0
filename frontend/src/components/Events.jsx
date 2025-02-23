import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateEvent = () => {
  const { status, userData } = useSelector((state) => state.auth);
  const [event, setEvent] = useState({
    title: "",
    status: "",
    desc: "",
    category: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Submit Event
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (Object.values(event).some((field) => field.trim() === "")) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/v1/event/postevent",
        { ...event, createdBy: userData._id }, // Replace with actual NGO ID with the help of user stored in redux store
        { withCredentials: true }
      );

      setMessage("Event posted successfully!");
      setError("");
      setEvent({ title: "", status: "", desc: "", category: "" });
    } catch (err) {
      console.error("Error posting event:", err);
      setError("Failed to post event. Try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Post an Upcoming Event</h2>

        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title (e.g., Food Drive)"
            value={event.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="status"
            placeholder="Event Status (e.g., Upcoming, Active)"
            value={event.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            name="desc"
            placeholder="Event Description"
            value={event.desc}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category (e.g., Education, Health)"
            value={event.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Post Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
