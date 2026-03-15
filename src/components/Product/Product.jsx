import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Product({ product }) {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  return (
    <Grid item xs={12} sm={6} md={4} key={product._id}>
      <Card
        sx={{
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          // Glass / Modern Background
          background: isDarkMode
            ? "rgba(30,30,30,0.5)"
            : "rgba(255,255,255,0.7)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.5)"}`,
          boxShadow: "none",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-12px)",
            boxShadow: isDarkMode
              ? "0 20px 40px rgba(0,0,0,0.4)"
              : "0 20px 40px rgba(0,0,0,0.1)",
            "& .product-image": {
              transform: "scale(1.1)",
            },
            "& .action-buttons": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        }}
      >
        {/* Image Area */}
        <Box sx={{ position: "relative", overflow: "hidden", height: "280px" }}>
          <CardMedia
            className="product-image"
            component="img"
            height="100%"
            image={product.image}
            alt={product.title}
            sx={{
              objectFit: "cover",
              transition: "transform 0.6s ease",
              width: "100%",
            }}
          />

          <Chip
            label={product.category?.name || "Collection"}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              bgcolor: "rgba(0,0,0,0.6)",
              color: "white",
              backdropFilter: "blur(4px)",
              fontWeight: "bold",
              fontSize: "0.7rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          />

          {/* Hover Actions */}
          <Box
            className="action-buttons"
            sx={{
              position: "absolute",
              bottom: 16,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.3s ease",
              zIndex: 2,
            }}
          >
            <Tooltip title="View Details">
              <IconButton
                onClick={() => navigate(`/products/${product._id}`)}
                sx={{
                  bgcolor: "white",
                  color: "black",
                  "&:hover": {
                    bgcolor: theme.colors.primary.main,
                    color: "white",
                  },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Buy Now">
              <IconButton
                onClick={() => navigate(`/products/${product._id}`)}
                sx={{
                  bgcolor: "white",
                  color: "black",
                  "&:hover": {
                    bgcolor: theme.colors.primary.main,
                    color: "white",
                  },
                }}
              >
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent
          sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: theme.colors.text.primary,
                lineHeight: 1.2,
                cursor: "pointer",
                "&:hover": { color: theme.colors.primary.main },
              }}
              onClick={() => navigate(`/products/${product._id}`)}
            >
              {product.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: theme.colors.primary.main, fontWeight: "900" }}
            >
              ${product.price}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              value={product.rating || 4.5}
              precision={0.5}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": { color: theme.colors.primary.main },
              }}
            />
            <Typography
              variant="caption"
              sx={{
                ml: 1,
                color: theme.colors.text.secondary,
                fontWeight: "bold",
              }}
            >
              ({product.rating || 4.5})
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color={theme.colors.text.secondary}
            sx={{
              mb: 3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              opacity: 0.8,
            }}
          >
            {product.description}
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate(`/products/${product._id}`)}
            sx={{
              mt: "auto",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              borderWidth: "2px",
              borderColor: theme.colors.primary.main,
              color: theme.colors.text.primary,
              "&:hover": {
                borderWidth: "2px",
                bgcolor: theme.colors.primary.main,
                color: "white",
                borderColor: theme.colors.primary.main,
              },
            }}
          >
            View Product
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}
