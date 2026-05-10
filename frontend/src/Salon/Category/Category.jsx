import {Button} from "@mui/material";
import React, {useState} from "react";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";

const Category = () => {
     const [activeTab, setActiveTab] = useState(1);

     const handleTabClick = (tab) => {
          setActiveTab(tab);
     };

     return (
          <div>
               <div className='flex items-center gap-5'>
                    <Button variant={activeTab === 1 ? "contained" : "outlined"} onClick={() => handleTabClick(1)}>
                         All Categories
                    </Button>

                    <Button variant={activeTab === 2 ? "contained" : "outlined"} onClick={() => handleTabClick(2)}>
                         Create Categories
                    </Button>
               </div>

               <div className='mt-10'>{activeTab === 1 ? <CategoryTable /> : <CategoryForm />}</div>
          </div>
     );
};

export default Category;
