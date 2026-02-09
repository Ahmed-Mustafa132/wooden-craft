import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Input,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import axiosInstance from "../../axiosConfig/axiosConfig";

export default function DashboardProducts() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setCurrentProduct(response.data.product);
      setImagePreview(response.data.product.image);
      setEditDialogOpen(true);
    } catch (err) {
      setError("Failed to fetch product details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    setCurrentProduct(null);
    setError("");
    setImageFile(null);
    setImagePreview("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]:
        name === "price" || name === "stockQuantity" || name === "warranty"
          ? Number(value)
          : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleUpdateProduct = async () => {
    setLoading(true);
    try {
      // Create a FormData object to handle file upload
      const formData = new FormData();

      // Add all product fields to the formData
      Object.keys(currentProduct).forEach((key) => {
        if (key !== "image") {
          formData.append(key, currentProduct[key]);
        }
      });

      // Add the image file if a new one was selected
      if (imageFile) {
        formData.append("image", imageFile);
      } else {
        // If no new image was selected, keep the existing image URL
        formData.append("image", currentProduct.image);
      }

      const response = await axiosInstance.put(
        `/products/${currentProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // Update the product in the local state
      setProducts(
        products.map((product) =>
          product._id === currentProduct._id ? response.data.product : product,
        ),
      );

      handleDialogClose();
    } catch (err) {
      setError("Failed to update product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: theme.colors.text.primary, mb: 3 }}
        >
          Products Management
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            placeholder="Search products..."
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
          <Link to="/dashboard/CreateProduct">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: theme.colors.primary.main,
                "&:hover": { backgroundColor: theme.colors.primary.dark },
              }}
            >
              Add New Product
            </Button>
          </Link>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{ backgroundColor: theme.colors.background.default }}
              >
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.stockQuantity}</TableCell>
                  <TableCell>{product.rating}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleEdit(product._id)}
                      sx={{ color: theme.colors.primary.main }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(product._id)}
                      sx={{ color: theme.colors.primary.dark }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Product Dialog */}
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
          <Typography variant="h6">Edit Product</Typography>
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

          {currentProduct && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="title"
                  value={currentProduct.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="furniture">Furniture</MenuItem>
                  <MenuItem value="decor">Decor</MenuItem>
                  <MenuItem value="kitchen">Kitchen</MenuItem>
                  <MenuItem value="outdoor">Outdoor</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    startAdornment: "$",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  name="stockQuantity"
                  type="number"
                  value={currentProduct.stockQuantity}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Image
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {imagePreview && (
                    <Box sx={{ mb: 2 }}>
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "200px",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )}
                  <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: theme.colors.primary.main,
                      "&:hover": { backgroundColor: theme.colors.primary.dark },
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Material"
                  name="material"
                  value={currentProduct.material}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Dimensions"
                  name="dimensions"
                  value={currentProduct.dimensions}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight"
                  name="weight"
                  value={currentProduct.weight}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Finish"
                  name="finish"
                  value={currentProduct.finish}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Warranty (months)"
                  name="warranty"
                  type="number"
                  value={currentProduct.warranty}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Delivery Information"
                  name="delivery"
                  value={currentProduct.delivery}
                  onChange={handleInputChange}
                  required
                />
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
            onClick={handleUpdateProduct}
            variant="contained"
            disabled={loading}
            sx={{
              backgroundColor: theme.colors.primary.main,
              "&:hover": { backgroundColor: theme.colors.primary.dark },
            }}
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
