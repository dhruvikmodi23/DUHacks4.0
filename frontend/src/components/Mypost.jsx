import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Card, CardContent, Typography, CircularProgress, Grid, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button 
} from "@mui/material";
import { useSelector } from "react-redux";

const NgoDonations = () => {
  const { status, userData } = useSelector((state) => state.auth);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for showing donation details
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [donationDetails, setDonationDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

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
        console.log(localStorage.getItem("accessToken"));

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

  // Function to fetch details of a specific donation
  const fetchDonationDetails = async (donationId) => {
    setDetailsLoading(true);
    setError("");

    try {
      console.log("Fetching details for donation ID:", donationId);

      const response = await axios.post(
        `http://localhost:8000/v1/donationreq/getdonationdetails`,
        { donationId }, // Using request body
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
          withCredentials: true,
        }
      );

      console.log("Donation Details API Response:", response.data);
      setDonationDetails(response.data.data);
    } catch (err) {
      console.error("Error fetching donation details:", err.response?.data);
      setError(err.response?.data?.message || "Failed to fetch donation details.");
    } finally {
      setDetailsLoading(false);
    }
  };

  // Open dialog with donation details
  const handleOpenDetails = (donation) => {
    setSelectedDonation(donation);
    fetchDonationDetails(donation._id);
  };

  // Close dialog
  const handleCloseDetails = () => {
    setSelectedDonation(null);
    setDonationDetails(null);
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
              <Card sx={{ boxShadow: 3, cursor: "pointer" }} onClick={() => handleOpenDetails(post)}>
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

      {/* Donation Details Dialog */}
      <Dialog open={!!selectedDonation} onClose={handleCloseDetails} fullWidth maxWidth="sm">
        <DialogTitle>Donation Details</DialogTitle>
        <DialogContent>
          {detailsLoading ? (
            <CircularProgress sx={{ display: "block", margin: "auto" }} />
          ) : donationDetails ? (
            <>
              <Typography variant="h6" sx={{ mt: 2 }}>Donation Request:</Typography>
              <Typography><strong>Title:</strong> {donationDetails.donationRequest.title}</Typography>
              <Typography><strong>Category:</strong> {donationDetails.donationRequest.category}</Typography>
              <Typography><strong>Description:</strong> {donationDetails.donationRequest.desc}</Typography>
              <Typography><strong>Status:</strong> {donationDetails.donationRequest.status}</Typography>

              <Typography variant="h6" sx={{ mt: 2 }}>Donors:</Typography>
              {donationDetails.donationDocuments.length > 0 ? (
                donationDetails.donationDocuments.map((donation) => (
                  <Card key={donation._id} sx={{ my: 2, p: 2 }}>
                    <Typography><strong>Donor:</strong> {donation.donorId.name}</Typography>
                    <Typography><strong>Email:</strong> {donation.donorId.email}</Typography>
                    <Typography><strong>Phone:</strong> {donation.donorId.phone}</Typography>
                    <Typography><strong>Quantity:</strong> {donation.quantity}</Typography>
                    <Typography><strong>Status:</strong> {donation.status}</Typography>
                  </Card>
                ))
              ) : (
                <Typography>No donations yet.</Typography>
              )}
            </>
          ) : (
            <Typography color="error">Failed to load donation details.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NgoDonations;



