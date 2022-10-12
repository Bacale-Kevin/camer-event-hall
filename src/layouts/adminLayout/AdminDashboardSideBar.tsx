import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Drawer, Theme, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AdbIcon from "@mui/icons-material/Adb";
import { ChartBar as ChartBarIcon } from "./icons/chart-bar";
import { Cog as CogIcon } from "./icons/cog";
import { User as UserIcon } from "./icons/user";
import { Users as UsersIcon } from "./icons/users";
import {
  ApartmentRounded,
  ArtTrackRounded,
  BookOnlineRounded,
  CategoryRounded,
  Logout,
  NotificationsActiveRounded,
} from "@mui/icons-material";

import { NavItem } from "./NavItem";

const items = [
  {
    href: "/admin",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
  },
  {
    href: "/admin/users",
    icon: <UsersIcon fontSize="small" />,
    title: "Users",
  },
  {
    href: "/admin/categories",
    icon: <CategoryRounded fontSize="small" />,
    title: "Categories",
  },
  {
    href: "/admin/facilities",
    icon: <ArtTrackRounded fontSize="small" />,
    title: "Facilities",
  },
  {
    href: "/admin/venues",
    icon: <ApartmentRounded fontSize="small" />,
    title: "Venues",
  },
  {
    href: "/admin/bookings",
    icon: <BookOnlineRounded fontSize="small" />,
    title: "Bookings",
  },
  {
    href: "/admin/notification",
    icon: <NotificationsActiveRounded fontSize="small" />,
    title: "Notifications",
  },
  {
    href: "/admin/account",
    icon: <UserIcon fontSize="small" />,
    title: "Profile",
  },
  {
    href: "/settings",
    icon: <CogIcon fontSize="small" />,
    title: "Settings",
  },
  {
    href: "#",
    icon: <Logout fontSize="small" />,
    title: "Logout",
  },
];

type Props = {
  onClose: () => void;
  open: boolean;
};

export const DashboardSidebar: React.FC<Props> = ({ onClose, open }) => {
  const theme = useTheme();
  const router = useRouter();
  const lgUp = useMediaQuery((theme: Theme) => theme?.breakpoints?.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: theme.palette.primary.main,
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
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
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
          ))}
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};
