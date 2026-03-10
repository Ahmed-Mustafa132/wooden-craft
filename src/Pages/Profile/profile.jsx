import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Stack,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import LogoutIcon from "@mui/icons-material/Logout";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import { useAuth } from "../../Context/AuthContext";
import axiosInstance from "../../axiosConfig/axiosConfig";

export default function Profile() {
  const { isDarkMode } = useThemeContext();
  const { userData, logout } = useAuth();
  const theme = getTheme(isDarkMode);

  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Fetch user profile
  useEffect(() => {
    if (userData && userData._id) {
      fetchUserProfile();
    } else {
      setLoading(false);
      setError("Please login to view your profile");
    }
  }, [userData]);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/users/${userData._id}`);
      setProfileData(response.data.user);
      setFormData({
        name: response.data.user.name,
        email: response.data.user.email,
        password: "",
      });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(
        `/users/${userData._id}`,
        formData,
      );
      setProfileData(response.data.user);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setOpenDialog(true);
  };

  const confirmLogout = () => {
    setOpenDialog(false);
    logout();
  };

  if (loading) {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.background.default,
          py: 8,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: theme.colors.primary.main }} />
      </Box>
    );
  }

  if (error && !profileData) {
    return (
      <Box
        sx={{
          bgcolor: theme.colors.background.default,
          py: 8,
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: theme.colors.background.default,
        py: 8,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                color: theme.colors.text.primary,
                mb: 2,
                fontWeight: "bold",
              }}
            >
              My Profile
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: theme.colors.text.secondary }}
            >
              Manage your account information and preferences
            </Typography>
          </Grid>

          {/* Alerts */}
          {error && (
            <Grid item xs={12}>
              <Alert severity="error" onClose={() => setError(null)}>
                {error}
              </Alert>
            </Grid>
          )}
          {success && (
            <Grid item xs={12}>
              <Alert severity="success" onClose={() => setSuccess(null)}>
                {success}
              </Alert>
            </Grid>
          )}

          {/* Profile Card */}
          <Grid item xs={12}>
            <Card
              elevation={3}
              sx={{
                bgcolor: theme.colors.background.paper,
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Stack spacing={3}>
                  {/* Avatar Section */}
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 2 }}
                  >
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        bgcolor: theme.colors.primary.main,
                        fontSize: "3rem",
                      }}
                    >
                      {profileData?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>

                  {/* User Info Display */}
                  {!isEditing ? (
                    <>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.colors.text.secondary, mb: 1 }}
                        >
                          Full Name
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.colors.text.primary }}
                        >
                          {profileData?.name}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.colors.text.secondary, mb: 1 }}
                        >
                          Email Address
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.colors.text.primary }}
                        >
                          {profileData?.email}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.colors.text.secondary, mb: 1 }}
                        >
                          Account Role
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.colors.primary.main,
                            textTransform: "capitalize",
                          }}
                        >
                          {profileData?.role || "User"}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: theme.colors.text.secondary, mb: 1 }}
                        >
                          Member Since
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{ color: theme.colors.text.primary }}
                        >
                          {new Date(
                            profileData?.createdAt,
                          ).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    /* Edit Form */
                    <>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: theme.colors.text.primary,
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.colors.text.secondary,
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: theme.colors.text.secondary,
                            opacity: 0.7,
                          },
                        }}
                      />

                      <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: theme.colors.text.primary,
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.colors.text.secondary,
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: theme.colors.text.secondary,
                            opacity: 0.7,
                          },
                        }}
                      />

                      <TextField
                        label="New Password (optional)"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        helperText="Leave blank to keep current password"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            color: theme.colors.text.primary,
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.colors.text.secondary,
                          },
                          "& .MuiInputBase-input::placeholder": {
                            color: theme.colors.text.secondary,
                            opacity: 0.7,
                          },
                        }}
                      />
                    </>
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                    {!isEditing ? (
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => setIsEditing(true)}
                        sx={{
                          bgcolor: theme.colors.primary.main,
                          color: "#fff",
                          "&:hover": {
                            bgcolor: theme.colors.primary.dark,
                          },
                        }}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveProfile}
                          disabled={loading}
                          sx={{
                            bgcolor: theme.colors.primary.main,
                            color: "#fff",
                            "&:hover": {
                              bgcolor: theme.colors.primary.dark,
                            },
                          }}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<CancelIcon />}
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: profileData.name,
                              email: profileData.email,
                              password: "",
                            });
                          }}
                          sx={{
                            color: theme.colors.primary.main,
                            borderColor: theme.colors.primary.main,
                            "&:hover": {
                              borderColor: theme.colors.primary.dark,
                              bgcolor: "transparent",
                            },
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<LogoutIcon />}
                      onClick={handleLogout}
                      sx={{
                        marginLeft: "auto",
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        sx={{ backgroundColor: theme.colors.background.paper }}
      >
        <DialogTitle sx={{ color: theme.colors.text.primary }}>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: theme.colors.text.secondary }}>
            Are you sure you want to logout?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={confirmLogout} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
