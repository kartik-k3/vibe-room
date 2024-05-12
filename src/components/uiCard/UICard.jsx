import React from "react";
import { Box } from "@mui/material";
import Proptypes from "prop-types";

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

UICard.propTypes = {
  children: Proptypes.element,
  customStyle: Proptypes.object,
};

export default UICard;
