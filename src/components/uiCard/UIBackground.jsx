import { Box } from "@mui/material";

const UIBackground = ({ children, customStyle }) => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          padding: "6px",
          minHeight: "100%",
          minWidth: "100%",
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
