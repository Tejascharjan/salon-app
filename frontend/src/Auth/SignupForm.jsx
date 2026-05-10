import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Formik, useFormik} from "formik";
import React from "react";
import {useDispatch} from "react-redux";
import {registerUser} from "../Redux/Auth/action";
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const formik = useFormik({
          initialValues: {fullname: "", email: "", password: "", username: "", role: "CUSTOMER"},
          onSubmit: (values) => {
               console.log(values);
               values.username = values.fullname;
               dispatch(registerUser({userData: values, navigate}));
          },
     });
     return (
          <Container component={"main"} maxWidth='md'>
               <div className='space-y-5 w-md'>
                    <div>
                         <Typography className='text-center' variant='h5'>
                              Signup
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

                              <Button sx={{py: ".5rem"}} type='submit' variant='contained' fullWidth>
                                   Signup
                              </Button>
                         </Stack>
                    </form>
               </div>
          </Container>
     );
};

export default SignupForm;
