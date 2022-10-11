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
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme as nexThemes } from "next-themes";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, AppState } from "../../../redux/store";
import { logoutUser } from "../../../redux/features/auth/authActions";
import { Stack } from "@mui/material";
import {
  AccountCircle,
  AccountCircleOutlined,
  BookOnline,
  BookOnlineOutlined,
  Dashboard,
  DashboardOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  LogoutOutlined,
  ReviewsOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

type Props = {
  onSidebarOpen: () => void;
};

const Header: React.FC<Props> = ({ onSidebarOpen }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  //redux
  const { authUser, isAuth, loading } = useSelector((state: AppState) => state.auth);

  //menu items links dropdown state
  const [open, setOpen] = React.useState(false);
  const [openLocation, setOpenLoction] = React.useState(false);
  const [anchorElVenue, setAnchorElVenue] = React.useState<null | HTMLElement>(null);
  const [anchorElLocation, setAnchorElLocation] = React.useState<null | HTMLElement>(null);

  //avatar user state
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { theme: themes, resolvedTheme, setTheme } = nexThemes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /**** Handle Dropdown Menu Links *****/
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

  /***** Handle Open And Close User Avatar *****/
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  /***** Logout User ******/
  const handleLogout = async () => {
    await dispatch(logoutUser());
    setAnchorElUser(null);
    router.push("/auth/login");
  };

  /***** Handle Popper Dropdown Stuff *****/
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
                  bgcolor: router.pathname === "/" ? theme.palette.primary.light : "",
                  borderRadius: router.pathname === "/" ? "4px" : "",

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

                  bgcolor: router.pathname === "/contact" ? theme.palette.primary.light : "",
                  borderRadius: router.pathname === "/contact" ? "4px" : "",

                  "&:hover": {
                    borderRadius: "4px",
                    bgcolor: theme.palette.primary.light,
                  },
                }}
              >
                Contact
              </Typography>
            </Link>
            {!isAuth && !loading ? (
              <Link href="/auth/login">
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

                    bgcolor: router.pathname === "/auth/login" ? theme.palette.primary.light : "",
                    borderRadius: router.pathname === "/auth/login" ? "4px" : "",

                    "&:hover": {
                      borderRadius: "4px",
                      bgcolor: theme.palette.primary.light,
                    },
                  }}
                >
                  Login
                </Typography>
              </Link>
            ) : (
              ""
            )}
            {!isAuth && !loading ? (
              <Box component={Link} href="/auth/signup">
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

                    bgcolor: router.pathname === "/auth/signup" ? theme.palette.primary.light : "",
                    borderRadius: router.pathname === "/auth/signup" ? "4px" : "",

                    "&:hover": {
                      borderRadius: "4px",
                      bgcolor: theme.palette.primary.light,
                    },
                  }}
                >
                  Signup
                </Typography>
              </Box>
            ) : (
              <Box component={Link} href="/auth/signup">
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

                    bgcolor: router.pathname === "/auth/signup" ? theme.palette.primary.light : "",
                    borderRadius: router.pathname === "/auth/signup" ? "4px" : "",

                    "&:hover": {
                      borderRadius: "4px",
                      bgcolor: theme.palette.primary.light,
                    },
                  }}
                >
                  Favorite
                </Typography>
              </Box>
            )}
          </Box>
          <Stack direction="row" spacing={2}>
            <IconButton
              color="secondary"
              size="small"
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  // mx: 4,
                  border: "1px solid",
                  borderColor: theme.palette.secondary.main,
                  borderRadius: "10px",
                },
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Tooltip title="switch to light mode">
                  <LightModeIcon fontSize="small" color="secondary" />
                </Tooltip>
              ) : (
                <Tooltip title="switch to dark mode">
                  <DarkModeIcon fontSize="small" color="secondary" />
                </Tooltip>
              )}
            </IconButton>
            <Button variant="contained" color="secondary" sx={{ display: { xs: "none", lg: "block" } }}>
              List Your Venue
            </Button>

            {/* avatar */}
            {!loading && isAuth && authUser !== null ? (
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {/* avatar */}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="User Avatart Image"
                      src={authUser && authUser?.profilePicUrl ? authUser?.profilePicUrl : ""}
                      sx={{ bgcolor: theme.palette.secondary.main }}
                    >
                      {!loading && authUser && authUser?.profilePicUrl
                        ? authUser?.profilePicUrl
                        : authUser.name
                            .toUpperCase()
                            .split(" ")
                            .map((item, i) => {
                              for (i; i < 2; i++) {
                                return item.charAt(0);
                              }
                            })
                            .join("")}
                    </Avatar>
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Stack direction="row" spacing={1}>
                      <AccountCircleOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Profile
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Stack direction="row" spacing={1}>
                      <DashboardOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Dashboard
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Stack direction="row" spacing={1}>
                      <BookOnlineOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Bookings
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Stack direction="row" spacing={1}>
                      <FavoriteBorderOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Favorites
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Stack direction="row" spacing={1}>
                      <ReviewsOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Reviews
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Stack direction="row" spacing={1}>
                      <SettingsOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Settings
                      </Typography>
                    </Stack>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Stack direction="row" spacing={1}>
                      <LogoutOutlined sx={{ color: theme.palette.grey[800] }} />
                      <Typography textAlign="center" color={theme.palette.grey[800]}>
                        Logout
                      </Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              ""
            )}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
