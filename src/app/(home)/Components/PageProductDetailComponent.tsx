"use client";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";
import AddOn from "./AddOn";
import CartButton from "@/components/Custom/AddToCart/CartButton";
import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";
import { addOnType } from "@/lib/types/addOnType";

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
      AddOnData.sort(
        (a: addOnType, b: addOnType) => a.sortOrder! - b.sortOrder!
      );
      setAddOnData(AddOnData);
    }
  }, [product.id]);

  // console.log("this is price ---------", addOnData)
  
  const priceRegular = product.price.toString().replace(/\./g, ",");
  //bg-[#D3E671]

  let priceDiscounted;
  let priceTarget = product.price;
  if(product.discountPrice !== undefined){
    priceTarget = product.discountPrice;
    priceDiscounted = product.discountPrice.toString().replace(/\./g, ",");
  }

  const cartProduct: cartProductType = {
    id: product.id,
    quantity: 1,
    price: priceTarget,
    name: product.name,
    image: product.image,
  };
  return (
    <div className="w-full  lg:w-[48%]   bg-zinc-50 shadow-lg flex flex-row   rounded-2xl items-center">
      <div className="rounded-full flex items-center justify-center w-[70px] h-[65px]  md:w-[90px]  md:h-[80px]  overflow-hidden">
        <img src={product.image} className="h-[65px]  md:h-[85px]" />
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
            {!product.flavors && (
            <div className="min-w-[100px] flex text-slate-500 items-center bg-[#f7ad45] justify-between   rounded-3xl">
              <div>
                <CartButton cartProduct={cartProduct} />
              </div>
            </div>)}

          </div>
          <button onClick={() => alert(product.productDesc)}>
            <div className="text-sm text-slate-500 font-extralight text-left max-w-fit md:max-w-[400px] max-h-[22px] overflow-hidden">
              {product.productDesc}
            </div>
          </button>
          {!product.flavors && (
            <div className="w-full flex justify-between items-center">
             
              <div className="text-white">Pack</div> <div>
              {product.discountPrice !== undefined 
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
