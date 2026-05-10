import React from "react";
import Banner from "./Banner";
import HomeServiceCard from "./HomeServiceCard";
import services from "../../Data/services";
import SalonList from "../Salon/SalonList";

const Home = () => {
     return (
          <div className='space-y-20'>
               <section>
                    <Banner />
               </section>
               <section className='space-y-10 lg:space-y-0 lg:flex items-center gap-5 px-20'>
                    <div className='w-full lg:w-1/2'>
                         <h1 className='text-2xl font-semibold pb-9'>What are you looking for, Bestie? 👀</h1>
                         <div className='flex flex-wrap justify-center items-center gap-5'>
                              {services.map((item) => (
                                   <HomeServiceCard key={item.id} item={item} />
                              ))}
                         </div>
                    </div>
                    <div className='w-full lg:w-1/2 border border-gray-300 grid gap-3 grid-cols-2 grid-rows-12 h-[45vh] md:h-[90vh]'>
                         <div className='row-span-7'>
                              <img
                                   className='h-full w-full rounded-md'
                                   src='https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=500&auto=format&fit=crop'
                              />
                         </div>
                         <div className='row-span-5'>
                              <img
                                   className='h-full w-full rounded-md'
                                   src='https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=500&auto=format&fit=crop'
                              />
                         </div>

                         <div className='row-span-7'>
                              <img
                                   className='h-full w-full rounded-md'
                                   src='https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=500&auto=format&fit=crop'
                              />
                         </div>
                         <div className='row-span-5'>
                              <img
                                   className='h-full w-full rounded-md'
                                   src='https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=500&auto=format&fit=crop'
                              />
                         </div>
                    </div>
               </section>
               <section className='px-20'>
                    <h1 className='text-3xl font-bold pb-10'>Book your favorite salon</h1>
                    <SalonList />
               </section>
          </div>
     );
};

export default Home;
