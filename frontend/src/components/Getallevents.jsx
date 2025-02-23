import { useEffect, useState } from "react";
import axios from "axios";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/getallEvent", { withCredentials: true });
        setEvents(response.data.data); // Assuming the data is inside response.data.data and checkendpoint
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events. Try again.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading events...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Upcoming Events</h2>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events available.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-5 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-blue-700">{event.title}</h3>
              <p className="text-gray-600 mt-2">{event.desc}</p>
              <p className="text-sm text-gray-500 mt-2"><strong>Category:</strong> {event.category}</p>
              <p className="text-sm text-gray-500"><strong>Status:</strong> {event.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
