import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fetchBookings } from "../../../Redux/Chart/action";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const BookingCharts = () => {
     const dispatch = useDispatch();
     const { chart } = useSelector(store => store);

     useEffect(() => {
          dispatch(fetchBookings(localStorage.getItem("jwt")));
     }, []);

     // ✅ Bug 1 Fixed - added return
     if (chart.bookings.loading) {
          return (
               <Backdrop open={true}>
                    <CircularProgress color="inherit" />
               </Backdrop>
          );
     }

     return (
          <div className='h-[40vh] w-full'>
               <ResponsiveContainer>
                    <LineChart                             
                         width={500}
                         height={300}
                         data={chart.bookings?.data || []}  // ✅ Bug 2 Fixed - fallback empty array
                         margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                         }}>
                         <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey='date' />            {/* ✅ Bug 3 Fixed - date not count */}
                         <YAxis />
                         <Tooltip />
                         <Legend />
                         <Line type='monotone' dataKey='count' stroke='#8884d8' activeDot={{ r: 8 }} />
                    </LineChart>
               </ResponsiveContainer>
          </div>
     );
};

export default BookingCharts;