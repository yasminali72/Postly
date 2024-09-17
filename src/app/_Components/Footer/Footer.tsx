import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        padding: "20px",
        marginTop: "auto",
        borderTop: "1px solid #ddd",
        mt: "20px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Typography variant="body2">
            1234 Street Name
            <br />
            City, State, 12345
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link href="#" underline="hover" color="inherit">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover" color="inherit">
                About
              </Link>
            </li>
            <li>
              <Link href="#" underline="hover" color="inherit">
                Contact
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Typography variant="body2">
            <Link href="#" color="inherit" style={{ marginRight: "10px" }}>
              Facebook
            </Link>
            <Link href="#" color="inherit" style={{ marginRight: "10px" }}>
              Twitter
            </Link>
            <Link href="#" color="inherit">
              Instagram
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
