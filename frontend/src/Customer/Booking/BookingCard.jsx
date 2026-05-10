import {ArrowRightAlt} from "@mui/icons-material";
import {Button} from "@mui/material";
import React from "react";

const BookingCard = ({item}) => {
     return (
          <div className='p-5 rounded-md bg-slate-100 md:flex items-center justify-between'>
               <div className='space-y-2'>
                    <h1 className='text-2xl font-bold'>{item.salon.name}</h1>
                    <div>
                         {item.services.map((service) => (
                              <li> {service.name}</li>
                         ))}
                    </div>
                    <div>
                         <p>
                              Time & Date <ArrowRightAlt /> {item.startTime.split("T")[0]}
                         </p>
                         <p>
                              {item.startTime.split("T")[1]} To {item.endTime.split("T")[1]}
                         </p>
                    </div>
               </div>
               <div className='space-y-2'>
                    <img className='h-28 w-28' src={item.services[0].image} alt='' />
                    <p className='text-center'>₹{item.totalPrice}</p>
                    <Button variant='outlined' color='error'>
                         Cancelled
                    </Button>
               </div>
          </div>
     );
};

export default BookingCard;
