import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const CustomTypography = (props) => {
  const { children } = props;
  return (
    <Typography sx={{ color: "text.primary" }} {...props}>
      {children}
    </Typography>
  );
};

CustomTypography.propTypes = {
  children: PropTypes.string,
};

export default CustomTypography;
