import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import MaterialReactTable, { MaterialReactTableProps, MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Box, Breadcrumbs, Button, Link as MuiLink, IconButton, Tooltip, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import dayjs from "dayjs";

import { addVenue, deleteVenue, getVenue, getVenues, updateVenue } from "../../../redux/features/venue/venueActions";
import { VenueType } from "../../../types/venue.types";
import { AppDispatch, AppState } from "../../../redux/store";
import VenueModalCreate from "./VenueModalCreate";
import { getCategories } from "../../../redux/features/categories/categoriesActions";
import { getFacilities } from "../../../redux/features/facilities/faciltiesActions";
import VenueModalUpdate from "./VenueModalUpdate";

const Venues: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
  const { venues, loading } = useSelector((state: AppState) => state.venue);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getFacilities());
    dispatch(getVenues());
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (updateModalOpen && inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    return () => clearTimeout(timeout);
  }, [updateModalOpen]);

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

  const handleUpdateRow = async (values: VenueType) => {
    try {
      await dispatch(updateVenue(values)).unwrap();
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
        accessorKey: "price",
        header: "Price",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          required: true,
          type: "number",
        },
        Cell: (cellProps) => {
          return (
            <>
              <Box
                component="span"
                // sx={{ border: 1, py: 0.5, px: 1.5, borderRadius: 10, borderColor: theme.palette.grey[300] }}
              >
                {cellProps?.row?.original?.price
                  // .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                XAF
              </Box>
            </>
          );
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
        Cell: (cellProps) => {
          return (
            <>
              <Box component="span" sx={{ textTransform: "capitalize" }}>
                {cellProps?.row?.original?.city}
              </Box>
            </>
          );
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
        Cell: (cellProps) => {
          return (
            <>
              <Box component="span" sx={{ textTransform: "capitalize" }}>
                {cellProps?.row?.original?.location}
              </Box>
            </>
          );
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
        Cell: (cellProps) => {
          return (
            <>
              <Box component="span" sx={{}}>
                {cellProps?.row?.original?.price
                  // .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                {dayjs(cellProps?.row?.original?.createdAt).format("DD/MM/YYYY")}
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
            <Typography color="text.primary">Venues</Typography>
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
                      // onClick={() => {
                      //   return table.setEditingRow(row);
                      // }}
                      onClick={() => {
                        const id = row.original?.id;
                        dispatch(getVenue(id!));
                        return setUpdateModalOpen(true);
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

            <VenueModalCreate
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
              data={venues}
              enableEditing
              onEditingRowSave={handleUpdateSave}
              enableRowActions
              renderRowActions={({ row, table }) => (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                  <Tooltip arrow placement="left" title="Edit">
                    <IconButton
                      // onClick={() => {
                      //   return table.setEditingRow(row);
                      // }}
                      onClick={() => {
                        const id = row.original?.id;
                        dispatch(getVenue(id!));
                        return setUpdateModalOpen(true);
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

            <VenueModalCreate
              columns={columns}
              open={createModalOpen}
              onClose={() => setCreateModalOpen(false)}
              onSubmit={handleCreateNewRow}
              inputRef={inputRef}
            />
            <VenueModalUpdate
              columns={columns}
              open={updateModalOpen}
              onClose={() => setUpdateModalOpen(false)}
              onSubmit={handleUpdateRow}
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

export default Venues;
