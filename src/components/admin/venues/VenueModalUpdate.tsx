import React, { useState, useEffect } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Yup from "yup";
import ImageUploading, { ImageListType } from "react-images-uploading";
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
import axios from "axios";
import { useSelector } from "react-redux";

import { AppState } from "../../../redux/store";
import { VenueType } from "../../../types/venue.types";
import { convertImagesToBase64DataURL, dataURLtoFile } from "../../../../utils/convertImagesToBase64URL";

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

const VenueModalUpdate: React.FC<Props> = ({ columns, onClose, onSubmit, open, inputRef }) => {
  const [loading, setLoading] = useState(false);
  const maxNumber = 10;
  const { categories } = useSelector((state: AppState) => state.category);
  const { facilities } = useSelector((state: AppState) => state.facility);
  const { venue } = useSelector((state: AppState) => state.venue);
  const [images, setImages] = useState<any>([]);

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
      id: venue?.id,
      name: venue?.name,
      city: venue?.city,
      location: venue?.location,
      price: venue?.price,
      longitude: venue?.longitude,
      latitude: venue?.latitude,
      guestCapacity: venue?.guestCapacity,
      description: venue?.description,
      imagesUrl: venue?.imagesUrl,
    },
  });

  useEffect(() => {
    venue?.imagesUrl?.map((el) => {
      convertImagesToBase64DataURL(el)
        .then((dataUrl) => {
          var fileData = dataURLtoFile(dataUrl, "imageName.jpg");

          setImages((prev: any) => [...prev, { dataURL: dataUrl, file: fileData }]);
        })
        .catch((err) => console.log(err));
    });
  }, [open]);

  const onSubmitHandler: SubmitHandler<VenueType> = async (data) => {
    try {
      if (images.length) {
        setLoading(true);
        const files = images.map((media: any) => media?.file);

        for (const file of files) {
          const form = new FormData();
          form.append("file", file);
          form.append("upload_preset", "wee-connect");
          form.append("cloud_name", "bacale");

          /**
           * TODO: move the image upload data fetching to the server
           */
          const payload = await axios.post(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, form);

          data.imagesUrl?.push(payload.data.url);
        }
        setLoading(false);
      }
      const formatedFacilitiesName = data.facilities?.map((el: any) => {
        if (el.name === undefined) {
          return {
            name: el,
          };
        } else {
          return {
            name: el.name,
          };
        }
      });

      const dataToBeSubmitted = {
        ...data,
        facilities: formatedFacilitiesName,
      };

      console.log(dataToBeSubmitted);
      onSubmit(dataToBeSubmitted);
      reset();
      onClose();
    } catch (error: any) {
      setLoading(false);
      console.log(error.message);
    }
  };

  /***** HANDLE MEDIA CHANGE ******/
  const handleImageChange = (imagesList: ImageListType) => {
    setImages(imagesList as never[]);
  };

  return (
    <Dialog open={open}>
      <Box sx={{ py: 4, minWidth: "350px" }}>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmitHandler)}>
          <DialogTitle textAlign="center" sx={{ textTransform: "capitalize" }}>
            Edit Venue
          </DialogTitle>
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
                    defaultValue={venue?.category?.id}
                    render={({ field: { onChange, value } }) => {
                      return (
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
                      );
                    }}
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
                              defaultValue={venue?.facilities}
                              render={({ field: { onChange, value } }) => {
                                const valueName = value?.map((el: any) => el.name);
                                return (
                                  <FormControlLabel
                                    value={options.name}
                                    label={options.name}
                                    control={
                                      <Checkbox
                                        {...register("facilities")}
                                        name={options.name}
                                        checked={valueName?.includes(options.name)}
                                        onChange={(e) => {
                                          const valueCopy = [...value!];
                                          if (e.target.checked) {
                                            valueCopy.push(options); // append to array
                                          } else {
                                            const targetName = valueCopy.find((el) => el.name === e.target.value);
                                            const idx = valueCopy.indexOf(targetName!);
                                            if (idx > -1) {
                                              valueCopy.splice(idx, 1); // remove from array
                                            }
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
                  <ImageUploading multiple value={images} onChange={handleImageChange} maxNumber={maxNumber}>
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

export default VenueModalUpdate;
