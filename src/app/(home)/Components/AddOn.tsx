//import { AddOnProductSchemaType } from '@/lib/types/productAddOnType';
import { ProductType } from '@/lib/types/productType';
import React from 'react'

import InsertData from './InsertData';

export default function AddOn({baseProductName,addOnData}:{baseProductName:string,addOnData:ProductType[]}) {
  // console.log("andonData---------------", addOnData)
  
  return (
    <div className='flex flex-col gap-3'> {addOnData.map((addon:ProductType,i) => {
        return <div key={i}><div className="flex text-slate-500 items-center bg-amber-300 justify-between p-1  rounded-3xl">
        <div>{addon.name}</div> <div>&euro;{addon.price}</div>
        <div><InsertData baseProductName={baseProductName} addOnData={addon} />
       
          {/* <button
            className="px-1 py-1 bg-slate-400 shadow-emerald-400 shadow-2xl  rounded-full w-fit"
           
          >
            <IoMdAdd size={20} className="text-white " />
          </button> */}
        </div>
      </div></div>
 })}</div>
  )
}




