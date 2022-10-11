import { useRef, useState } from "react";
import { AppBar, Avatar, Badge, Box, IconButton, styled, Toolbar, Tooltip, Typography, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Bell as BellIcon } from "./icons/bell";
import { Users as UsersIcon } from "./icons/users";
import { AccountPopover } from "./AccountPopover";
import { useSelector } from "react-redux";

import { AppState } from "../../redux/store";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[3],
}));

type Props = {
  onSidebarOpen: () => void;
};

export const DashboardNavbar: React.FC<Props> = ({ onSidebarOpen }) => {
  const theme = useTheme();
  const settingsRef = useRef(null);
  const [openAccountPopover, setOpenAccountPopover] = useState(false);

  //redux
  const { authUser, isAuth, loading } = useSelector((state: AppState) => state.auth);

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280,
          },
          width: {
            lg: "calc(100% - 280px)",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography variant="h4">Dashboard</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Contacts">
            <IconButton sx={{ ml: 1 }}>
              <UsersIcon fontSize="small" sx={{ color: theme.palette.common.white }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="secondary" variant="standard">
                <BellIcon fontSize="small" sx={{ color: theme.palette.common.white }} />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            alt="Admin Avatar Pic"
            src={authUser && authUser?.profilePicUrl ? authUser?.profilePicUrl : ""}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
              ml: 1,
              bgcolor: theme.palette.secondary.main,
            }}
          >
            {!loading && authUser && authUser?.profilePicUrl
              ? authUser?.profilePicUrl
              : authUser?.name
                  .toUpperCase()
                  .split(" ")
                  .map((item, i) => {
                    for (i; i < 2; i++) {
                      return item.charAt(0);
                    }
                  })
                  .join("")}
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  );
};
