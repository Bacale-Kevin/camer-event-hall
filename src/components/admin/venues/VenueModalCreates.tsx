import React, { useState, useRef, useEffect, useCallback } from "react";
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
  SelectChangeEvent,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Facility } from "@prisma/client";
import { useSelector } from "react-redux";
import { MRT_ColumnDef } from "material-react-table";
// import ImageUploading, { ImageListType } from "react-images-uploading";
import { Clear, Edit, FileUpload } from "@mui/icons-material";
import Image from "next/image";
import axios from "axios";

import { AppState } from "../../../redux/store";

type Props = {
  columns: MRT_ColumnDef<any>[];
  onClose: () => void;
  onSubmit: (values: any) => void;
  open: boolean;
};

type FormInputs = {
  name: string;
  price: number | string;
  description: string;
  location: string;
  city: string;
  longitude: number | string;
  latitude: number | string;
  guestCapacity: number | string;
  categoryId: string;
  imagesUrl: string[];
  isVerified: boolean;
  facilities: Facility[];
};

const VenueModalCreate: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const { facilities: amenitiesList } = useSelector((state: AppState) => state.facility);
  const { categories } = useSelector((state: AppState) => state.category);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const maxNumber = 10;
  const inputSelect = useRef<HTMLInputElement>(null);
  const [formData, setformData] = useState<FormInputs>({
    name: "",
    price: 0,
    city: "",
    description: "",
    guestCapacity: 0,
    isVerified: false,
    latitude: "",
    longitude: "null",
    categoryId: "",
    location: "",
    imagesUrl: [],
    facilities: [],
  });

  const { categoryId } = formData;
  const urlFromCloudinary: string[] = [];

  /***** SUBMIT HANDLER ******/
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setLoading(true);
  //   if (images.length) {
  //     try {
  //       const files = images.map((media) => media.file);

  //       for (const file of files) {
  //         const form = new FormData();
  //         form.append("file", file);
  //         form.append("upload_preset", "wee-connect");
  //         form.append("cloud_name", "bacale");

  //         const { data } = await axios.post(process.env.CLOUDINARY_URL!, form);

  //         urlFromCloudinary.push(data.url);
  //       }
  //     } catch (error: any) {
  //       setLoading(false);
  //       console.log(error.message);
  //     }
  //   }

  //   formData.imagesUrl = urlFromCloudinary;

  //   onSubmit(formData);
  //   onClose();

  //   setLoading(false);
  // };

  /***** HANDLE CHANGE ******/
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   if (name === "isVerified") {
  //     setformData((prev) => ({ ...prev, isVerified: e.target.checked }));
  //   }
  //   setformData((prev) => ({ ...prev, [name]: value }));
  // };

  /***** HANDLE SELECT CHANGE ******/
  // const handleSelectChange = (e: SelectChangeEvent<typeof categoryId>) => {
  //   setformData((prev) => ({ ...prev, categoryId: e.target.value }));
  // };

  /***** HANDLE MEDIA CHANGE ******/
  // const handleImageChange = (imagesList: ImageListType) => {
  //   setImages(imagesList as never[]);
  // };

  // const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, checked } = e.target;
  //   const { facilities, name } = formData;

  //   if (checked) {
  //     facilities.push({ name: value });
  //     setformData({ facilities: [...facilities], ...formData });
  //   } else {
  //     const filteredData = facilities.filter((item) => item.name !== value);

  //     setformData({ facilities: [...filteredData] });
  //   }
  // };

  return (
    // <Dialog open={open}>
    //   <Box component="form" noValidate onSubmit={handleSubmit} sx={{ py: 4 }}>
    //     <DialogTitle textAlign="center">Create New Venue</DialogTitle>
    //     <DialogContent>
    //       <Grid container spacing={2} sx={{ py: 4 }}>
    //         <Grid item xs={6}>
    //           <TextField
    //             label="Name"
    //             type="text"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="name"
    //             required
    //             autoFocus
    //             name="name"
    //             value={formData.name}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <TextField
    //             label="City"
    //             type="text"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="city"
    //             required
    //             value={formData.city}
    //             name="city"
    //             onChange={handleChange}
    //           />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField
    //             label="Location"
    //             type="text"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="location"
    //             required
    //             name="location"
    //             value={formData.location}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <TextField
    //             label="Price"
    //             type="number"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="price"
    //             required
    //             name="price"
    //             value={formData.price}
    //             onChange={handleChange}
    //           />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField
    //             label="Longitude"
    //             type="number"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="longitude"
    //             required
    //             name="longitude"
    //             value={formData.longitude}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <TextField
    //             label="Latitude"
    //             type="number"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="latitude"
    //             required
    //             name="latitude"
    //             value={formData.latitude}
    //             onChange={handleChange}
    //           />
    //         </Grid>

    //         <Grid item xs={6}>
    //           <TextField
    //             label="Guest capacity"
    //             type="number"
    //             size="small"
    //             variant="standard"
    //             fullWidth
    //             id="guestCapacity"
    //             required
    //             name="guestCapacity"
    //             value={formData.guestCapacity}
    //             onChange={handleChange}
    //           />
    //         </Grid>
    //         <Grid item xs={6}>
    //           <FormControl
    //             fullWidth
    //             variant="standard"
    //             className="custom_select"
    //             // error={errors.categoryId ? true : false}
    //           >
    //             <InputLabel id="Company-select-label" className="mb-2">
    //               category
    //             </InputLabel>
    //             <Select
    //               ref={inputSelect}
    //               value={categoryId}
    //               // labelId="categories"
    //               label="Select Category"
    //               renderValue={(value) => (value ? value : <em>Nothing Selected</em>)}
    //               onChange={handleSelectChange}
    //             >
    //               {categories.map((category) => {
    //                 return (
    //                   <MenuItem key={category.id} value={category.name}>
    //                     {category.name}
    //                   </MenuItem>
    //                 );
    //               })}
    //             </Select>
    //             <FormHelperText>helper text</FormHelperText>
    //           </FormControl>
    //         </Grid>

    //         <Grid item xs={12}>
    //           <TextField
    //             label="Description"
    //             type="text"
    //             size="small"
    //             multiline
    //             rows={3}
    //             variant="standard"
    //             fullWidth
    //             id="description"
    //             required
    //             placeholder="what characterises your venue"
    //             name="description"
    //             value={formData.description}
    //             onChange={handleChange}
    //           />
    //         </Grid>

    //         {/* Media */}
    //         <Grid container sx={{ mx: 2, py: 3 }}>
    //           <Grid item xs={12}>
    //             <ImageUploading multiple value={images} onChange={handleImageChange} maxNumber={maxNumber}>
    //               {({
    //                 imageList,
    //                 onImageUpload,
    //                 onImageRemoveAll,
    //                 onImageUpdate,
    //                 onImageRemove,
    //                 isDragging,
    //                 dragProps,
    //               }) => (
    //                 // write your building UI
    //                 <div className="upload__image-wrapper">
    //                   <Button
    //                     endIcon={<FileUpload />}
    //                     variant="contained"
    //                     color="inherit"
    //                     sx={{ textTransform: "capitalize" }}
    //                     style={isDragging ? { color: "red" } : undefined}
    //                     onClick={onImageUpload}
    //                     {...dragProps}
    //                   >
    //                     Click or Drop here
    //                   </Button>
    //                   &nbsp;
    //                   <Button
    //                     endIcon={<Clear />}
    //                     color="secondary"
    //                     sx={{ textTransform: "capitalize" }}
    //                     onClick={onImageRemoveAll}
    //                   >
    //                     Remove all images
    //                   </Button>
    //                   <Grid container className="image-item">
    //                     {imageList.map((image, i) => (
    //                       <Grid item sm={2} key={i} sx={{ mt: 2 }}>
    //                         <Image src={image.dataURL!} alt="" width={80} height={80} />
    //                         <Stack direction="row">
    //                           <IconButton aria-label="delete" onClick={() => onImageUpdate(i)}>
    //                             <Edit />
    //                           </IconButton>
    //                           <IconButton aria-label="delete" onClick={() => onImageRemove(i)}>
    //                             <Clear />
    //                           </IconButton>
    //                         </Stack>
    //                       </Grid>
    //                     ))}
    //                   </Grid>
    //                 </div>
    //               )}
    //             </ImageUploading>
    //           </Grid>
    //         </Grid>

    //         <Grid item xs={12}>
    //           <Grid container justifyContent="space-between">
    //             <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
    //               <Grid item xs={12}>
    //                 <FormLabel component="legend">Assign responsibility</FormLabel>
    //               </Grid>

    //               <FormGroup>
    //                 <Grid container>
    //                   {amenitiesList.map((options, i) => (
    //                     <Grid item md={4} key={i}>
    //                       <FormControlLabel
    //                         control={
    //                           <Checkbox value={options.name} onChange={handleCheckBoxChange} name="checkboxes" />
    //                         }
    //                         label={options.name}
    //                       />
    //                     </Grid>
    //                   ))}
    //                 </Grid>
    //               </FormGroup>
    //               {/* <FormHelperText>Be careful</FormHelperText> */}
    //             </FormControl>
    //           </Grid>
    //         </Grid>

    //         <Grid item sm={4}>
    //           <FormGroup>
    //             <FormControlLabel
    //               control={<Switch value={formData.isVerified} onChange={handleChange} name="isVerified" />}
    //               label="Is Verified"
    //             />
    //           </FormGroup>
    //         </Grid>
    //         <Grid item sm={12} />
    //       </Grid>
    //     </DialogContent>

    //     <DialogActions sx={{ p: "1.25rem" }}>
    //       <Button onClick={onClose}>Cancel</Button>
    //       <Button disabled={loading} type="submit" color="primary" variant="contained">
    //         Save
    //         {loading ? <CircularProgress color="inherit" size="20px" sx={{ ml: 2 }} /> : ""}
    //       </Button>
    //     </DialogActions>
    //   </Box>
    // </Dialog>
    <></>
  );
};

export default VenueModalCreate;
