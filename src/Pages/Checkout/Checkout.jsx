import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  TextField,
  Divider,
} from "@mui/material";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import { useCart } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig/axiosConfig";
export default function Checkout() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const [formData, setFormData] = React.useState({
    products: cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    totalPrice: totalPrice.toFixed(2),
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [errors, setErrors] = React.useState({});
  const [error, setError] = React.useState();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        axiosInstance
          .post("/orders", formData)
          .then(() => {
            clearCart();
            navigate("/");
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              setError(
                error.response.data.message ||
                  "Failed to place order. Please try again.",
              );
            } else if (error.request) {
              setError(
                "No response received from the server. Please check your network connection.",
              );
            } else if (error.message) {
              setError(error.message);
            }
            console.error("Error placing order:", error);
          });
      } catch (error) {
        console.error("Error placing order:", error);
        setError("Failed to place order. Please try again.");
      }
    }
  };

  const textFieldProps = {
    sx: {
      "& label": { color: theme.colors.text.secondary },
      "& .MuiOutlinedInput-root": {
        "&:hover fieldset": {
          borderColor: theme.colors.primary.light,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.colors.primary.main,
        },
      },
    },
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4, marginTop: 5 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 2, md: 3 },
                backgroundColor: theme.colors.background.paper,
                boxShadow: `0 4px 6px ${theme.colors.shadow}`,
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, color: theme.colors.text.primary }}
              >
                Shipping Details
              </Typography>
              {error && (
                <Typography
                  variant="body1"
                  color="error"
                  sx={{ mb: 2, textAlign: "center" }}
                >
                  {error}
                </Typography>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={!!errors.fullName}
                    helperText={errors.fullName}
                    {...textFieldProps}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    {...textFieldProps}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    {...textFieldProps}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone"
                    name="phone"
                    type="number"
                    value={formData.phone}
                    onChange={handleChange}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    {...textFieldProps}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    {...textFieldProps}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Postal Code"
                    name="postalCode"
                    type="number"
                    value={formData.postalCode}
                    onChange={handleChange}
                    error={!!errors.postalCode}
                    helperText={errors.postalCode}
                    {...textFieldProps}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 2, md: 3 },
                backgroundColor: theme.colors.background.paper,
                boxShadow: `0 4px 6px ${theme.colors.shadow}`,
              }}
            >
              <Typography
                variant="h5"
                sx={{ mb: 3, color: theme.colors.text.primary }}
              >
                Order Summary
              </Typography>
              {cartItems.map((item) => (
                <Box sx={{ mb: 2 }} key={item.id}>
                  <Typography
                    color={theme.colors.text.secondary}
                    sx={{ width: "100%" }}
                  >
                    {item.title}
                  </Typography>
                  <Grid
                    container
                    justifyContent="center"
                    gap={2}
                    sx={{ mb: 1 }}
                  >
                    <Typography> {item.quantity}</Typography>
                    <Typography> {item.quantity * item.price}</Typography>
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
              <Grid container justifyContent="space-between">
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">{totalPrice.toFixed(2)}</Typography>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  backgroundColor: theme.colors.primary.main,
                  "&:hover": {
                    backgroundColor: theme.colors.primary.dark,
                  },
                }}
                onClick={() => handleSubmit}
              >
                Place Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
