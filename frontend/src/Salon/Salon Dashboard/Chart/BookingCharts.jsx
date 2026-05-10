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

     if (chart.bookings.loading) {
          <Backdrop open={true}>
               <CircularProgress color="inherit" />
          </Backdrop>
     }

     return (
          <div className='h-[40vh] w-full'>
               <ResponsiveContainer>
                    <LineChart
                         width={500}
                         height={300}
                         responsive
                         data={chart.bookings?.data}
                         margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                         }}>
                         <XAxis dataKey='count' />
                         <YAxis />
                         <Tooltip />
                         <Line type='monotone' dataKey='count' stroke='#8884d8' activeDot={{ r: 8 }} />
                    </LineChart>
               </ResponsiveContainer>
          </div>
     );
};

export default BookingCharts;
