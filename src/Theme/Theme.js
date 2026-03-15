export const lightTheme = {
  colors: {
    primary: {
      main: "#6366f1", // Modern Indigo
      dark: "#4338ca",
      light: "#818cf8",
    },
    text: {
      primary: "#0f172a", // Slate 900
      secondary: "#475569", // Slate 600
    },
    background: {
      paper: "#ffffff",
      default: "#f8fafc", // Slate 50
    },
    shadow: "rgba(99, 102, 241, 0.15)",
    overlay: "rgba(99, 102, 241, 0.05)",
  },
};

export const darkTheme = {
  colors: {
    primary: {
      main: "#818cf8", // Soft Indigo
      dark: "#6366f1",
      light: "#c7d2fe",
    },
    text: {
      primary: "#f8fafc", // Slate 50
      secondary: "#94a3b8", // Slate 400
    },
    background: {
      paper: "#1e293b", // Slate 800
      default: "#0f172a", // Slate 900
    },
    shadow: "rgba(0,0,0,0.5)",
    overlay: "rgba(0,0,0,0.4)",
  },
};

export const getTheme = (isDarkMode) => {
  return isDarkMode ? darkTheme : lightTheme;
};

export default lightTheme;
