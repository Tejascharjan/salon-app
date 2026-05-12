import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchEarnings } from "../../../Redux/Chart/action";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const EarningChart = () => {
     const dispatch = useDispatch();
     const { chart } = useSelector(store => store);

     useEffect(() => {
          dispatch(fetchEarnings(localStorage.getItem("jwt")));
     }, []);

     // ✅ Bug 2 Fixed - added return
     if (chart.earnings.loading) {
          return (
               <Backdrop open={true}>
                    <CircularProgress color="inherit" />
               </Backdrop>
          );
     }

     return (
          <div className='h-[40vh] w-full'>
               <ResponsiveContainer>
                    <LineChart                        // ✅ Bug 4 Fixed - removed responsive prop
                         width={500}
                         height={300}
                         data={chart.earnings?.data || []}  // ✅ Bug 1 Fixed - fallback empty array
                         margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                         }}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey='date' />            {/* ✅ Bug 3 Fixed - date not earnings */}
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Line type='monotone' dataKey='earnings' stroke='#8884d8' activeDot={{ r: 8 }} />
                    </LineChart>
               </ResponsiveContainer>
          </div>
     );
};

export default EarningChart;