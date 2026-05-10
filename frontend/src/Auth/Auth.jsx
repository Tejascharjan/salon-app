import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {Button} from "@mui/material";

const Auth = () => {
     const navigate = useNavigate();
     const location = useLocation();

     return (
          <div className='flex justify-center items-center h-[95vh]'>
               <div className='shadow-lg p-5'>
                    {location.pathname === "/register" ? (
                         <>
                              <SignupForm />
                              <div className='text-center pt-5'>
                                   Already have an account? <Button onClick={() => navigate("/login")}>Login</Button>
                              </div>
                         </>
                    ) : (
                         <>
                              <LoginForm />
                              <div className='text-center pt-5'>
                                   Don't have an account? <Button onClick={() => navigate("/register")}>Signup</Button>
                              </div>
                         </>
                    )}
               </div>
          </div>
     );
};

export default Auth;
