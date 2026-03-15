import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, Grid, Stack } from "@mui/material";
import { useThemeContext } from "../../../Context/ThemeContext";
import { getTheme } from "../../../Theme/Theme";
import * as THREE from "three";
import ThreeBackground from "../../ThreeBG/ThreeBackground";

export default function Header() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const objectsRef = useRef({});

  // 3D Scene Initialization
  const init = (scene) => {
    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60; // Spread particles wide
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: theme.colors.primary.main,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particlesMesh);
    objectsRef.current.particles = particlesMesh;

    // Geometric Shape (Icosahedron Wireframe)
    const geometry = new THREE.IcosahedronGeometry(12, 1);
    const material = new THREE.MeshBasicMaterial({
      color: theme.colors.text.secondary,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(10, 0, -5); // Position to the right
    scene.add(sphere);
    objectsRef.current.sphere = sphere;
  };

  const animate = () => {
    const { particles, sphere } = objectsRef.current;
    if (particles) {
      particles.rotation.y += 0.0005;
      particles.rotation.x -= 0.0002;
    }
    if (sphere) {
      sphere.rotation.x += 0.001;
      sphere.rotation.y += 0.001;
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        bgcolor: theme.colors.background.default,
      }}
    >
      {/* 3D Background Layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <ThreeBackground
          init={init}
          animate={animate}
          dependencies={[theme]}
          cameraPos={{ z: 20 }}
          sx={{ width: "100%", height: "100%" }}
        />
        {/* Overlay Gradient for readability */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: isDarkMode
              ? `linear-gradient(135deg, ${theme.colors.background.default} 20%, rgba(0,0,0,0.5) 100%)`
              : `linear-gradient(135deg, ${theme.colors.background.default} 20%, rgba(255,255,255,0.5) 100%)`,
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Content */}
          <Grid item xs={12} md={8}>
            <Stack
              spacing={3}
              alignItems={{ xs: "center", md: "flex-start" }}
              textAlign={{ xs: "center", md: "left" }}
            >
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  bgcolor: isDarkMode
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(0,0,0,0.05)",
                  border: `1px solid ${theme.colors.primary.main}40`,
                  color: theme.colors.primary.main,
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                  letterSpacing: "1px",
                }}
              >
                NEW ARRIVALS 2026
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "3.5rem", md: "5rem", lg: "7rem" },
                  lineHeight: 0.9,
                  color: theme.colors.text.primary,
                  letterSpacing: "-2px",
                  textTransform: "uppercase",
                }}
              >
                Designed <br />
                <span
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `2px ${theme.colors.text.primary}`,
                    opacity: 0.8,
                  }}
                >
                  For The
                </span>{" "}
                <br />
                <span style={{ color: theme.colors.primary.main }}>
                  Future.
                </span>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: theme.colors.text.secondary,
                  maxWidth: "600px",
                  lineHeight: 1.6,
                  fontWeight: 300,
                  fontSize: "1.2rem",
                }}
              >
                lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, delectus nemo? Quos molestias aliquid molestiae non
                omnis nemo iure
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ pt: 1 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/products")}
                  sx={{
                    bgcolor: theme.colors.primary.main,
                    px: 5,
                    py: 1.8,
                    fontSize: "1.1rem",
                    borderRadius: "50px",
                    boxShadow: `0 10px 30px -5px ${theme.colors.shadow}`,
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: theme.colors.primary.dark,
                      transform: "translateY(-5px)",
                      boxShadow: `0 20px 40px -5px ${theme.colors.shadow}`,
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Explore Collection
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: theme.colors.text.primary,
                    borderColor: theme.colors.text.primary,
                    px: 3,
                    fontSize: "1.1rem",
                    borderRadius: "50px",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      borderColor: theme.colors.primary.main,
                      color: theme.colors.primary.main,
                      bgcolor: "transparent",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Watch Video
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
