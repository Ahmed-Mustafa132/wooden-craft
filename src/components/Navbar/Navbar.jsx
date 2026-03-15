import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate, useLocation } from "react-router-dom";
import { getTheme } from "../../Theme/Theme";
import { useThemeContext } from "../../Context/ThemeContext";
import CartDrawer from "../Card/Card";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = getTheme(isDarkMode);
  const { isLoggedIn, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const baseNavItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];
  const userData = JSON.parse(localStorage.getItem("userData"));

  const navItems =
    userData?.role === "admin"
      ? [...baseNavItems, { name: "Dashboard", path: "/dashboard" }]
      : userData?.role === "user"
        ? [...baseNavItems, { name: "Orders", path: "/order" }]
        : baseNavItems;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const userSection = (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <IconButton
        onClick={() => toggleTheme()}
        sx={{ color: "#fff" }}
        aria-label="mod"
      >
        {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <CartDrawer />
      {isLoggedIn ? (
        <>
          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => navigate("/profile")}
          >
            <PersonIcon />
          </IconButton>
          <Button
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "20px",
              px: 3,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            sx={{
              color: "#fff",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "20px",
              px: 3,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </>
      )}
    </Box>
  );

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", bgcolor: theme.colors.primary.main }}
    >
      <Typography
        variant="h5"
        sx={{ my: 3, color: "#fff", fontWeight: 800, letterSpacing: "1px" }}
      >
        STORE NAME
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                textAlign: "center",
                py: 2,
                backgroundColor:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
              }}
            >
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled
            ? isDarkMode
              ? "rgba(30, 30, 30, 0.85)"
              : theme.colors.primary.main
            : theme.colors.primary.main,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)" : "none",
          transition: "all 0.4s ease",
          py: scrolled ? 0.5 : 1.5,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {isMobile && (
              <IconButton
                sx={{ color: "#fff" }}
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: isMobile ? 0 : 1,
                color: "#fff",
                fontWeight: 900,
                letterSpacing: "-1px",
                background: "linear-gradient(45deg, #FFF 30%, #E0E0E0 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer",
                textShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
              onClick={() => navigate("/")}
            >
              Store Name
            </Typography>

            {!isMobile && (
              <Box sx={{ display: "flex", gap: 4 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    sx={{
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: 500,
                      textTransform: "none",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: location.pathname === item.path ? "100%" : "0",
                        height: "2px",
                        bottom: "2px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#fff",
                        transition: "width 0.3s ease-in-out",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                      "&:hover": {
                        color: "#fff",
                        backgroundColor: "transparent",
                        textShadow: "0 0 8px rgba(255,255,255,0.5)",
                      },
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}

            {userSection}
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              bgcolor: theme.colors.primary.main,
              backdropFilter: "blur(10px)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
