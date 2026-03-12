import { getTheme } from "../../../Theme/Theme";
import { useNavigate } from "react-router-dom";
import Image from "../../../assets/Images/Image.jpg";
import { useThemeContext } from "../../../Context/ThemeContext";

import {
  Container,
  Box,
  Typography,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
export default function About() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);

  const navigate = useNavigate();
  return (
    <section className="section3">
      <Container>
        <Box sx={{ py: 8 }}>
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 6,
              color: theme.colors.text.primary,
            }}
          >
            About US
          </Typography>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="450"
                image={Image}
                alt="Woodworking"
                sx={{
                  borderRadius: 2,
                  boxShadow: `0 4px 20px ${theme.colors.shadow}`,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: theme.colors.text.primary }}
              >
                Store Name 
              </Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{
                  fontSize: "1.1rem",
                  mb: 3,
                  color: theme.colors.text.secondary,
                }}
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe
                illo perferendis culpa. Inventore delectus non nihil in corporis
                vel voluptas? Consequatur officiis harum aperiam maxime nulla,
                labore tempore et repellendus voluptas excepturi illo doloribus
                consectetur nobis fugit vitae optio. Eum eius ipsam maxime
                ducimus sint iusto. At placeat earum eligendi? Quisquam odio
                accusamus esse animi nisi ab delectus ipsum illum odit rem
                excepturi perspiciatis deserunt ea corporis amet eaque repellat,
                officia ducimus sapiente totam a. Blanditiis ipsa ratione
                repellendus, reiciendis modi esse deleniti veritatis
                voluptatibus numquam, quisquam obcaecati quis voluptas aut
                suscipit corrupti incidunt, pariatur enim error illum dolore
                commodi?
              </Typography>

              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: theme.colors.primary.main,
                  "&:hover": {
                    bgcolor: theme.colors.primary.dark,
                  },
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
