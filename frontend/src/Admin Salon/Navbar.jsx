import {Menu, NotificationsActive} from "@mui/icons-material";
import {Badge, Drawer, Icon, IconButton} from "@mui/material";
import React, {useState} from "react";

const Navbar = ({DrawerList}) => {
     const [open, setOpen] = useState(false);

     const toggleDrawer = (newOpen) => {
          setOpen(newOpen);
     };

     return (
          <div className='h-[10vh] flex items-center justify-between px-5 border-b border-gray-300'>
               <div className='flex items-center gap-3'>
                    <IconButton onClick={() => toggleDrawer(true)}>
                         <Menu color='primary' />
                    </IconButton>
                    <h2 className='text-xl cursor-pointer font-bold'>Salon Booking</h2>
               </div>

               <IconButton>
                    <Badge color='secondary'>
                         <NotificationsActive color='primary' />
                    </Badge>
               </IconButton>

               <Drawer open={open} onClose={() => toggleDrawer(false)}>
                    <DrawerList toggleDrawer={toggleDrawer} />
               </Drawer>
          </div>
     );
};

export default Navbar;
