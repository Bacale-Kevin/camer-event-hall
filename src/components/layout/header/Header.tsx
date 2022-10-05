import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme as nexThemes } from "next-themes";

import { useTheme } from "@mui/material/styles";
import ColorModeContext from "../../colorModeContext/ColorModeContext";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header: React.FC = ({ onSidebarOpen }) => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const { theme: themes, resolvedTheme, setTheme } = nexThemes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <AppBar position="static" sx={{ overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* logo */}
          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}>
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "Satisfy",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CamerEventHall
            </Typography>
          </Box>

          {/* Toggle Hamburger Menu Button */}
          <Box sx={{ flexGrow: 0, display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={onSidebarOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* show to logo on the center of the navbar on small screens */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", lg: "none" }, alignItems: "center", justifyContent: "center" }}
          >
            <AdbIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                // display: { xs: "none", lg: "flex" },
                fontFamily: "Satisfy",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CamerEventHall
            </Typography>
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              pl: 4,
            }}
          >
            <Typography>Home</Typography>
            <Typography>Venue/Event</Typography>
            <Typography>Popular/Location</Typography>
            <Typography>Contact</Typography>
            <Typography>Login</Typography>
            <Typography>Signup</Typography>
          </Box>

          {/* avatar */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* avatar */}
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
            {theme.palette.mode} mode
            <IconButton
              disableTouchRipple
              // onClick={colorMode.toggleColorMode}
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              color="inherit"
              sx={{
                display: { xs: "none", sm: "block", mx: 4, border: "1px solid rgb(19, 47, 76)", borderRadius: "10px" },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <LightModeIcon fontSize="small" color="info" />
              ) : (
                <LightModeIcon fontSize="small" color="info" />
              )}
            </IconButton>
            <Button variant="contained" color="secondary" sx={{ display: { xs: "none", lg: "block" } }}>
              List Your Venue
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
