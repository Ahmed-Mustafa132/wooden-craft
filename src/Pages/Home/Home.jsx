import {
  Card,
  CardMedia,
  Typography,
  Grid,
  Container,
  Button,
  Box,
  Rating,
  Avatar,
} from "@mui/material";
import Header from "../../components/Home/Header/Header";
import NewProducts from "../../components/NewProducts/NewProducts";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import About from "../../components/Home/About/About";
import Reviews from "../../components/Home/Review/Reviews";
export default function Home() {
  const { isDarkMode } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <NewProducts />
      <About />
      <Reviews/>
      
      
    </>
  );
}
