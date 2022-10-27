import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Box } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { Category } from "@prisma/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("please enter name").min(3, "name to short").max(25, "name to long"),
});

type Props = {
  columns: MRT_ColumnDef<Category>[];
  onClose: () => void;
  onSubmit: (name: string) => void;
  open: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

type FormInputs = {
  name: string;
};

const CreateCategoryModal: React.FC<Props> = ({ open, onClose, onSubmit, inputRef }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(validationSchema) });

  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => {
    onSubmit(data.name);
    reset();
    onClose();
  };

  return (
    <Dialog open={open}>
      <Box sx={{ py: 4, minWidth: "350px" }}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogTitle textAlign="center">Create Category</DialogTitle>
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
                  id="category-name"
                  required
                  {...register("name")}
                  helperText={errors.name?.message}
                  error
                  inputRef={inputRef}
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

export default CreateCategoryModal;
