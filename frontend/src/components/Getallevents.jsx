import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AllEvents = () => {
  const { status, userData } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [appliedEvents, setAppliedEvents] = useState(new Set());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.post("http://localhost:8000/v1/event/getallevent", { withCredentials: true });
        setEvents(response.data.data);
      } catch (err) {
        setError("Failed to fetch events. Try again.");
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const applyToEvent = async (eventId,createdBy) => {
    if (appliedEvents.has(eventId)) {
      alert("You have already applied to this event!");
      return;
    }

    setApplying(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/v1/eventdocument/applytoevent",
        {
          createdBy: createdBy, // Replace with actual user ID
          volunteerId: userData._id, // Replace with actual volunteer ID
          eventId: eventId,
        },
        { withCredentials: true }
      );

      alert("Successfully applied to the event!");
      setAppliedEvents(new Set(appliedEvents).add(eventId)); // Prevent duplicate applications
    } catch (error) {
      console.error("Error applying to event:", error);
      alert("Failed to apply to event. Try again.");
    }
    setApplying(false);
  };

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

              <button
                className={`mt-4 px-4 py-2 w-full rounded-lg ${
                  appliedEvents.has(event._id) ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                } text-white`}
                onClick={() => applyToEvent(event._id,event.createdBy)}
                disabled={applying || appliedEvents.has(event._id)}
              >
                {appliedEvents.has(event._id) ? "Already Applied" : "Apply to Event"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEvents;
