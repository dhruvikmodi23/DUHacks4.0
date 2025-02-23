import React from "react";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { motion } from "framer-motion";

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

const UserHome = () => {
  const stats = {
    totalNGOs: 50,
    totalDonations: 500,
    activeUsers: 1000,
  };

  const carouselItems = [
    {
      image: "../../public/child-rights.webp",
      caption: "Make a Difference Today",
    },
    {
      image: "../../public/End-Global-Poverty-scaled.webp",
      caption: "Empowering NGOs & Volunteers",
    },
    {
      image: "../../public/Honduras-nonprofits-struggles-reflect-pandemics-toll-on-NGOs-2.1jpg.jpg",
      caption: "Your Support Changes Lives",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f0f2f5"}}>
      {/* Hero Section with Carousel */}
      <Carousel animation="slide" indicators={true} navButtonsAlwaysVisible={true}>
        {carouselItems.map((item, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={item.image}
              alt={item.caption}
              style={{
                width: "100%",
                height: "550px",
                objectFit: "cover",
                borderRadius: "8px",
                filter: "brightness(85%)",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                position: "absolute",
                bottom: 30,
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "15px 25px",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              {item.caption}
            </Typography>
          </Box>
        ))}
      </Carousel>

      {/* About Section */}
      <Container sx={{ textAlign: "center" }}>
        <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Why This Project?
          </Typography>
          <Typography variant="h6" color="textSecondary" maxWidth="md" mx="auto">
            Millions of people lack access to basic needs. Our platform connects NGOs with donors to bring hope and change.
          </Typography>
        </MotionBox>
      </Container>

      {/* Who Benefits? */}
      <Container>
        <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
          Who Benefits?
        </Typography>
        <Grid container spacing={4}>
          {["Underprivileged People", "NGOs & Organizations", "Donors & Volunteers"].map((title, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <MotionPaper whileHover={{ scale: 1.05 }} elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(10px)",
                }}>
                <Typography variant="h5" fontWeight="bold">
                  {title}
                </Typography>
                <Typography variant="body1" color="textSecondary" mt={1}>
                  Making a positive impact with donations and support.
                </Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 6, mt: 6 ,textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Platform Impact
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { label: "Total NGOs", value: stats.totalNGOs },
            { label: "Total Donations", value: stats.totalDonations },
            { label: "Active Users", value: stats.activeUsers },
          ].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <MotionPaper whileHover={{ scale: 1.1 }} elevation={5}
                sx={{
                  p: 5,
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "15px",
                }}>
                <Typography variant="h5" fontWeight="bold">
                  {item.label}
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  {item.value}+
                </Typography>
              </MotionPaper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
};

export default UserHome;