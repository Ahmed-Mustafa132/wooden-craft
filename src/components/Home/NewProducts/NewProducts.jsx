import { useState, useEffect, useRef } from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import axiosInstance from "../../../axiosConfig/axiosConfig";
import { getTheme } from "../../../Theme/Theme";
import { useThemeContext } from "../../../Context/ThemeContext";
import Product from "../../../components/Product/Product";
import * as THREE from "three";
import ThreeBackground from "../../ThreeBG/ThreeBackground";

export default function NewProducts() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cubesRef = useRef([]);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        // Map the populated category object to its name string to prevent React rendering errors
        const mappedProducts = res.data.products.map((product) => ({
          ...product,
          category: product.category?.name || "Uncategorized",
        }));
        setProducts(mappedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const init = (scene) => {
    // Floating Shapes
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({
      color: theme.colors.primary.main,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });

    const cubes = [];
    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5,
      );
      cube.userData = { speed: Math.random() * 0.01 };
      scene.add(cube);
      cubes.push(cube);
    }
    cubesRef.current = cubes;
  };

  const animate = () => {
    cubesRef.current.forEach((cube) => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      cube.position.y += cube.userData.speed;
      if (cube.position.y > 5) cube.position.y = -5;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section
      className="section2"
      style={{ position: "relative", paddingBottom: "50px" }}
    >
      <ThreeBackground
        init={init}
        animate={animate}
        dependencies={[theme]}
        sx={{ zIndex: -1, pointerEvents: "none" }}
      />
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ color: theme.colors.text.primary, paddingTop: "40px" }}
        >
          Products Featured
        </Typography>

        <Grid container spacing={4}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                sx={{ color: theme.colors.text.primary, padding: "40px 0" }}
              >
                No products available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </section>
  );
}
