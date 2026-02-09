import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import axiosInstance from "../../axiosConfig/axiosConfig";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";

export default function NewProducts() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const navigate = useNavigate();
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
          sx={{ color: theme.colors.text.primary,
            paddingTop: "40px" }}
           
        >
          Products Featured
        </Typography>

        <Grid container spacing={4}>
          {products && products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: `0 4px 20px ${theme.colors.shadow}`,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.image}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ color: theme.colors.text.primary }}
                    >
                      {product.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: " 0 20px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: theme.colors.primary.main }}
                      >
                        ${product.price}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/products/" + product._id)}
                        sx={{
                          backgroundColor: theme.colors.primary.main,
                          "&:hover": {
                            backgroundColor: theme.colors.primary.dark,
                          },
                          mt: 2,
                        }}
                      >
                        let's buy
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
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
