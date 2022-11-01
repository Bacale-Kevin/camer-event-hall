import React, { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Yup from "yup";
import ImageUploading from "react-images-uploading";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Clear, Edit, FileUpload } from "@mui/icons-material";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";

import { AppState } from "../../../redux/store";
import { VenueType } from "../../../types/venue.types";

type Props = {
  columns: MRT_ColumnDef<VenueType>[];
  onClose: () => void;
  onSubmit: (values: VenueType) => void;
  open: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("please enter name").min(2, "name to short").max(25, "name to long"),
  price: Yup.number().required("please enter price").typeError("please enter price").min(2, "price is to small"),
  city: Yup.string().required("please enter city name").min(2, "city name to short").max(25, " city name to long"),
  location: Yup.string()
    .required("please enter location")
    .min(2, "location name to short")
    .max(25, " location name to long"),
  guestCapacity: Yup.number()
    .required("please enter capacity")
    .min(1, "capacity is to small")
    .typeError("Amount must be a number"),
  description: Yup.string()
    .required("please enter description")
    .min(25, "description should be more than 25 characters long")
    .max(2000, " description to long"),
  longitude: Yup.number()
    .min(6, "invalid longitude value")
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .optional(),
  latitude: Yup.number()
    .min(6, "invalid latitude value")
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable()
    .optional(),
  categoryId: Yup.string().required("please select a category"),
  imagesUrl: Yup.array(),
  facilities: Yup.array(),
});

