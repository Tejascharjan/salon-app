import {Close} from "@mui/icons-material";
import {Container, Grid, IconButton, TextField, Typography} from "@mui/material";
import React from "react";

const SalonAddressForm = ({formik}) => {
     return (
          <Container component={"main"}>
               <div className='space-y-5'>
                    <div>
                         <Typography className='text-center' variant='h5'>
                              Salon Address
                         </Typography>
                    </div>
                    <form className='space-y-4' onSubmit={formik.handleSubmit}>
                         <Grid container spacing={2}>
                              <Grid size={12}>
                                   <TextField
                                        fullWidth
                                        id='address'
                                        name='salonAddress.address'
                                        label='Address'
                                        value={formik.values.salonAddress.address}
                                        onChange={formik.handleChange}
                                        required
                                   />
                              </Grid>

                              <Grid size={12}>
                                   <TextField
                                        fullWidth
                                        id='email'
                                        name='salonAddress.email'
                                        label='Email'
                                        value={formik.values.salonAddress.email}
                                        onChange={formik.handleChange}
                                        required
                                   />
                              </Grid>

                              <Grid size={{xs: 12}}>
                                   <TextField
                                        fullWidth
                                        id='city'
                                        name='salonAddress.city'
                                        label='City'
                                        value={formik.values.salonAddress.city}
                                        onChange={formik.handleChange}
                                        required
                                   />
                              </Grid>
                              <Grid size={{xs: 12, sm: 6}}>
                                   <TextField
                                        fullWidth
                                        id='mobile'
                                        name='salonAddress.phoneNumber'
                                        label='Mobile'
                                        value={formik.values.salonAddress.phoneNumber}
                                        onChange={formik.handleChange}
                                        required
                                   />
                              </Grid>
                              <Grid size={{xs: 12, sm: 6}}>
                                   <TextField
                                        fullWidth
                                        id='pincode'
                                        name='salonAddress.pincode'
                                        label='pincode'
                                        value={formik.values.salonAddress.pincode}
                                        onChange={formik.handleChange}
                                        required
                                   />
                              </Grid>
                         </Grid>
                    </form>
               </div>
          </Container>
     );
};

export default SalonAddressForm;
