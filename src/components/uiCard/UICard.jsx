import { Box } from "@mui/material";

const UICard = ({ children, customStyle }) => {
  return (
    <>
      <Box
        sx={{
          ...customStyle,
          borderRadius: "16px",
          backgroundColor: "background.paper",
          padding: "16px",
          color: "text.primary",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default UICard;
