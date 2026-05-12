import React, { useEffect } from "react";
import SalonDrawerList from "./Components/SalonDrawerList";
import Navbar from "../Admin Salon/Navbar";
import SalonRoutes from "../Routes/SalonRoutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchSalonByOwner } from "../Redux/Salon/action";
import { getUser } from "../Redux/Auth/action";
import { fetchNotificationsBySalon } from "../Redux/Notifications/action";
import { useNotificationWebsocket } from "../Util/UseNotificationWebsocket ";

const SalonDashboard = () => {
     const dispatch = useDispatch();
     const { salon } = useSelector((store) => store);

     useEffect(() => {
          dispatch(fetchSalonByOwner(localStorage.getItem("jwt")));
          dispatch(getUser(localStorage.getItem("jwt")));
     }, []);

     useEffect(() => {
          if (salon.salon) {
               dispatch(
                    fetchNotificationsBySalon({
                         salonId: salon.salon.id,
                         jwt: localStorage.getItem("jwt"),
                    }),
               );
          }
     }, [salon.salon]);

     useNotificationWebsocket({ userId: salon.salon?.id, type: "salon" });

     return (
          <div className='min-h-screen'>
               <Navbar DrawerList={SalonDrawerList} />
               <section className='lg:flex lg:h-[90vh]'>
                    <div className='hidden lg:block'>
                         <SalonDrawerList />
                    </div>
                    <div className='p-10 w-full lg:w-[80%] overflow-y-auto'>
                         <SalonRoutes />
                    </div>
               </section>
          </div>
     );
};

export default SalonDashboard;
