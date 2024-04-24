import { Box } from "@mui/material";

const UICard = ({ renderJsx }, props) => {
  return (
    <>
      <Box sx={{ borderRadius: "16px" }}>{renderJsx}</Box>
    </>
  );
};

export default UICard;
