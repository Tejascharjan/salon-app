import React from "react";
import StarIcon from "@mui/icons-material/Star";
import {useNavigate} from "react-router-dom";

const SalonCard = ({item}) => {
     const navigate = useNavigate();

     return (
          <div className='cursor-pointer' onClick={() => navigate(`/salon/${item.id}`)}>
               <div className='w-56 md:w-80 rounded-md bg-slate-100'>
                    <img className='w-full h-60 object-cover rounded-t-md' src={item.images[0]} />
                    <div className='p-5 space-y-2'>
                         <h1 className=''>{item.name}</h1>
                         <div className='text-white text-sm p-1 bg-green-700 rounded-full w-14 flex items-center justify-center gap-1'>
                              4.5 <StarIcon sx={{fontSize: "16px"}} />
                         </div>
                         <p>
                              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum repudiandae dicta, neque
                              at ducimus incidunt.
                         </p>
                         <p>{item.address}</p>
                    </div>
               </div>
          </div>
     );
};

export default SalonCard;
