import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { DashboardNavbar } from "./AdminDashBoardNavbar";
import { DashboardSidebar } from "./AdminDashboardSideBar";
import Head from "next/head";

const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

type Props = {
  children: React.ReactNode;
  title?: string
};

export const AdminDashboardLayout: React.FC<Props> = ({ children, title }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
    <Head>
      <title>{ title }</title>
    </Head>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
    </>
  );
};
