import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";

const Contact = () => {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      color: theme.colors.text.primary,
      "& fieldset": {
        borderColor: theme.colors.text.secondary,
      },
      "&:hover fieldset": {
        borderColor: theme.colors.primary.main,
      },
    },
    "& .MuiInputBase-input::placeholder": {
      color: theme.colors.text.secondary,
      opacity: 0.7,
    },
    "& .MuiInputLabel-root": {
      color: theme.colors.text.secondary,
    },
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
        backgroundColor: theme.colors.background.default,
        minHeight: "100vh",
      }}
    >
      <Grid container spacing={4}>
        {/* Contact Form Section */}
        <Grid item xs={12} md={7}>
          <Paper
            elevation={3}
            sx={{ p: 4, backgroundColor: theme.colors.background.paper }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4, color: theme.colors.text.primary }}
            >
              Get in Touch
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    required
                    variant="outlined"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    required
                    variant="outlined"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    required
                    type="email"
                    variant="outlined"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    required
                    variant="outlined"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={textFieldSx}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: theme.colors.primary.main,
                      color: "#fff",
                      "&:hover": {
                        bgcolor: theme.colors.primary.dark,
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Contact Information Section */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              backgroundColor: theme.colors.background.paper,
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 4, color: theme.colors.text.primary }}
            >
              Contact Information
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Phone sx={{ mr: 2, color: theme.colors.primary.main }} />
                <Typography
                  variant="body1"
                  sx={{ color: theme.colors.text.primary }}
                >
                  +1 234 567 890
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Email sx={{ mr: 2, color: theme.colors.primary.main }} />
                <Typography
                  variant="body1"
                  sx={{ color: theme.colors.text.primary }}
                >
                  contact@example.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ mr: 2, color: theme.colors.primary.main }} />
                <Typography
                  variant="body1"
                  sx={{ color: theme.colors.text.primary }}
                >
                  123 Business Street, New York, NY 10001
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h6"
              sx={{ mb: 2, color: theme.colors.text.primary }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton sx={{ color: theme.colors.primary.main }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: theme.colors.primary.main }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: theme.colors.primary.main }}>
                <Instagram />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
