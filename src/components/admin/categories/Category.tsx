import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Box, Breadcrumbs, Link as MuiLink, Typography, Button, IconButton, Tooltip } from "@mui/material";
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";

import { AppDispatch, AppState } from "../../../redux/store";
import { Category } from "@prisma/client";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../../../redux/features/categories/categoriesActions";
import CreateCategoryModal from "./CreateCategoryModal";

const CategoryComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: AppState) => state.category);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  /**
   * React strict mode makes the textfield not to autofocus
   * This useEffect ensures that when the form is open it is autofocused
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (createModalOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [createModalOpen]);

  /***** ADD *****/
  const handleCreateNewRow = async (name: string) => {
    try {
      const response: any = await dispatch(createCategory(name)).unwrap();

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error);
    }
  };

  /***** EDIT *****/
  const handleUpdateSave: MaterialReactTableProps<Category>["onEditingRowSave"] = async ({
    exitEditingMode,
    values,
  }) => {
    try {
      await dispatch(updateCategory(values)).unwrap();
      exitEditingMode();
      toast.success("Task completed successfully");
    } catch (error: any) {
      toast.error(error);
    }
  };

  /***** DELETE *****/
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Category>) => {
      if (window.confirm("Do really want to delete this row ? is action can not be undo once confirm!")) {
        try {
          const { id } = row.original;
          await dispatch(deleteCategory(id)).unwrap();

          toast.success("Task completed successfully");
        } catch (error: any) {
          toast.error(error);
        }
      }
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

        {/* show skeleton loader  */}
        {loading ? (
          <>
            <MaterialReactTable
              columns={columns}
              data={[]}
              state={{ isLoading: loading }}
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
              inputRef={inputRef}
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
              inputRef={inputRef}
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
