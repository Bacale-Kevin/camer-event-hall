import { Box, Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { AdminDashboardLayout } from "../../layouts/adminLayout/AdminDashboardLayout";

const AdminDashboard: React.FC = () => {
  return (
    <AdminDashboardLayout>
      <Box sx={{ py: 2, pl: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/" passHref>
            <MuiLink underline="hover" color="inherit">
              Home
            </MuiLink>
          </Link>
          <Typography color="text.primary">Admin</Typography>
        </Breadcrumbs>
      </Box>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
