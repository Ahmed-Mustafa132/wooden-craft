import { useRef } from "react";
import { getTheme } from "../../../Theme/Theme";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../Context/ThemeContext";
import * as THREE from "three";
import ThreeBackground from "../../ThreeBG/ThreeBackground";

import { Container, Box, Typography, Grid, Button } from "@mui/material";
export default function About() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const objectsRef = useRef({ sphere: null, innerSphere: null });

  const navigate = useNavigate();

  const init = (scene) => {
    // Geometry
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: theme.colors.primary.main,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    objectsRef.current.sphere = sphere;

    // Inner Sphere
    const innerGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: theme.colors.text.secondary,
      wireframe: false,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);
    objectsRef.current.innerSphere = innerSphere;
  };

  const animate = () => {
    const { sphere, innerSphere } = objectsRef.current;
    if (sphere) {
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.005;
    }
    if (innerSphere) {
      innerSphere.rotation.x -= 0.01;
      innerSphere.rotation.y -= 0.01;
    }
  };

  return (
    <section className="section3">
      <Container maxWidth="lg">
        <Box sx={{ py: 12 }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 900,
              mb: 8,
              background: isDarkMode
                ? `linear-gradient(45deg, #FFF 30%, ${theme.colors.primary.main} 90%)`
                : `linear-gradient(45deg, ${theme.colors.text.primary} 30%, ${theme.colors.primary.main} 90%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textTransform: "uppercase",
              letterSpacing: "2px",
              textShadow: isDarkMode
                ? "0px 10px 20px rgba(255,255,255,0.1)"
                : "0px 10px 20px rgba(0,0,0,0.1)",
            }}
          >
            Who We Are
          </Typography>

          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} sx={{ perspective: "1500px" }}>
              <ThreeBackground
                init={init}
                animate={animate}
                dependencies={[theme]}
                cameraPos={{ z: 2.5 }}
                sx={{
                  height: "500px",
                  width: "100%",
                  position: "relative",
                  cursor: "pointer",
                  "&:hover": { transform: "scale(1.05)" },
                  transition: "transform 0.3s ease",
                  // Force reset absolute positioning from wrapper for this use-case
                  top: "auto",
                  left: "auto",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "800",
                  mb: 2,
                  color: theme.colors.text.primary,
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "60px",
                    height: "6px",
                    bottom: "0px",
                    left: "0",
                    backgroundColor: theme.colors.primary.main,
                    borderRadius: "4px",
                  },
                  paddingBottom: "15px",
                }}
              >
                Modern Design
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  mb: 4,
                  color: theme.colors.text.secondary,
                  textShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas, delectus nemo? Quos molestias aliquid molestiae non
                omnis nemo iure fugiat deserunt soluta quidem veritatis ducimus
                architecto, tempore maiores rem! Animi.
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  borderRadius: "50px",
                  bgcolor: theme.colors.primary.main,
                  boxShadow: `0 10px 20px ${theme.colors.shadow}`,
                  "&:hover": {
                    bgcolor: theme.colors.primary.dark,
                    transform: "translateY(-3px)",
                    boxShadow: `0 15px 30px ${theme.colors.shadow}`,
                  },
                  transition: "all 0.3s ease",
                }}
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}
