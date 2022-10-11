import React from "react";
import { Box, Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";

const Category: React.FC = () => {
  return (
    <>
      <Box sx={{ py: 2, pl: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/" passHref>
            <MuiLink underline="hover" color="inherit">
              Home
            </MuiLink>
          </Link>
          <Link href="/admin" passHref>
            <MuiLink underline="hover" color="inherit">
              Admin
            </MuiLink>
          </Link>
          <Typography color="text.primary">Categories</Typography>
        </Breadcrumbs>
      </Box>
    </>
  );
};

export default Category;
