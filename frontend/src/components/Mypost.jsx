import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Card, CardContent, Typography, CircularProgress, Grid, Container 
} from "@mui/material";
import { useSelector } from "react-redux";

const NgoDonations = () => {
  const { status, userData } = useSelector((state) => state.auth);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(userData.ngo);
    fetchDonations();
    if (userData?.ngo?._id) {
      fetchDonations(userData.ngo._id);
    }
  }, [userData]); // Ensures fetching only when userData is available

  const fetchDonations = async (ngoid) => {
    setLoading(true);
    setError("");

    try {
        console.log("Fetching donations for NGO ID:", ngoid);

        const response = await axios.post(
            `http://localhost:8000/v1/donationreq/getdonationpostbyngo1`, 
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Ensure token is sent
                },
                withCredentials: true, // Ensures cookies are included if using httpOnly cookies
            }
        );

        console.log("API Response:", response.data);
        setDonations(response.data.data || []);
    } catch (err) {
        console.error("Error fetching donation posts:", err.response?.data);
        setError(err.response?.data?.message || "Failed to fetch donation posts.");
    } finally {
        setLoading(false);
    }
};

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center", fontWeight: "bold" }}>
        Your Donation Posts
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center" }}>{error}</Typography>
      ) : donations.length === 0 ? (
        <Typography sx={{ textAlign: "center" }}>No donation posts found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {donations.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post._id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{post.title}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>Category: {post.category}</Typography>
                  <Typography variant="body2">{post.desc}</Typography>
                  <Typography sx={{ mt: 2, fontSize: "0.9rem", color: "gray" }}>
                    Created on: {new Date(post.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default NgoDonations;
