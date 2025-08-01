"use client";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";
import AddOn from "./AddOn";

import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";
import { IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import CartButton from "@/components/AddToCart/CartButton";

export default function PageProductDetailComponent({
  product,
  allAddOns,
}: {
  product: ProductType;
  allAddOns: addOnType[];
}) {
  const [addOnData, setAddOnData] = useState<addOnType[]>([]);
  const { productCategoryIdG } = UseSiteContext();
  useEffect(() => {
    if (allAddOns.length !== 0 && product.flavors) {
      const AddOnData = allAddOns.filter(
        (item: addOnType) => product.id === item.baseProductId
      );
    
      AddOnData.sort((a: addOnType, b: addOnType) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setAddOnData(AddOnData);
    }
  }, [product.id, product.flavors, allAddOns]);

  // console.log("this is price ---------", addOnData)
  
  //common code start
  const priceRegular = product.price.toString().replace(/\./g, ",");
    let priceDiscounted;
  let priceTarget = product.price;
  if(product.discountPrice !== undefined && product.discountPrice > 0){
    priceTarget = product.discountPrice;
    priceDiscounted = product.discountPrice.toString().replace(/\./g, ",");
  }


  // const formatPrice = (price: number) =>
  //   new Intl.NumberFormat("de-DE", {
  //     style: "currency",
  //     currency: "EUR",
  //     minimumFractionDigits: 2,
  //   }).format(price);


  const cartProduct: cartProductType = {
    id: product.id,
    quantity: 1,
    price: priceTarget,
    name: product.name,
    image: product.image,
     categoryId: product.categoryId,
    productCat:product.productCat!,
  };
//fcid6UGEy5kCrrg8fgqe
    const isCartDisabled = (() => {    
  if (product.categoryId !== 'fcid6UGEy5kCrrg8fgqe') return false;
  const berlinTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Berlin" });
  const berlinHour = new Date(berlinTime).getHours();
  return !(berlinHour >= 11 && berlinHour < 16);
})();
//common code end
  return (
    <div className="w-full  lg:w-[48%]   bg-zinc-50 shadow-lg flex flex-row   rounded-2xl items-center">
      <div className="rounded-full flex items-center justify-center w-[70px] h-[65px]  md:w-[90px]  md:h-[80px]  overflow-hidden">
         <img src={product.image} alt={product.name} className="h-[65px]  md:h-[85px]" />
      </div>

      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex-col gap-4 justify-between ">
          <div className="w-full flex gap-1 mb-2 justify-between ">
            {/* <div className="flex justify-between items-center"> */}
            <div className="flex  text-nowrap    min-w-[180px]  rounded-3xl  text-[#bb3e00]">
              {/* bg-[#f7ad45] bg-[#bb3e00] */}
              {productCategoryIdG !== "" && <>{product.sortOrder}.&nbsp;</>}
              {product.name}
            </div>



            {/* {!product.flavors && (
            <div className="min-w-[100px] flex text-slate-500 items-center bg-[#f7ad45] justify-between   rounded-3xl">
              <div>
                <CartButton cartProduct={cartProduct} />
              </div>
            </div>)} */}
           {!isCartDisabled ? (
             <div className="min-w-[100px] flex text-slate-500 items-center bg-[#f7ad45] justify-between   rounded-3xl">
  <CartButton cartProduct={cartProduct} />
  </div>
) : (
  <div className="relative group">
    <button
      
          onClick={() => {
      toast("Mittagessen gibt’s nur von 11 bis 16 Uhr. Bitte etwas anderes wählen.");
    }}
      className="px-1 py-1 rounded-full bg-slate-500 cursor-not-allowed"
    >
      <IoMdAdd size={20} className="text-white" />
    </button>
     <div className="absolute bottom-full left-0 transform -translate-x-[100%] mb-2 w-max max-w-[200px] bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
      Mittagessen gibt’s nur von 11 bis 16 Uhr. Bitte etwas anderes wählen.
    </div>
  </div>
)}
             




          </div>
          <button onClick={() => alert(product.productDesc)} className="text-sm text-slate-500 font-extralight text-left max-w-fit md:max-w-[400px] max-h-[22px] overflow-hidden">
              {product.productDesc}
           
          </button>
          {!product.flavors && (
            <div className="w-full flex justify-between items-center">
             
              <div className="text-white">Pack</div> <div>
              {product.discountPrice !== undefined && product.discountPrice > 0
              ?<div className="flex justify-between gap-3 items-center"> <div className="line-through">&euro;{priceRegular}</div> <div>&euro;{priceDiscounted}</div></div>
              :<div>&euro;{priceRegular}</div>
              
              }
                
                
                </div>

            </div>
          )}
        </div>

        {product.flavors && (
          <AddOn baseProductName={product.name} addOnData={addOnData} />
        )}
      </div>
    </div>
  );
}

//bg-[#FF8989]
//bg-amber-400
