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
      image: "../../public/gettyimages-1498170916-612x612.jpg" ,
      caption: "Make a Difference Today",
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
    <Box sx={{ backgroundColor: "#f5f5f5" }}>
      {/* Hero Section with Carousel */}
      <Carousel
        animation="slide"
        indicators={true}
        navButtonsAlwaysVisible={true}
      >
        {carouselItems.map((item, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={item.image}
              alt={item.caption}
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <Typography
              variant="h4"
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
            >
              {item.caption}
            </Typography>
          </Box>
        ))}
      </Carousel>

      {/* Why This Project? */}
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Why This Project?
        </Typography>
        <Typography variant="body1" color="textSecondary" maxWidth="md" mx="auto">
          Millions of people lack access to basic needs. Our platform connects NGOs with donors to bring hope and change.
        </Typography>
      </Container>

      {/* Who Benefits? */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Who Benefits?
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: "Underprivileged People", image:"../../public/gettyimages-1498170916-612x612.jpg" },
            { title: "NGOs & Organizations", image: "https://source.unsplash.com/400x400/?nonprofit" },
            { title: "Donors & Volunteers", image: "https://source.unsplash.com/400x400/?volunteer" },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
                <img src={item.image} alt={item.title} style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
                <Typography variant="h6" fontWeight="bold" mt={2}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Making a positive impact with donations and support.
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Platform Features */}
      <Container sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            "✅ View and support registered NGOs",
            "✅ Donate directly or respond to NGO requests",
            "✅ Secure and transparent transactions",
            "✅ Track donation history",
            "✅ Connect with NGOs and volunteers",
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="body1">{feature}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Platform Impact (Statistics) */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 6, textAlign: "center" }}>
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
              <Paper elevation={3} sx={{ p: 4, bgcolor: "primary.dark", color: "white" }}>
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
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default UserHome;
