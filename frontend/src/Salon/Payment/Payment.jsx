import {Card, Divider} from "@mui/material";
import React, {useEffect} from "react";
import {getPriceTotal} from "../../Util/totalEarnings";
import {useDispatch, useSelector} from "react-redux";
import {fetchSalonBookings} from "../../Redux/Booking/action";

const Payment = () => {
     const dispatch = useDispatch();
     const {salon, booking} = useSelector((store) => store);

     useEffect(() => {
          if (salon.salon) {
               dispatch(fetchSalonBookings({jwt: localStorage.getItem("jwt")}));
          }
     }, [salon.salon]);

     return (
          <div>
               <div className=''>
                    <Card className='rounded-md space-y-4 p-5'>
                         <h1 className='text-gray-600 font-medium'>Total Earning</h1>
                         <h1 className='font-bold text-xl pb-1'>₹{getPriceTotal(booking.bookings)}</h1>
                         <Divider />
                         <p>
                              Last Payment : <strong>₹</strong>
                         </p>
                    </Card>
               </div>
          </div>
     );
};

export default Payment;
