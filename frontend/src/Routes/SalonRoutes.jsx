import React from "react";
import {Route, Routes} from "react-router-dom";
import ServiceTable from "../Salon/Services/ServiceTable";
import CreateServiceForm from "../Salon/Services/CreateServiceForm";
import BookingTable from "../Salon/Booking/BookingTable";
import Category from "../Salon/Category/Category";
import TransactionTable from "../Salon/Transaction/TransactionTable";
import NotificationCard from "../Customer/Notification/NotificationCard";
import Payment from "../Salon/Payment/Payment";
import Profile from "../Salon/Profile/Profile";
import HomePage from "../Salon/Salon Dashboard/HomePage";

const SalonRoutes = () => {
     return (
          <Routes>
               <Route path='/' element={<HomePage />} />
               <Route path='/services' element={<ServiceTable />} />
               <Route path='/add-services' element={<CreateServiceForm />} />
               <Route path='/bookings' element={<BookingTable />} />
               <Route path='/category' element={<Category />} />
               <Route path='/transaction' element={<TransactionTable />} />
               <Route path='/notifications' element={<NotificationCard />} />
               <Route path='/payment' element={<Payment />} />
               <Route path='account' element={<Profile />} />
          </Routes>
     );
};

export default SalonRoutes;
