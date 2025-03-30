"use client";
import { fetchProductByBaseProductId } from "@/app/action/productsaddon/dbOperation";
import { AddOnProductSchemaType } from "@/lib/types/productAddOnType";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import React, { useEffect, useState } from "react";
import AddOn from "./AddOn";
import CartButton from "@/components/AddToCart/CartButton";
import { cartProductType } from "@/lib/types/cartDataType";
import { ProductType } from "@/lib/types/productType";

export default function PageProductDetailComponent({
  product,
  allAddOns,
}: {
  product: ProductType;
  allAddOns: ProductType[];
}) {
  const [addOnData, setAddOnData] = useState<ProductType[]>([]);
  const { productCategoryIdG } = UseSiteContext();
  useEffect(() => {
    if (allAddOns.length !== 0 && product.flavors) {
      const AddOnData = allAddOns.filter(
        (item: ProductType) => product.id === item.baseProductId
      );
      AddOnData.sort(
        (a: ProductType, b: ProductType) => a.sortOrder! - b.sortOrder!
      );
      setAddOnData(AddOnData);
    }

    // console.log("Ready to get andon data ---------")
    // async function fetchProduct() {
    //   try {
    //     // const result = await fetchProducts();

    //     const result = await fetchProductByBaseProductId(product.id!);
    //     console.log("addon product data ---------", result)
    //     setAddOnData(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // fetchProduct();
  }, [product.id]);

  // console.log("this is price ---------", addOnData)
  const price = product.price.toString().replace(/\./g, ",");
  //bg-[#D3E671]

  const cartProduct: cartProductType = {
    id: product.id,
    quantity: 1,
    price: product.price,
    name: product.name,
    image: product.image,
  };
  return (
    <div className="w-full   bg-zinc-50 shadow-lg flex flex-row   rounded-2xl items-center">
      <div className="rounded-full flex items-center justify-center w-[70px] h-[65px]  md:w-[90px]  md:h-[80px]  overflow-hidden">
        <img src={product.image} className="h-[65px]  md:h-[85px]" />
      </div>

      <div className="w-full flex flex-col p-3 justify-between ">
        <div className="w-full flex-col gap-4 justify-between ">
          <div className="w-full flex gap-1 mb-2 justify-between ">
            {/* <div className="flex justify-between items-center"> */}
            <div className="flex items-center justify-center text-nowrap text-center px-2 py-1 bg-[#bb3e00] min-w-[180px]  rounded-3xl  text-white">
              {/* bg-[#f7ad45] */}
              {productCategoryIdG !== "" && <>{product.sortOrder}.&nbsp;</>}
              {product.name}
            </div>
            <div className="min-w-[100px] flex text-slate-500 items-center bg-[#f7ad45] justify-between   rounded-3xl">
                <div>
                  <CartButton cartProduct={cartProduct} />
                 
                </div>
              </div>


          </div>
          <button onClick={() => alert(product.productDesc)}>
            <div className="text-sm text-slate-500 font-extralight text-left max-w-fit md:max-w-[400px] max-h-[22px] overflow-hidden">
              {product.productDesc}
            </div>
          </button>
          {!product.flavors && (
            <div className="w-full flex justify-between items-center">
              <div className="text-white">Pack</div> <div>&euro;{price}</div>
             
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
