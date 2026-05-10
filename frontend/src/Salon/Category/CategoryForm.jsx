import {AddPhotoAlternate, Close} from "@mui/icons-material";
import {Button, CircularProgress, Grid, IconButton, TextField} from "@mui/material";
import {useFormik} from "formik";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createCategory} from "../../Redux/Category/action";
import uploadToCloudnary from "../../Util/uploadToCloudinary";

const CategoryForm = () => {
     const dispatch = useDispatch();
     const [uploadImage, setUploadImage] = useState(false);

     const formik = useFormik({
          initialValues: {
               name: "",
               image: "",
          },
          onSubmit: (values) => {
               dispatch(createCategory({category: values, jwt: localStorage.getItem("jwt")}));
          },
     });

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
                                                       <div className='absolute inset-0 flex justify-center items-center bg-white/50 w-24 h-24'>
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
                                   label='name'
                                   value={formik.values.name}
                                   onChange={formik.handleChange}
                                   required
                              />
                         </Grid>

                         <Grid size={12}>
                              <Button variant='outlined' type='submit' fullWidth sx={{py: ".8rem"}}>
                                   Create Category
                              </Button>
                         </Grid>
                    </Grid>
               </form>
          </div>
     );
};

export default CategoryForm;
