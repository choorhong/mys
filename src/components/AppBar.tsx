import { AppBar, Container, Toolbar, Typography } from "@mui/material";

import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ mb: 2 }} className="app-bar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { md: "flex", cursor: "pointer" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MYS
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
