import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const UserHome = () => {
  const stats = {
    totalNGOs: 50,
    totalDonations: 500,
    activeUsers: 1000,
  };

  const carouselItems = [
    {
      image: "https://source.unsplash.com/1600x900/?helping-hands",
      caption: "Together, We Can Make a Change",
    },
    {
      image: "https://source.unsplash.com/1600x900/?volunteer",
      caption: "Empowering NGOs & Volunteers",
    },
    {
      image: "https://source.unsplash.com/1600x900/?donation",
      caption: "Your Support Changes Lives",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f0f8ff" }}> {/* Light background */}
      {/* Header Section with Carousel */}
      <Box sx={{ background: "linear-gradient(90deg, #b3e0ff, #e6f7ff)", py: 4 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold" color="#004d80">
          Welcome to HelpAtHand
        </Typography>
      </Box>

      <Carousel animation="slide" indicators navButtonsAlwaysVisible>
        {carouselItems.map((item, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={item.image}
              alt={item.caption}
              style={{ width: "100%", height: "450px", objectFit: "cover" }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "8px 16px",
                borderRadius: "5px",
              }}
            >
              {item.caption}
            </Typography>
          </Box>
        ))}
      </Carousel>

      {/* Who Benefits? */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" color="#004d80" gutterBottom>
          Who Benefits?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Underprivileged People", image: "https://source.unsplash.com/400x400/?charity" },
            { title: "NGOs & Organizations", image: "https://source.unsplash.com/400x400/?community" },
            { title: "Donors & Volunteers", image: "https://source.unsplash.com/400x400/?giving" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: "10px" }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {item.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Platform Impact */}
      <Box sx={{ bgcolor: "#004d80", color: "white", py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Platform Impact
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { label: "Total NGOs", value: stats.totalNGOs },
            { label: "Total Donations", value: stats.totalDonations },
            { label: "Active Users", value: stats.activeUsers },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 4, bgcolor: "#0080ff", color: "white", borderRadius: "10px" }}>
                <Typography variant="h6">{item.label}</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {item.value}+
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Call to Action */}
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Join Us & Make a Difference!
        </Typography>
        <Typography variant="body1" color="textSecondary" maxWidth="md" mx="auto" mb={3}>
          Your contribution can bring hope and change. Be a part of this movement.
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: "#004d80", color: "white" }} size="large">
          Get Started
        </Button>
      </Container>

      {/* Footer */}
      <Box sx={{ background: "linear-gradient(90deg, #b3e0ff, #e6f7ff)", py: 3, textAlign: "center" }}>
        <Typography variant="body2" color="#004d80">
          © 2025 HelpAtHand | Making a Difference Together
        </Typography>
      </Box>
    </Box>
  );
};

export default UserHome;
