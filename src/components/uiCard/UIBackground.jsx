import React from "react";
import { Box } from "@mui/material";
import Proptypes from "prop-types";

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

UIBackground.propTypes = {
  children: Proptypes.element,
  customStyle: Proptypes.object,
};

export default UIBackground;
