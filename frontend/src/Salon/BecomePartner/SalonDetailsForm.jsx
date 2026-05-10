import {AddPhotoAlternate, Close} from "@mui/icons-material";
import {CircularProgress, Container, IconButton, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import uploadToCloudnary from "../../Util/uploadToCloudinary";
import {DateTimePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const SalonDetailsForm = ({formik}) => {
     const [uploadImage, setUploadImage] = useState(false);

     const handleImageChange = async (event) => {
          const file = event.target.files[0];
          setUploadImage(true);
          const image = await uploadToCloudnary(file);
          formik.setFieldValue("salonDetails.images", [...formik.values.salonDetails.images, image]);
          setUploadImage(false);
     };

     const handleRemoveImage = (index) => () => {
          const updatedImages = [...formik.values.salonDetails.images];
          updatedImages.splice(index, 1);
          formik.setFieldValue("salonDetails.images", updatedImages);
     };

     return (
          <Container component={"main"}>
               <div className='space-y-5'>
                    <div>
                         <Typography className='text-center' variant='h5'>
                              Salon Details
                         </Typography>
                    </div>

                    <form onSubmit={formik.handleSubmit} className='space-y-5'>
                         <div className='flex gap-5 flex-wrap'>
                              {formik.values.salonDetails.images.map((image, index) => (
                                   <div className='relative border border-gray-300'>
                                        <img className='w-24 h-24 object-cover' src={image} />
                                        <IconButton
                                             onClick={handleRemoveImage(index)}
                                             className=''
                                             size='small'
                                             sx={{position: "absolute", top: 0, right: 0}}
                                             color='error'>
                                             <Close sx={{fontSize: "1rem"}} />
                                        </IconButton>
                                   </div>
                              ))}
                              <>
                                   <input
                                        type='file'
                                        accept='image/*'
                                        id='fileInput'
                                        style={{display: "none"}}
                                        onChange={handleImageChange}
                                   />
                                   <label htmlFor='fileInput'>
                                        <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border border-gray-400 rounded-md relative'>
                                             <AddPhotoAlternate className='text-gray-700' />
                                             {uploadImage && (
                                                  <div className='absolute inset-0 flex justify-center items-center bg-white/50'>
                                                       <CircularProgress size='2.5rem' />
                                                  </div>
                                             )}
                                        </span>
                                   </label>
                              </>
                         </div>

                         <div>
                              <TextField
                                   variant='outlined'
                                   fullWidth
                                   name='salonDetails.name'
                                   id='salonDetails.name'
                                   label='Salon Name'
                                   onChange={formik.handleChange}
                                   value={formik.values.salonDetails.name}
                                   required
                              />
                         </div>

                         <div>
                              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                   <TimePicker
                                        sx={{width: "100%"}}
                                        fullWidth
                                        onChange={(value) => {
                                             if (value) {
                                                  formik.setFieldValue("salonDetails.openTime", dayjs(value));
                                             }
                                        }}
                                        label='Open Time'
                                   />
                              </LocalizationProvider>
                         </div>

                         <div>
                              <LocalizationProvider fullWidth dateAdapter={AdapterDayjs}>
                                   <TimePicker
                                        sx={{width: "100%"}}
                                        fullWidth
                                        onChange={(value) => {
                                             if (value) {
                                                  formik.setFieldValue("salonDetails.closeTime", dayjs(value));
                                             }
                                        }}
                                        label='Close Time'
                                   />
                              </LocalizationProvider>
                         </div>
                    </form>
               </div>
          </Container>
     );
};

export default SalonDetailsForm;
