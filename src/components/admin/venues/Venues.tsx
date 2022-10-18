import React, { useCallback, useMemo, useState } from "react";
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef, MRT_Row } from "material-react-table";
import { useRouter } from "next/router";

import { Alert, Box, Button, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addVenue, deleteVenue, updateVenue } from "../../../redux/features/venue/venueActions";
import { AppDispatch, AppState } from "../../../redux/store";
import VenueModalCreate from "./VenueModalCreate";
import toast from "react-hot-toast";
import { IVenue, VenueType } from "../../../types/venue.types";

const Venues: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { venues } = useSelector((state: AppState) => state.venue);

  const columns = useMemo<MRT_ColumnDef<VenueType>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
        },
      },
      {
        accessorKey: "price",
        header: "PricePerNight",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "number",
        },
      },
      {
        accessorKey: "city",
        header: "City",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "text",
        },
      },
      {
        accessorKey: "isVerified",
        header: "IsApproved",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "boolean",
        },
        Cell: (cellProps) => {
          return (
            <>
              <span>{cellProps.row.original?.isVerified ? "true" : "false"}</span>
            </>
          );
        },
      },
      {
        accessorKey: "guestCapacity",
        header: "GuestCapacity",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "number",
        },
      },
    ],
    []
  );

  /***** ADD *****/
  const handleCreateNewRow = async (values: VenueType) => {
    try {
      await dispatch(addVenue(values)).unwrap();
      toast.success("Task completed successfully");
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };

  /***** EDIT *****/
  const handleUpdateSave: MaterialReactTableProps<VenueType>["onEditingRowSave"] = async ({
    exitEditingMode,
    values,
  }) => {
    try {
      await dispatch(updateVenue(values)).unwrap();
      toast.success("Task completed successfully");
      exitEditingMode();
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };

  /***** DELETE *****/
  const handleDeleteRow = useCallback(
    async (row: MRT_Row<VenueType>) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("name")}`)) {
        return;
      }

      try {
        const { id } = row.original;
        await dispatch(deleteVenue(id!)).unwrap();
        toast.success("Task completed successfully");
      } catch (error: any) {
        toast.error(error);
        console.log(error);
      }
    },
    [dispatch]
  );

  return (
    <>
      {venues?.length === 0 ? (
        <>
          <MaterialReactTable
            columns={columns}
            data={venues}
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
                    // onClick={() => handleEdit(row, table)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete />
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
                Create New Venue
              </Button>
            )}
          />
          <Alert severity="info">No data! click on the button at the top left to create one</Alert>

          <VenueModalCreate
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
            data={venues!}
            enableEditing
            onEditingRowSave={handleUpdateSave}
            enableRowActions
            renderRowActions={({ row }) => (
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Tooltip arrow placement="left" title="Edit">
                  <IconButton
                    // onClick={() => {
                    //   return table.setEditingRow(row)
                    // }}
                    onClick={() => router.push(`${router.pathname}/edit/${row.original.id}`)}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement="right" title="View">
                  <IconButton onClick={() => router.push(`${router.pathname}/${row.original?.id}`)}>
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
            renderTopToolbarCustomActions={() => (
              <Button color="primary" onClick={() => setCreateModalOpen(true)} variant="contained">
                Add Venue
              </Button>
            )}
          />

          {/* <VeueModal
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          /> */}
          <VenueModalCreate
            columns={columns}
            open={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            onSubmit={handleCreateNewRow}
          />
        </>
      )}
    </>
  );
};

export default Venues;
