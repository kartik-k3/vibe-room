import { Box } from "@mui/material";

const UIBackground = ({ children, customStyle }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "6px",
          minHeight: "100vh",
          minWidth: "100vw",
          margin: 0,
          ...customStyle,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default UIBackground;
