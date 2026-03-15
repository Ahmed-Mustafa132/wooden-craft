import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { keyframes } from "@emotion/react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Rating,
  Divider,
  Stack,
  Chip,
  Rating as MUIRating,
  Paper,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import { useCart } from "../../Context/CartContext";
import CircularIndeterminate from "../../components/Loading/Loading";
import * as THREE from "three";
import ThreeBackground from "../../components/ThreeBG/ThreeBackground";

export default function ProductDetails() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  const objectsRef = useRef({});

  const glow = keyframes`
    0% { filter: drop-shadow(0 0 3px ${theme.colors.primary.main}); }
    50% { filter: drop-shadow(0 0 10px ${theme.colors.primary.main}); }
    100% { filter: drop-shadow(0 0 3px ${theme.colors.primary.main}); }
  `;

  const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  `;

  const fadeInUp = keyframes`
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  // 3D Scene Init
  const init = (scene) => {
    // 1. Abstract Geometry (Wireframe Torus)
    const geometry = new THREE.TorusKnotGeometry(9, 2.5, 120, 20);
    const material = new THREE.MeshBasicMaterial({
      color: theme.colors.primary.main,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const torus = new THREE.Mesh(geometry, material);
    torus.position.set(10, 0, -10);
    scene.add(torus);
    objectsRef.current.torus = torus;

    // 2. Ambient Particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 2000;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      pPos[i] = (Math.random() - 0.5) * 100;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.03,
      color: theme.colors.text.secondary,
      opacity: 0.3,
      transparent: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);
    objectsRef.current.particles = particles;
  };

  const animate = () => {
    if (objectsRef.current.torus) {
      objectsRef.current.torus.rotation.x += 0.001;
      objectsRef.current.torus.rotation.y += 0.002;
    }
    if (objectsRef.current.particles) {
      objectsRef.current.particles.rotation.y -= 0.0005;
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  const handleRatingSubmit = (newValue) => {
    setUserRating(newValue);
    // Simulate API call or uncomment below
    console.log("Rating submitted:", newValue);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
    };
    addToCart(cartItem);
  };
  if (loading) {
    return <CircularIndeterminate />;
  }
  if (!product) return null;

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* 3D Background */}
      <ThreeBackground
        init={init}
        animate={animate}
        dependencies={[theme]}
        sx={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isDarkMode
            ? `radial-gradient(circle, rgba(0,0,0,0.1) 0%, ${theme.colors.background.default} 70%)`
            : `radial-gradient(circle, rgba(255,255,255,0.1) 0%, ${theme.colors.background.default} 70%)`,
          zIndex: 1,
        }}
      />

      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          py: 8,
          display: "flex",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Grid container spacing={8} alignItems="start">
          {/* Product Image */}
          <Grid item xs={12} md={5}>
            <Box sx={{ animation: `${float} 6s ease-in-out infinite` }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "32px",
                  overflow: "hidden",
                  boxShadow: isDarkMode
                    ? `0 40px 80px rgba(0,0,0,0.7), 0 0 20px ${theme.colors.primary.dark}`
                    : `0 40px 80px rgba(0,0,0,0.2), 0 0 20px ${theme.colors.primary.light}`,
                  transform:
                    "perspective(1500px) rotateY(-15deg) rotateX(5deg) scale(0.9)",
                  transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  "&:hover": {
                    transform:
                      "perspective(1500px) rotateY(0) rotateX(0) scale(1)",
                    boxShadow: isDarkMode
                      ? `0 50px 100px rgba(0,0,0,0.8), 0 0 30px ${theme.colors.primary.main}`
                      : `0 50px 100px rgba(0,0,0,0.25), 0 0 30px ${theme.colors.primary.light}`,
                  },
                  bgcolor: theme.colors.background.paper,
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: "28px",
                animation: `${fadeInUp} 1s ease-out`,
                background: isDarkMode
                  ? "rgba(18, 18, 18, 0.5)"
                  : "rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(25px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <Chip
                label={product.category?.name || "Uncategorized"}
                sx={{
                  background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
                  color: "#fff",
                  mb: 2,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontSize: "0.75rem",
                  height: "auto",
                  padding: "4px 8px",
                  boxShadow: `0 4px 10px ${theme.colors.primary.main}40`,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.colors.text.primary} 30%, ${theme.colors.primary.main} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "2.8rem", md: "4rem" },
                  lineHeight: 1.1,
                }}
              >
                {product.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Rating
                  value={product.rating || 4.5}
                  precision={0.5}
                  readOnly
                  sx={{
                    color: theme.colors.primary.main,
                    animation: `${glow} 3s ease-in-out infinite`,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    ml: 1.5,
                    color: theme.colors.text.secondary,
                    fontWeight: "medium",
                  }}
                >
                  ({product.rating || 4.5} / 5.0)
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  color: theme.colors.primary.main,
                  fontWeight: 700,
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                ${product.price}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.colors.text.secondary,
                  mb: 5,
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                }}
              >
                {product.description}
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{
                  py: 2,
                  px: 4,
                  borderRadius: "16px",
                  fontWeight: "bold",
                  background: `linear-gradient(45deg, ${theme.colors.primary.light} 30%, ${theme.colors.primary.dark} 90%)`,
                  boxShadow: `0 4px 15px 0 ${theme.colors.primary.main}70`,
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: `0 8px 25px 0 ${theme.colors.primary.main}90`,
                  },
                }}
              >
                Add to Cart
              </Button>

              <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

              {/* Features */}
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShippingIcon
                    sx={{ color: theme.colors.primary.main, mr: 2 }}
                  />
                  <Typography>{product.delivery} Delivery</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <VerifiedIcon
                    sx={{ color: theme.colors.primary.main, mr: 2 }}
                  />
                  <Typography>2 Year Warranty</Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 3,
                    fontWeight: "bold",
                    color: theme.colors.text.primary,
                  }}
                >
                  Rate this Product
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <MUIRating
                    value={userRating}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      if (newValue !== null) handleRatingSubmit(newValue);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    sx={{
                      fontSize: "3rem",
                      color: theme.colors.primary.main,
                      "& .MuiRating-iconHover": {
                        transform: "scale(1.2)",
                        transition: "transform 0.2s",
                      },
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: theme.colors.text.secondary }}
                  >
                    {userRating > 0
                      ? `Your rating: ${userRating}/5`
                      : "Rate this product"}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
