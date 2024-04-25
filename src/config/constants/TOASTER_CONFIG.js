export const TOASTER_CONFIG = {
  position: "top-right",
  reverseOrder: false,
  gutter: 22,
  containerStyle: {
    minWidth: "30px",
  },
  toastOptions: {
    // Define default options
    className: "",
    duration: 5000,
    style: {
      background: "#363636",
      color: "#fff",
    },
    // Default options for specific types
    success: {
      duration: 3100,
      theme: {
        primary: "green",
        secondary: "black",
      },
    },
    error: {
      duration: 2100,
      theme: {
        primary: "red",
        secondary: "white",
      },
    },
  },
};
