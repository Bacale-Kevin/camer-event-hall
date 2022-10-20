import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { Box, Breadcrumbs, Link as MuiLink, Typography, Button, IconButton, Alert, Tooltip } from "@mui/material";
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import toast from "react-hot-toast";
import dayjs from 'dayjs'

import { AppDispatch, AppState } from "../../../redux/store";
import { Facility } from "@prisma/client";
import {
  createFacility,
  deleteFacility,
  getFacilities,
  updateFacility,
} from "../../../redux/features/facilities/faciltiesActions";
import CreateFacilityModal from "./CreateFacilityModal";

const FacilityComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { facilities, loading } = useSelector((state: AppState) => state.facility);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    dispatch(getFacilities());
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
        Cell: (cellProps) => {
          return (
            <>
              <Box component="span" sx={{ textTransform: "capitalize" }}>
                {cellProps?.row?.original?.name}
              </Box>
            </>
          );
        },
      },
      {
        accessorKey: "createdAt", //normal accessorKey
        header: "Created At",
        enableEditing: false,
        Cell: (cellProps) => {
          return (
            <>
              <Box component="span" sx={{ textTransform: "capitalize" }}>
                {dayjs(cellProps?.row?.original?.createdAt).format('DD/MM/YYYY')}
              </Box>
            </>
          );
        },
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
            <Typography color="text.primary">Facilities</Typography>
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
                  Create New Facility
                </Button>
              )}
            />

            <CreateFacilityModal
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

export default FacilityComponent;
