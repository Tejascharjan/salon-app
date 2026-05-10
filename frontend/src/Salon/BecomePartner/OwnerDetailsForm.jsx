import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import React from "react";

export const OwnerDetailsForm = ({formik}) => {
     return (
          <Container component={"main"}>
               <div className='space-y-5'>
                    <div>
                         <Typography className='text-center' variant='h5'>
                              Owner Details
                         </Typography>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                         <Stack spacing={2}>
                              <TextField
                                   variant='outlined'
                                   fullWidth
                                   name='fullname'
                                   id='fullname'
                                   label='Full Name'
                                   onChange={formik.handleChange}
                                   value={formik.values.fullname}
                                   required
                              />

                              <TextField
                                   variant='outlined'
                                   fullWidth
                                   name='email'
                                   id='email'
                                   label='Email Address'
                                   onChange={formik.handleChange}
                                   value={formik.values.email}
                                   required
                              />

                              <TextField
                                   variant='outlined'
                                   fullWidth
                                   name='password'
                                   id='password'
                                   label='Password'
                                   onChange={formik.handleChange}
                                   value={formik.values.password}
                                   required
                              />
                         </Stack>
                    </form>
               </div>
          </Container>
     );
};
