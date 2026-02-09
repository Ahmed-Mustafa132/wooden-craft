export const lightTheme = {
    colors: {
        primary: {
            main: "#1976d2",
            dark: "#1565c0",
            light: "#2196F3",
        },
        text: {
            primary: "#2c3e50",
            secondary: "#555555",
        },
        background: {
            paper: "#ffffff",
            default: "#f8f9fa",
        },
        shadow: "rgba(0,0,0,0.15)",
    },
};

export const darkTheme = {
    colors: {
        primary: {
            main: "#1565c0",
            dark: "#0d47a1",
            light: "#42a5f5",
        },
        text: {
            primary: "#ffffff",
            secondary: "#ffffffd8",
        },
        background: {
            paper: "#2c3e50",
            caffe: "#34495e",
        },
        shadow: "rgba(0,0,0,0.5)",
    },
};

export const getTheme = (isDarkMode) => {
    return isDarkMode ? darkTheme : lightTheme;
};

export default lightTheme;
