import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { useTheme } from "@mui/material/styles";

type Props = {
  open: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<Props> = ({ open, onClose }) => {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        onClose={() => onClose()}
        open={open}
        variant="temporary"
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: 180,
          },
        }}
      >
        <Box sx={{ height: "100%", padding: 1 }}>
          <Box width={1} paddingX={2} paddingY={1}>
            {/* <Link href="/" style={{ textDecoration: "none" }}>
              <IconButton size="large" disabled>
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    height: 52,
                    width: 52,
                    marginRight: "15px",
                  }}
                ></Avatar>
                <Typography
                  variant="h3"
                  component="div"
                  color={theme.palette.text.primary}
                  fontFamily='"Love Ya Like A Sister", cursive'
                  fontWeight="bold"
                  textDecoration="none"
                  flexGrow={1}
                >
                  Bob's Programming Academy
                </Typography>
              </IconButton>
            </Link> */}
          </Box>
          <Box paddingX={2} paddingY={2}>
            something goes here
          </Box>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default Sidebar;
