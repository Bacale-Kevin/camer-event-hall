import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Box, Breadcrumbs, Link as MuiLink, Typography, Button, IconButton, Alert, Tooltip } from "@mui/material";
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";

import { AppDispatch, AppState } from "../../../redux/store";
import { Category } from "@prisma/client";
import { createCategory, deleteCategory, updateCategory } from "../../../redux/features/categories/categoriesActions";
import CreateCategoryModal from "./CreateCategoryModal";

const CategoryComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: AppState) => state.category);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /***** ADD *****/
  const handleCreateNewRow = async (name: string) => {
    try {
      const response = await dispatch(createCategory(name)).unwrap();
      console.log(response);
      /**@Todo show toast notification */
    } catch (error) {
      /**@Todo show toast notification */
    }
  };

  /***** EDIT *****/
  const handleUpdateSave: MaterialReactTableProps<Category>["onEditingRowSave"] = async ({
    exitEditingMode,
    values,
  }) => {
    dispatch(updateCategory(values)).unwrap();
    exitEditingMode();
  };

  /***** DELETE *****/
  const handleDeleteRow = useCallback(
    (row: MRT_Row<Category>) => {
      const { id } = row.original;
      dispatch(deleteCategory(id)).unwrap();
    },
    [dispatch]
  );

  const columns = useMemo<MRT_ColumnDef<Category>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "ID",
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
        },
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Created At",
        enableEditing: false,
      },
    ],
    []
  );

  if (mounted) {
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
        {!loading && categories?.length === 0 ? (
          <>
            <MaterialReactTable
              columns={columns}
              data={categories}
              enableEditing
              onEditingRowSave={handleUpdateSave}
              enableRowActions
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      onClick={() => {
                        return table.setEditingRow(row);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Button color="primary" onClick={() => setCreateModalOpen(true)} variant="contained">
                  Create New Category
                </Button>
              )}
            />
            <Alert severity="info">No data! click on the button at the top left to create one</Alert>

            <CreateCategoryModal
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </>
        ) : (
          <>
            <MaterialReactTable
              columns={columns}
              data={categories}
              enableEditing
              onEditingRowSave={handleUpdateSave}
              enableRowActions
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      onClick={() => {
                        return table.setEditingRow(row);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              renderTopToolbarCustomActions={() => (
                <Button color="primary" onClick={() => setCreateModalOpen(true)} variant="contained">
                  Create New Category
                </Button>
              )}
            />

            <CreateCategoryModal
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
            />
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};

export default CategoryComponent;