const VenueModalCreate: React.FC<Props> = ({ columns, onClose, onSubmit, open, inputRef }) => {
  const [loading, setLoading] = useState(false);
  const maxNumber = 10;
  const { categories } = useSelector((state: AppState) => state.category);
  const { facilities } = useSelector((state: AppState) => state.facility);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<VenueType>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      imagesUrl: [],
    },
  });

  const onSubmitHandler: SubmitHandler<VenueType> = async (data) => {
    try {
    const dataUrl = data.imagesUrl?.map((el: any) => {
      return el.dataURL;
    });
    console.log("dataUR --> ", dataUrl);
    data.imagesUrl = [];

    // data.imagesUrl.push(...dataUrl!); //This doesn't work
    data.imagesUrl.push("One", "Two", "Three"); //This works

    // onSubmit(data);
    // reset();
    // onClose();
    } catch (error) {}
  };

  return (
    <Dialog open={open}>
      <Box sx={{ py: 4, minWidth: "350px" }}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogTitle textAlign="center">Create Facility</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* name */}
              <Grid item xs={4}>
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
                  error={errors.name ? true : false}
                  inputRef={inputRef}
                />
              </Grid>

              {/* city */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="City"
                  type="text"
                  size="small"
                  variant="standard"
                  id="facility-city"
                  required
                  {...register("city")}
                  helperText={errors.city?.message}
                  error={errors.city ? true : false}
                />
              </Grid>

              {/* location */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Location"
                  type="text"
                  size="small"
                  variant="standard"
                  id="facility-location"
                  required
                  {...register("location")}
                  helperText={errors.location?.message}
                  error={errors.location ? true : false}
                />
              </Grid>

              {/* price */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  size="small"
                  variant="standard"
                  id="facility-price"
                  required
                  {...register("price")}
                  helperText={errors.price?.message}
                  error={errors.price ? true : false}
                />
              </Grid>

              {/* longitude */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Longitude"
                  type="number"
                  size="small"
                  variant="standard"
                  id="facility-longitude"
                  {...register("longitude")}
                  helperText={errors.longitude?.message}
                  error={errors.longitude ? true : false}
                />
              </Grid>

              {/* latitude */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Latitude"
                  type="number"
                  size="small"
                  variant="standard"
                  id="facility-latitude"
                  {...register("latitude")}
                  helperText={errors.latitude?.message}
                  error={errors.latitude ? true : false}
                />
              </Grid>

              {/* capacity */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Guest Capacity"
                  type="number"
                  size="small"
                  variant="standard"
                  id="facility-capacity"
                  required
                  {...register("guestCapacity")}
                  helperText={errors.guestCapacity?.message}
                  error={errors.guestCapacity ? true : false}
                />
              </Grid>

              {/* category */}
              <Grid item xs={6}>
                <FormControl fullWidth className="custom_select" error={errors.categoryId ? true : false}>
                  <InputLabel id="Company-select-label" className="mb-2">
                    category
                  </InputLabel>
                  <Controller
                    name="categoryId"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Select
                        defaultValue=""
                        labelId="Company"
                        className="input-container"
                        id="Company"
                        size="small"
                        variant="standard"
                        disabled={!categories?.length}
                        value={value}
                        onChange={onChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.categoryId?.message}</FormHelperText>
                </FormControl>
              </Grid>

              {/* description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  type="text"
                  size="small"
                  variant="standard"
                  id="facility-desc"
                  multiline
                  required
                  rows={4}
                  {...register("description")}
                  helperText={errors.description?.message}
                  error={errors.description ? true : false}
                />
              </Grid>

              {/* switch */}
              <Grid item md={4} sx={{ py: 2, mt: 2 }}>
                <FormGroup>
                  <FormControlLabel control={<Switch {...register("isVerified")} />} label="Is Verified" />
                </FormGroup>
              </Grid>
              <Grid item xs={8} />

              {/* facilities */}
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
                    <Grid item xs={12}>
                      <FormLabel component="legend">Facilities</FormLabel>
                    </Grid>

                    <FormGroup>
                      <Grid container>
                        {facilities?.map((options, i) => (
                          <Grid item md={4} key={i}>
                            <Controller
                              name="facilities"
                              control={control}
                              defaultValue={[]}
                              render={({ field: { onChange, value } }) => {
                                return (
                                  <FormControlLabel
                                    value={options.name}
                                    label={options.name}
                                    control={
                                      <Checkbox
                                        {...register("facilities")}
                                        name={options.name}
                                        onChange={(e) => {
                                          const valueCopy = [...value!];
                                          if (e.target.checked) {
                                            valueCopy.push(options); // append to array
                                          } else {
                                            const idx = valueCopy.findIndex(
                                              (formOption: any) => formOption[1] === options.name
                                            );
                                            valueCopy.splice(idx, 1); // remove from array
                                          }
                                          onChange(valueCopy);
                                        }}
                                      />
                                    }
                                  />
                                );
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </FormGroup>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Media */}
              <Grid container sx={{ mx: 2, py: 3 }}>
                <Grid item xs={12}>
                  <Controller
                    name="imagesUrl"
                    control={control}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <ImageUploading multiple value={value! as any[]} onChange={onChange} maxNumber={maxNumber}>
                          {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                          }) => (
                            // write your building UI
                            <div className="upload__image-wrapper">
                              <Button
                                endIcon={<FileUpload />}
                                variant="contained"
                                color="inherit"
                                hidden
                                disabled={loading}
                                sx={{ textTransform: "capitalize", py: 3, px: 3, border: "1px dashed" }}
                                style={isDragging ? { color: "red" } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                                onChange={onChange}
                              >
                                Click or Drop Images here
                              </Button>
                              &nbsp;
                              <Button
                                endIcon={<Clear />}
                                color="secondary"
                                sx={{ textTransform: "capitalize" }}
                                onClick={onImageRemoveAll}
                              >
                                Remove all images
                              </Button>
                              <Grid container className="image-item">
                                {imageList.map((image, i) => (
                                  <Grid item sm={2} key={i} sx={{ mt: 2 }}>
                                    <Image src={image.dataURL!} alt="" width={80} height={80} />
                                    <Stack direction="row">
                                      <IconButton aria-label="delete" onClick={() => onImageUpdate(i)}>
                                        <Edit />
                                      </IconButton>
                                      <IconButton aria-label="delete" onClick={() => onImageRemove(i)}>
                                        <Clear />
                                      </IconButton>
                                    </Stack>
                                  </Grid>
                                ))}
                              </Grid>
                            </div>
                          )}
                        </ImageUploading>
                      );
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: "1.25rem" }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading} color="primary" variant="contained">
              Save
              {loading ? <CircularProgress color="inherit" size="20px" sx={{ ml: 2 }} /> : ""}
            </Button>
          </DialogActions>
        </Box>
      </Box>
    </Dialog>
  );
};

export default VenueModalCreate;
