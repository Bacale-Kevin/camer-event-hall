import React from "react";
import { MRT_ColumnDef } from "material-react-table";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { Facility, Venue } from "@prisma/client";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { VenueType } from "../../../types/venue.types";

type Props = {
  columns: MRT_ColumnDef<VenueType>[];
  onClose: () => void;
  onSubmit: (values: VenueType) => void;
  open: boolean;
};

// export interface FormInputs {
//   id?: string;
//   name?: string;
//   price?: number | string;
//   description?: string;
//   location?: string;
//   city?: string;
//   longitude?: number | string;
//   latitude?: number | string;
//   guestCapacity?: number | string;
//   categoryId?: string;
//   imagesUrl?: string[];
//   isVerified?: boolean;
//   facilities?: Facility[];
//   venues: Venue[];
//   venue: Venue | null;
// }

const validationSchema = Yup.object().shape({
  name: Yup.string().required("please enter name").min(2, "name to short").max(25, "name to long"),
});

const VenueModalCreate: React.FC<Props> = ({ columns, onClose, onSubmit, open }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VenueType>({ resolver: yupResolver(validationSchema) });

  const onSubmitHandler: SubmitHandler<VenueType> = (data) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open}>
      <Box sx={{ py: 4, minWidth: "350px" }}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogTitle textAlign="center">Create Facility</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  fullWidth
                  label="Name"
                  type="text"
                  size="small"
                  variant="standard"
                  id="facility-name"
                  required
                  {...register("name")}
                  helperText={errors.name?.message}
                  error
                  //   inputRef={inputRef}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained">
              Save
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default VenueModalCreate;
