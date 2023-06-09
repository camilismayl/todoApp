import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const Container = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const UserKey = styled(Box)({
  fontSize: "21px",
  color: "white",
  letterSpacing: "0.2px",
  boxShadow: "6px 8px 10px rgba(0, 0, 0, 0.3)",
  minWidth: "110px",
  background: "linear-gradient(to right, #11998e, #38ef7d)",
  padding: "8px 15px",
  borderRadius: "10px",
});

export const UserValue = styled(Box)({
  color: "#FFFFFF",
  minWidth: "300px",
  marginLeft: "100px",
  fontSize: "21px",
  background: "linear-gradient(to right, #11998e, #38ef7d)",
  borderRadius: "10px",
  padding: "8px 15px",
  boxShadow: "6px 8px 10px rgba(0, 0, 0, 0.3)",
});