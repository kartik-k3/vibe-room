import { Typography } from "@mui/material";

const CustomTypography = (props) => {
  const { children } = props;
  return (
    <Typography sx={{ color: "text.primary" }} {...props}>
      {children}
    </Typography>
  );
};

export default CustomTypography;
