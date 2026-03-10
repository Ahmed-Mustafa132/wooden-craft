import { useState, useEffect } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import Product from "../../components/Product/Product";

export default function Products() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <Box sx={{ py: 8, minHeight: "50vh" }}>
      <Container>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: theme.colors.text.primary,
            mb: 6,
          }}
        >
          Our Collection
        </Typography>

        <Grid container spacing={4}>
          {!products || products.length === 0 ? (
            <Container>There are no products available</Container>
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
