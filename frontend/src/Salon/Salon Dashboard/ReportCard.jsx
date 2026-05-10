import React from "react";

const ReportCard = ({icon, value, title}) => {
     return (
          <div className='flex gap-5 items-center p-5 w-full rounded-md h-19.75 reportCard'>
               <div className='rounded-md p-2 '>{icon}</div>
               <div className=''>
                    <p className='font-bold text-lg'>{value}</p>
                    <p className='font-medium'>{title}</p>
               </div>
          </div>
     );
};

export default ReportCard;
