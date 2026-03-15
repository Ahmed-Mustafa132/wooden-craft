import { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import Product from "../../components/Product/Product";
import CircularIndeterminate from "../../components/Loading/Loading";
import * as THREE from "three";
import ThreeBackground from "../../components/ThreeBG/ThreeBackground";

export default function Products() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);
  const objectsRef = useRef({});

  // 3D Background Initialization
  const init = (scene) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: theme.colors.primary.main,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });

    const group = new THREE.Group();
    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 50;
      mesh.position.y = (Math.random() - 0.5) * 50;
      mesh.position.z = (Math.random() - 0.5) * 30;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.scale.setScalar(Math.random() * 2 + 0.5);
      group.add(mesh);
    }
    scene.add(group);
    objectsRef.current.group = group;
  };

  const animate = () => {
    const { group } = objectsRef.current;
    if (group) {
      group.rotation.y += 0.001;
      group.children.forEach((child, i) => {
        child.rotation.x += 0.01;
        child.rotation.y += 0.01;
      });
    }
  };

  useEffect(() => {
    // Fetch Categories
    axiosInstance
      .get("/categories")
      .then((response) => {
        // Handle response based on your category controller structure
        const cats = response.data.categories || response.data;
        if (Array.isArray(cats)) {
          setCategories(cats);
        }
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedCategory) params.category = selectedCategory;
    if (sortOrder) params.sort = sortOrder;

    axiosInstance
      .get("/products", { params })
      .then((response) => setProducts(response.data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, [searchTerm, selectedCategory, sortOrder]);
  if (loading) {
    return <CircularIndeterminate />;
  }
  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 3D Background */}
      <ThreeBackground
        init={init}
        animate={animate}
        dependencies={[theme]}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.6,
        }}
      />

      {/* Content Layer */}
      <Container sx={{ position: "relative", zIndex: 1, py: 8 }}>



        <Paper
          component="form"
          elevation={0}
          sx={{
            p: 2,
            mb: 8,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: 2,
            border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`,
            borderRadius: "24px",
            // Glassmorphism
            background: isDarkMode
              ? "rgba(20,20,20,0.6)"
              : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            boxShadow: theme.colors.shadow,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: theme.colors.text.secondary }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: isDarkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(0,0,0,0.03)",
                color: theme.colors.text.primary,
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: { xs: "100%", md: "auto" } }}
          >
            <FormControl sx={{ minWidth: 150, width: "100%" }}>
              <InputLabel sx={{ color: theme.colors.text.secondary }}>
                Category
              </InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  color: theme.colors.text.primary,
                  borderRadius: "16px",
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme.colors.text.secondary,
                  },
                }}
              >
                <MenuItem value="">All</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150, width: "100%" }}>
              <InputLabel sx={{ color: theme.colors.text.secondary }}>
                Sort By
              </InputLabel>
              <Select
                value={sortOrder}
                label="Sort By"
                onChange={(e) => setSortOrder(e.target.value)}
                sx={{
                  color: theme.colors.text.primary,
                  borderRadius: "16px",
                  backgroundColor: isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.03)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                  "& .MuiSvgIcon-root": {
                    color: theme.colors.text.secondary,
                  },
                }}
              >
                <MenuItem value="">Newest</MenuItem>
                <MenuItem value="price_asc">Price: Low to High</MenuItem>
                <MenuItem value="price_desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        <Grid container spacing={4}>
          {!products || products.length === 0 ? (
            <Container
              sx={{ textAlign: "center", color: theme.colors.text.secondary }}
            >
              <Typography variant="h5">
                No products found matching your criteria.
              </Typography>
            </Container>
          ) : (
            <>
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
