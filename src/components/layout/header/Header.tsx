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
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import AdbIcon from "@mui/icons-material/Adb";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme as nexThemes } from "next-themes";
import Link from "next/link";

import { useTheme } from "@mui/material/styles";

type Props = {
  onSidebarOpen: () => void;
};

const Header: React.FC<Props> = ({ onSidebarOpen }) => {
  const [open, setOpen] = React.useState(false);
  const [openLocation, setOpenLoction] = React.useState(false);
  const [anchorElVenue, setAnchorElVenue] = React.useState<null | HTMLElement>(null);
  const [anchorElLocation, setAnchorElLocation] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  const { theme: themes, resolvedTheme, setTheme } = nexThemes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleOnMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAnchorElVenue(e.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const handleOnMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAnchorElVenue(e.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const handleOnMouseEnterLocation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAnchorElLocation(e.currentTarget);
    setOpenLoction((previousOpen) => !previousOpen);
  };

  const handleOnMouseLeaveLocation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAnchorElLocation(e.currentTarget);
    setOpenLoction((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorElVenue);
  const id = canBeOpen ? "transition-popper" : undefined;
  const canBeOpenLocation = open && Boolean(anchorElLocation);
  const idLocation = canBeOpenLocation ? "transition-popper" : undefined;

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

          {/* show logo on the center of the navbar on small screens */}
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
              gap: 2,
              pl: 4,
            }}
          >
            <Link href="/">
              <Typography
                component="a"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  letterSpacing: 0,
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 700,
                  textTransform: "capitalized",
                  py: 0.5,
                  px: 1.5,
                  transition: theme.transitions.create(["all"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Home
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                aria-describedby={id}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                component="a"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  letterSpacing: 0,
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 700,
                  textTransform: "capitalized",
                  py: 0.5,
                  px: 1.5,
                  transition: theme.transitions.create(["all"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Venue/Event
                <Popper id={id} open={open} anchorEl={anchorElVenue} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={400}>
                      <Paper sx={{ width: "100%", pt: 2, minWidth: "170px" }}>
                        <Link href="">
                          <List>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Marraige Halls" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Barber Shop" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Conference Hall" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Hotel" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Restaurant" />
                            </ListItemButton>
                          </List>
                        </Link>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                component="a"
                onMouseEnter={handleOnMouseEnterLocation}
                onMouseLeave={handleOnMouseLeaveLocation}
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  letterSpacing: 0,
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 700,
                  textTransform: "capitalized",
                  py: 0.5,
                  px: 1.5,
                  transition: theme.transitions.create(["all"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Popular/Location
                <Popper id={idLocation} open={openLocation} anchorEl={anchorElLocation} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={400}>
                      <Paper sx={{ width: "100%", pt: 2, minWidth: "170px" }}>
                        <Link href="">
                          <List>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Yaounde" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Douala" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Limbe" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Buea" />
                            </ListItemButton>
                            <ListItemButton component="a" sx={{ width: "100%" }}>
                              <ListItemText primary="Kribi" />
                            </ListItemButton>
                          </List>
                        </Link>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Typography>
            </Link>
            <Link href="/contact ">
              <Typography
                component="a"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  letterSpacing: 0,
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 700,
                  textTransform: "capitalized",
                  py: 0.5,
                  px: 1.5,
                  transition: theme.transitions.create(["all"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Contact
              </Typography>
            </Link>
            <Link href="/login">
              <Typography
                component="a"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  letterSpacing: 0,
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 700,
                  textTransform: "capitalized",
                  py: 0.5,
                  px: 1.5,
                  transition: theme.transitions.create(["all"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Login
              </Typography>
            </Link>
            <Box component={Link} href="/signup">
              <Typography
                component="a"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  letterSpacing: 0,
                  fontFamily: "IBM Plex Sans",
                  fontWeight: 700,
                  textTransform: "capitalized",
                  py: 0.5,
                  px: 1.5,
                  transition: theme.transitions.create(["all"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }),
                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Signup
              </Typography>
            </Box>
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
