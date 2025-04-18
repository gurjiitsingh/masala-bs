"use client";

import Hero from "./Components/Hero";
import Products from "./Components/Products";
import CategorySlider from "./Components/CategorySlider";
//import { TnewProductSchema } from '@/lib/types';
// import {  TnewProductSchema } from '@/lib/type/productType';

export default function Page() {
  // const products = await fetchProducts();

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="container mx-auto pt-7 p-1">
        <div className="w-full px-2 flex flex-col md:flex-row flex-wrap gap-3">
          <div className=" flex flex-nowrap md:justify-center bg-gradient-to-bl from-[#ffe4e6]  to-[#ccfbf1] rounded-4xl   pb-24 pt-4 px-3 gap-2   justify-between  w-full ">
            {/* <Hero /> */}
            <div className="flex flex-col">
              <h1 className="flex items-center text-4xl sm:5xl md:text-6xl  text-slate-400">
              Kennenlern Aktion 50% sparen  {" "}
              </h1>
              <span className="text-2xl italic" > bei abholung</span>
              <div className="text-sm text-slate-500">
                Das Essen kann vom Bild abweichen
              </div>
            </div>
          </div>
          <CategorySlider />
          {/* <Categories /> */}
          <Products />
        </div>
      </div>
    </div>
  );
}
