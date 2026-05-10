import {Button, Container, Stack, TextField, Typography} from "@mui/material";
import {Formik, useFormik} from "formik";
import React from "react";
import {useDispatch} from "react-redux";
import {loginUser} from "../Redux/Auth/action";
import {data, useNavigate} from "react-router-dom";

const LoginForm = () => {
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const formik = useFormik({
          initialValues: {username: "", password: ""},
          onSubmit: (values) => {
               dispatch(loginUser({data: values, navigate}));
          },
     });
     return (
          <Container component={"main"} maxWidth='md'>
               <div className='space-y-5 w-md'>
                    <div>
                         <Typography className='text-center' variant='h5'>
                              Login
                         </Typography>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                         <Stack spacing={2}>
                              <TextField
                                   variant='outlined'
                                   fullWidth
                                   name='username'
                                   id='username'
                                   label='Username'
                                   onChange={formik.handleChange}
                                   value={formik.values.username}
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
                                   Login
                              </Button>
                         </Stack>
                    </form>
               </div>
          </Container>
     );
};

export default LoginForm;
