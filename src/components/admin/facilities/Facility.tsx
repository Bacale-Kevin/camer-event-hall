import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Box, Breadcrumbs, Link as MuiLink, Typography, Button, IconButton, Alert, Tooltip } from "@mui/material";
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";

import { AppDispatch, AppState } from "../../../redux/store";
import { Facility } from "@prisma/client";
import { createFacility, deleteFacility, updateFacility } from "../../../redux/features/facilities/faciltiesActions";
import CreateFacilityModal from "./CreateFacilityModal";

const FacilityComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { facilities, loading } = useSelector((state: AppState) => state.facility);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /***** ADD *****/
  const handleCreateNewRow = async (name: string) => {
    try {
      const response: any = await dispatch(createFacility(name)).unwrap();

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error);
    }
  };

  /***** EDIT *****/
  const handleUpdateSave: MaterialReactTableProps<Facility>["onEditingRowSave"] = async ({
    exitEditingMode,
    values,
  }) => {
    try {
      await dispatch(updateFacility(values)).unwrap();
      exitEditingMode();
      toast.success("Task completed successfully");
    } catch (error: any) {
      toast.error(error);
    }
  };

  /***** DELETE *****/
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<Facility>) => {
      if (window.confirm("Do really want to delete this row ? this action can not be undo once confirm!")) {
        try {
          const { id } = row.original;
          await dispatch(deleteFacility(id)).unwrap();

          toast.success("Task completed successfully");
        } catch (error: any) {
          toast.error(error);
        }
      }
    },
    [dispatch]
  );

  const columns = useMemo<MRT_ColumnDef<Facility>[]>(
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
        {!loading && facilities?.length === 0 ? (
          <>
            <MaterialReactTable
              columns={columns}
              data={facilities}
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
                  Create New Facility
                </Button>
              )}
            />

            <CreateFacilityModal
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
              data={facilities}
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
                  Create New Facility
                </Button>
              )}
            />

            <CreateFacilityModal
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

export default FacilityComponent;
