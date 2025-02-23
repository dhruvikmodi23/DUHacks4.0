import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BusinessIcon from "@mui/icons-material/Business";

const Userhome = () => {
  const [stats, setStats] = useState({
    totalNGOs: 50,
    totalDonations: 500,
    activeUsers: 1000,
  });

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* Hero Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          height: "80vh",
          background: `url(https://source.unsplash.com/1600x900/?charity,help) center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.5)", p: 5, borderRadius: 2 }}>
          <Container maxWidth="md">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              HelpHub – A Platform for Helping the Underprivileged
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Connecting NGOs and kind-hearted donors to make a difference.
            </Typography>
            <Button variant="contained" color="secondary" size="large">
              Get Started
            </Button>
          </Container>
        </Box>
      </Box>

      {/* Why This Project? */}
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Why This Project?
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Millions of people lack basic necessities. NGOs struggle to reach the right donors. This platform bridges the gap between donors and NGOs, making donations seamless and transparent.
        </Typography>
      </Container>

      {/* Who Benefits? - With Images */}
      <Box sx={{ bgcolor: "white", py: 10 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Who Benefits?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: "Underprivileged People", desc: "Receive essentials like food, clothes, and shelter.", img: "https://source.unsplash.com/400x300/?homeless,help" },
              { title: "NGOs & Organizations", desc: "Connect with potential donors and get support.", img: "https://source.unsplash.com/400x300/?ngo,volunteer" },
              { title: "Donors & Volunteers", desc: "Contribute and make a difference with ease.", img: "https://source.unsplash.com/400x300/?donation,charity" }
            ].map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ bgcolor: "primary.light", color: "black" }}>
                  <CardMedia component="img" height="200" image={item.img} alt={item.title} />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography variant="body1">{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Platform Features */}
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Key Features
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Explore the essential features of our platform:
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            "✅ View and support registered NGOs",
            "✅ Donate directly or respond to NGO requests",
            "✅ Secure and transparent transactions",
            "✅ Track donation history",
            "✅ Connect with NGOs and volunteers"
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="body1">{feature}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Statistics Section with Icons */}
      <Box sx={{ bgcolor: "primary.dark", color: "white", py: 10 }}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Platform Impact
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { label: "Total NGOs", value: stats.totalNGOs, icon: <BusinessIcon fontSize="large" /> },
              { label: "Total Donations", value: stats.totalDonations, icon: <VolunteerActivismIcon fontSize="large" /> },
              { label: "Active Users", value: stats.activeUsers, icon: <PeopleIcon fontSize="large" /> }
            ].map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper elevation={6} sx={{ bgcolor: "primary.main", p: 4, textAlign: "center" }}>
                  {stat.icon}
                  <Typography variant="h5">{stat.label}</Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}+
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Join Us & Make a Difference!
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Userhome;
