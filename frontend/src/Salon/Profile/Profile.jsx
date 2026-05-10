import React, {useEffect} from "react";
import ProfileFildCard from "./ProfileFildCard";
import {Divider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

const Profile = () => {
     const {salon, auth} = useSelector((store) => store);

     return (
          <div className='lg:px-20 lg:bottom-20 space-y-20'>
               <div className='w-full lg:w-[70%]'>
                    <h1 className='text-5xl font-bold pb-5'>{salon.salon?.name}</h1>
                    <section className='grid grid-cols-2 gap-3'>
                         <div className='col-span-2'>
                              <img
                                   className='w-full rounded-md h-60 object-cover'
                                   src={salon.salon?.images[0]}
                                   alt='Salon Image'
                              />
                         </div>
                         <div className='col-span-1'>
                              <img
                                   className='w-full rounded-md h-60 object-cover'
                                   src={salon.salon?.images[1]}
                                   alt='Salon Image'
                              />
                         </div>
                         <div className='col-span-1'>
                              <img
                                   className='w-full rounded-md h-60 object-cover'
                                   src={salon.salon?.images[2]}
                                   alt='Salon Image'
                              />
                         </div>
                    </section>
               </div>
               <div className='mt-10 lg:w-[70%]'>
                    <div className='flex items-center pb-3 justify-between'>
                         <h1 className='text-2xl font-bold text-gray-600'>Owner Details</h1>
                    </div>
                    <div>
                         <ProfileFildCard keys={"Owener Name"} value={auth.user?.fullName} />
                         <Divider />
                         <ProfileFildCard keys={"Email"} value={auth.user?.email} />
                         <Divider />
                         <ProfileFildCard keys={"Role"} value={"Salon_Owner"} />
                    </div>
               </div>
               <div className='mt-10 lg:w-[70%]'>
                    <div className='flex items-center pb-3 justify-between'>
                         <h1 className='text-2xl font-bold text-gray-600'>Salon Details</h1>
                    </div>
                    <div>
                         <ProfileFildCard keys={"Salon Name"} value={salon.salon?.name} />
                         <Divider />
                         <ProfileFildCard keys={"Salon Address"} value={salon.salon?.address} />
                         <Divider />
                         <ProfileFildCard keys={"Open Time"} value={salon.salon?.openTime + " AM"} />
                         <Divider />
                         <ProfileFildCard keys={"Close Time"} value={salon.salon?.closeTime} />
                    </div>
               </div>
          </div>
     );
};

export default Profile;
