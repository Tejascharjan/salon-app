import {AddPhotoAlternate, Close} from "@mui/icons-material";
import {
     Button,
     CircularProgress,
     FormControl,
     Grid,
     IconButton,
     InputLabel,
     MenuItem,
     Select,
     TextField,
} from "@mui/material";
import {useFormik} from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import uploadToCloudnary from "../../Util/uploadToCloudinary";
import {createServiceAction} from "../../Redux/Salon Services/action";
import {getCategoriesBySalon} from "../../Redux/Category/action";

const CreateServiceForm = () => {
     const {category, salon} = useSelector((store) => store);
     const dispatch = useDispatch();
     const [uploadImage, setUploadImage] = useState(false);

     const formik = useFormik({
          initialValues: {
               name: "",
               image: "",
               description: "",
               price: "",
               duration: "",
               categoryId: "",
          },
          onSubmit: (values) => {
               dispatch(createServiceAction({service: values, jwt: localStorage.getItem("jwt")}));
          },
     });

     useEffect(() => {
          if (salon.salon) {
               dispatch(getCategoriesBySalon({jwt: localStorage.getItem("jwt"), salonId: salon.salon?.id}));
          }
     }, [salon.salon]);

     const handleImageChange = async (event) => {
          const file = event.target.files[0];
          setUploadImage(true);
          const image = await uploadToCloudnary(file);
          formik.setFieldValue("image", image);
          setUploadImage(false);
     };

     return (
          <div className='flex justify-center items-center'>
               <form className='space-y-4 p-4 w-full lg:w-1/2' onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                         <Grid className='w-24 h-24' size={{xs: 12}}>
                              {formik.values.image ? (
                                   <div className='relative border border-gray-300'>
                                        <img className='w-24 h-24 object-cover' src={formik.values.image} />
                                        <IconButton
                                             className=''
                                             size='small'
                                             sx={{position: "absolute", top: 0, right: 0}}
                                             color='error'>
                                             <Close sx={{fontSize: "1rem"}} />
                                        </IconButton>
                                   </div>
                              ) : (
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
                              )}
                         </Grid>

                         <Grid size={12}>
                              <TextField
                                   fullWidth
                                   id='name'
                                   name='name'
                                   label='Name'
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   required
                              />
                         </Grid>

                         <Grid size={12}>
                              <TextField
                                   fullWidth
                                   id='description'
                                   name='description'
                                   label='Description'
                                   value={formik.values.description}
                                   onChange={formik.handleChange}
                                   multiline
                                   rows={4}
                                   required
                              />
                         </Grid>

                         <Grid size={{xs: 12, sm: 6}}>
                              <TextField
                                   fullWidth
                                   id='price'
                                   name='price'
                                   label='Price'
                                   value={formik.values.price}
                                   onChange={formik.handleChange}
                                   required
                              />
                         </Grid>

                         <Grid size={{xs: 12, sm: 6}}>
                              <TextField
                                   fullWidth
                                   id='duration'
                                   name='duration'
                                   label='Duration'
                                   value={formik.values.duration}
                                   onChange={formik.handleChange}
                                   required
                              />
                         </Grid>

                         <Grid size={12}>
                              <FormControl fullWidth>
                                   <InputLabel id='categoryId'>Category</InputLabel>
                                   <Select
                                        labelId='categoryId'
                                        id='demo-simple-select'
                                        value={formik.values.categoryId}
                                        label='Category'
                                        name='categoryId'
                                        onChange={formik.handleChange}>
                                        {category.categories.map((item, index) => (
                                             <MenuItem value={item.id}>{item.name}</MenuItem>
                                        ))}
                                   </Select>
                              </FormControl>
                         </Grid>

                         <Grid size={12}>
                              <Button variant='outlined' type='submit' fullWidth sx={{py: ".8rem"}}>
                                   Create Service
                              </Button>
                         </Grid>
                    </Grid>
               </form>
          </div>
     );
};

export default CreateServiceForm;
