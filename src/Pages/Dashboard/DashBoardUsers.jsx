import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { getTheme } from "../../Theme/Theme";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useThemeContext } from "../../Context/ThemeContext";
import axiosInstance from "../../axiosConfig/axiosConfig";

export default function DashboardUsers() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Update the Authorization header with the current token
      const response = await axiosInstance
        .get("/users")
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch users:", err);
          setError(
            "Failed to fetch users. Make sure you have admin privileges.",
          );
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchUsers();
  }, []);

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      const userData = response.data.user;
      // Don't include the password in the form initially
      setCurrentUser({
        ...userData,
        password: "",
      });
      setConfirmPassword("");
      setEditDialogOpen(true);
    } catch (err) {
      setError("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axiosInstance.delete(`/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Failed to delete user:", err);
        setError("Failed to delete user");
      }
    }
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentUser(null);
    setError("");
    setConfirmPassword("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });
  };

  const validatePassword = (password) => {
    return (
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      password.length >= 6
    );
  };

  const handleUpdateUser = async () => {
    // Validate form
    if (!currentUser.name || !currentUser.email) {
      setError("Name and email are required");
      return;
    }

    // If password is provided, validate it
    if (currentUser.password) {
      if (!validatePassword(currentUser.password)) {
        setError(
          "Password must be at least 6 characters and contain at least one lowercase letter, one uppercase letter, and one number",
        );
        return;
      }

      if (currentUser.password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    setLoading(true);
    try {
      const userData = {
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      };

      // Only include password if it was changed
      if (currentUser.password) {
        userData.password = currentUser.password;
      }

      const response = await axiosInstance.put(
        `/users/${currentUser._id}`,
        userData,
      );

      // Update the user in the local state
      setUsers(
        users.map((user) =>
          user._id === currentUser._id ? response.data.user : user,
        ),
      );

      handleDialogClose();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: theme.colors.text.primary, mb: 3 }}
        >
          Users Management
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search users..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{ mr: 1, color: theme.colors.text.secondary }}
                />
              ),
            }}
          />
        </Stack>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: theme.colors.background.default }}
              >
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(user._id)}
                      sx={{ color: theme.colors.primary.main }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user._id)}
                      sx={{ color: theme.colors.primary.dark }}
                    >
                      <DeleteIcon />{" "}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit User Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Edit User</Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {currentUser && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={currentUser.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={currentUser.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="role-select-label">Role</InputLabel>
                  <Select
                    labelId="role-select-label"
                    id="role-select"
                    name="role"
                    value={currentUser.role}
                    label="Role"
                    onChange={handleInputChange}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Change Password (leave blank to keep current password)
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  name="password"
                  type="password"
                  value={currentUser.password}
                  onChange={handleInputChange}
                  helperText="Password must be at least 6 characters with lowercase, uppercase, and number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" color="textSecondary">
                  User ID: {currentUser._id}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Created: {new Date(currentUser.createdAt).toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{ color: theme.colors.text.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateUser}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: theme.colors.primary.main,
              "&:hover": { backgroundColor: theme.colors.primary.dark },
            }}
          >
            Update User
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
