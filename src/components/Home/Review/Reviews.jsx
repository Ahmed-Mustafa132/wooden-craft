import { useRef } from "react";
import * as THREE from "three";
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Rating,
  Typography,
  Stack,
} from "@mui/material";
import { getTheme } from "../../../Theme/Theme";
import { useThemeContext } from "../../../Context/ThemeContext";
import ThreeBackground from "../../ThreeBG/ThreeBackground";

export default function Reviews() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const objectsRef = useRef({});

  const init = (scene) => {
    // 1. Particle Field (Stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: theme.colors.primary.main,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    objectsRef.current.particles = particles;

    // 2. Abstract Flowing Rings (Torus)
    const torusGeometry = new THREE.TorusGeometry(10, 0.1, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: theme.colors.text.secondary,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    });

    // Create multiple rings
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(torusGeometry, torusMaterial);
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      ring.scale.setScalar(1 + i * 0.5);
      scene.add(ring);
      rings.push(ring);
    }
    objectsRef.current.rings = rings;
  };

  const animate = () => {
    const { particles, rings } = objectsRef.current;
    if (particles) {
      particles.rotation.y += 0.001;
      particles.rotation.z += 0.0005;
    }
    if (rings) {
      rings.forEach((ring, i) => {
        ring.rotation.x += 0.002 * (i + 1);
        ring.rotation.y += 0.001 * (i + 1);
      });
    }
  };

  const reviews = [
    {
      name: "John Smith",
      rating: 5,
      comment:
        "Exceptional quality products. The attention to detail is remarkable. It completely transformed my living room.",
      position: "Interior Designer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      comment:
        "Beautiful craftsmanship. My order exceeded expectations. The delivery was fast and the packaging was eco-friendly.",
      position: "Home Owner",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Mike Wilson",
      rating: 4.5,
      comment:
        "Professional service and outstanding results. Highly recommended! Will definitely buy again for my office.",
      position: "Business Owner",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    }
  ];
  return (
    <section
      className="section4"
      style={{ position: "relative", overflow: "hidden", minHeight: "100vh" }}
    >
      <ThreeBackground
        init={init}
        animate={animate}
        dependencies={[theme]}
        sx={{ zIndex: 0 }}
      />

      {/* Overlay Gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          background: isDarkMode
            ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)"
            : "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.8) 100%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ py: 12 }}>
          <Stack spacing={2} alignItems="center" mb={10}>
            <Typography
              variant="h6"
              sx={{
                color: theme.colors.primary.main,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "3px",
              }}
            >
              Testimonials
            </Typography>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 900,
                color: theme.colors.text.primary,
                fontSize: { xs: "2.5rem", md: "4rem" },
              }}
            >
              What Our Clients Say
            </Typography>
            <Box
              sx={{
                width: "80px",
                height: "6px",
                bgcolor: theme.colors.primary.main,
                borderRadius: "3px",
              }}
            />
          </Stack>

          <Grid container spacing={4}>
            {reviews.map((review, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 4,
                    borderRadius: "24px",
                    background: isDarkMode
                      ? "rgba(30, 30, 30, 0.4)"
                      : "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(20px)",
                    border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)"}`,
                    boxShadow: "none",
                    position: "relative",
                    transition: "all 0.4s ease-out",
                    overflow: "visible",
                    "&:hover": {
                      transform: "translateY(-15px)",
                      boxShadow: isDarkMode
                        ? `0 20px 40px -10px rgba(0,0,0,0.5)`
                        : `0 20px 40px -10px rgba(0,0,0,0.1)`,
                      borderColor: theme.colors.primary.main,
                      "& .quote-icon": {
                        opacity: 1,
                        transform: "translateY(-10px) rotate(10deg)",
                        color: theme.colors.primary.main,
                      },
                    },
                  }}
                >
                  {/* Decorative Quote Icon */}
                  <Typography
                    className="quote-icon"
                    variant="h1"
                    sx={{
                      position: "absolute",
                      top: -30,
                      right: 20,
                      fontSize: "6rem",
                      color: theme.colors.text.secondary,
                      opacity: 0.1,
                      fontFamily: "serif",
                      transition: "all 0.4s ease-out",
                      pointerEvents: "none",
                      lineHeight: 1,
                    }}
                  >
                    “
                  </Typography>

                  <Stack spacing={3}>
                    {/* Rating */}
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="medium"
                      sx={{
                        "& .MuiRating-iconFilled": {
                          color: theme.colors.primary.main,
                        },
                        "& .MuiRating-iconEmpty": {
                          color: theme.colors.text.secondary,
                        },
                      }}
                    />

                    {/* Comment */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.colors.text.secondary,
                        fontSize: "1.1rem",
                        lineHeight: 1.7,
                        fontStyle: "italic",
                        minHeight: "80px",
                      }}
                    >
                      "{review.comment}"
                    </Typography>

                    {/* User Profile */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        pt: 2,
                        borderTop: `1px solid ${theme.colors.text.secondary}20`,
                      }}
                    >
                      <Avatar
                        src={review.image}
                        alt={review.name}
                        sx={{
                          width: 56,
                          height: 56,
                          border: `2px solid ${theme.colors.primary.main}`,
                        }}
                      />
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: theme.colors.text.primary,
                            lineHeight: 1.2,
                          }}
                        >
                          {review.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.colors.text.secondary,
                            fontSize: "0.85rem",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          {review.position}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
