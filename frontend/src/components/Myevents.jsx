import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Grid,
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSelector } from "react-redux";

const NgoEvents = () => {
  const { userData } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [participantsLoading, setParticipantsLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
    if (userData?.ngo?._id) {
      
    }
  }, [userData]);

  // Fetch events posted by the NGO
  const fetchEvents = async () => {
    console.log("Access Token:", localStorage.getItem("accessToken")); // Debugging
  
    setLoading(true);
    setError("");
  
    try {
      
        const response = await axios.post(
            `http://localhost:8000/v1/event/getmyevent`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Ensure token is sent
                },
                withCredentials: true, // Ensures cookies are included if using httpOnly cookies
            }
        );
  
      console.log("Events Data:", response.data);
      setEvents(response.data.data || []);
    } catch (err) {
      console.error("Error fetching events:", err.response?.data);
      setError(err.response?.data?.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch participants for a selected event
  const fetchParticipants = async (eventId) => {
    setParticipantsLoading(true);
    setParticipants([]);

    try {
        const response = await axios.post(
            `http://localhost:8000/v1/event/getparticipants`,
            { eventId }, // Send eventId in the body
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        console.log("Participants Data:", response.data);
        setParticipants(response.data.data || []);
    } catch (err) {
        console.error("Error fetching participants:", err.response?.data);
        setError(err.response?.data?.message || "Failed to fetch participants.");
    } finally {
        setParticipantsLoading(false);
    }
};


  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ my: 4, textAlign: "center", fontWeight: "bold" }}
      >
        Your Posted Events
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center" }}>
          {error}
        </Typography>
      ) : events.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>
          No events found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {event.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    Date: {new Date(event.eventDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">{event.desc}</Typography>
                  <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSelectedEvent(event);
                      fetchParticipants(event._id);
                    }}
                  >
                    View Participants
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog for Participants */}
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        fullWidth
      >
        <DialogTitle>Participants for {selectedEvent?.title}</DialogTitle>
        <DialogContent dividers>
          {participantsLoading ? (
            <CircularProgress sx={{ display: "block", margin: "auto" }} />
          ) : participants.length === 0 ? (
            <Typography>No participants found.</Typography>
          ) : (
            participants.map((participant) => (
              <Typography key={participant._id} sx={{ mb: 1 }}>
                <strong>Name:</strong> {participant.name} <br />
                <strong>Email:</strong> {participant.email} <br />
                <strong>Phone:</strong> {participant.phone} <br />
              </Typography>
            ))
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedEvent(null)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NgoEvents;
