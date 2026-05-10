import React, {useState} from "react";
import SalonDetail from "./SalonDetail";
import {Button, Divider} from "@mui/material";
import SalonServiceDetails from "./SalonServiceDetails";
import Review from "../../Review/Review";
import CreateReviewForm from "../../Review/CreateReviewForm";

const tabs = [{name: "All Services"}, {name: "Reviews"}, {name: "Create Review"}];

const SalonDetails = () => {
     const [activeTab, setActiveTab] = useState(tabs[0]);
     const handleActiveTab = (tab) => setActiveTab(tab);

     return (
          <div className='px-5 lg:px-20'>
               <SalonDetail />
               <div className='space-y-4'>
                    <div className='flex gap-2'>
                         {tabs.map((tab) => (
                              <Button
                                   variant={tab.name === activeTab.name ? "contained" : "outlined"}
                                   onClick={() => handleActiveTab(tab)}>
                                   {tab.name}
                              </Button>
                         ))}
                    </div>
                    <Divider />
                    <div>
                         {activeTab.name === "Create Review" ? (
                              <div className='flex justify-center'>
                                   <CreateReviewForm />
                              </div>
                         ) : activeTab.name === "Reviews" ? (
                              <div>
                                   <Review />
                              </div>
                         ) : (
                              <div>
                                   <SalonServiceDetails />
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default SalonDetails;
