import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  IconButton,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";

export default function Footer() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  return (
    <footer>
      <Box
        sx={{
          bgcolor: theme.colors.primary.main,
          backgroundImage: `linear-gradient(135deg, ${theme.colors.primary.main} 0%, ${theme.colors.primary.dark} 100%)`,
          color: "#fff",
          py: 6,
          boxShadow: `0 -4px 20px ${theme.colors.shadow}`,
        }}
      >
        <Container>
          <Grid container spacing={6}>
            {/* Brand Section */}
            <Grid item xs={12} md={5}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  letterSpacing: 1,
                  textShadow: `2px 2px 4px ${theme.colors.shadow}`,
                }}
              >
                Store Name
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, maxWidth: 350, lineHeight: 1.8, opacity: 0.9 }}
              >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio officiis magni, quidem autem veritatis reprehenderit perferendis vero repudiandae nam modi.
              </Typography>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
                Explore
              </Typography>
              <Stack spacing={2}>
                {[
                  { name: "Home", path: "/" },
                  { name: "Our Collection", path: "/products" },
                  { name: "Our Story", path: "/about" },
                  { name: "Contact Us", path: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      transition: "0.3s",
                    }}
                    sx={{
                      "&:hover": {
                        pl: 1,
                        opacity: 0.8,
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Newsletter & Social */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Join Our Community
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  Subscribe for exclusive offers and new arrivals.
                </Typography>

                <Box component="form" sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Your Email"
                    variant="outlined"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.15)",
                      borderRadius: 1,
                      input: { color: "#fff" },
                      "& fieldset": { border: "none" },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#fff",
                      color: theme.colors.primary.main,
                      fontWeight: "bold",
                      "&:hover": { bgcolor: "#f0f0f0" },
                    }}
                  >
                    Join
                  </Button>
                </Box>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mt: 2,
                    "& .MuiIconButton-root": {
                      bgcolor: theme.colors.overlay,
                      transition: "0.3s",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                        transform: "translateY(-3px)",
                      },
                    },
                  }}
                >
                  <IconButton
                    color="inherit"
                    href="https://facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                  >
                    <FacebookIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://twitter.com"
                    target="_blank"
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    href="https://linkedin.com"
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, borderColor: theme.colors.divider }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ mb: 1 }}>
              © {new Date().getFullYear()} store name. All Rights Reserved.
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              All content and designs presented on this website are protected
              under international copyright laws.
            </Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
