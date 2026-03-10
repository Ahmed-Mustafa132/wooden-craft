import { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import axiosInstance from "../../../axiosConfig/axiosConfig";
import { getTheme } from "../../../Theme/Theme";
import { useThemeContext } from "../../../Context/ThemeContext";
import Product from "../../../components/Product/Product";

export default function NewProducts() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <section className="section2">
      <Container>
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
