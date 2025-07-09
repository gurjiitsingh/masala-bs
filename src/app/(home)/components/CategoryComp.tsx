import { categoryType } from '@/lib/types/categoryType';
import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function CategoryComp(category:categoryType) {
const {  setProductCategoryIdG } = UseSiteContext();
console.log("cate------------",category)
    return (
        <div  className="mx-2">
          <button
            onClick={() => {
              setProductCategoryIdG(category.id);
            }}
          >
            <div className="w-[100px]">
              <div className="flex flex-col  gap-1 ">
                <div className="h-fit w-fit rounded-lg  pl-5 ">
                  <img
                  //  className="w-[70px] rounded-lg"
                   className="rounded-lg h-20 w-48 object-fill"
                    src={category.image}
                  />
                </div>
                <div className="flex flex-col justify-center w-[110px]  items-center">
                  <h3 className="text-[.8rem] text-slate-600 px-0">
                   
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          </button>
        </div>
      );
}
