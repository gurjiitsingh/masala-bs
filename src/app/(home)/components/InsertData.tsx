import CartButton from '@/components/Custom/AddToCart/CartButton'
import { cartProductType } from '@/lib/types/cartDataType'
import { addOnType } from '@/lib/types/addOnType';
import React from 'react'

export default function InsertData({baseProductName,addOnData}:{baseProductName:string,addOnData:addOnType}) {
   const ProductName = baseProductName +" "+ addOnData.name;
    const cartProduct:cartProductType ={
          id:addOnData.id,
          quantity:1,
          price:addOnData.price,
          name:ProductName,
          image:addOnData.image,
           categoryId:"",
          productCat:"",
        } 
  return (
    <div className="min-w-[100px] flex text-slate-500 items-center bg-[#f7ad45] justify-between   rounded-3xl">
    <CartButton cartProduct={cartProduct} />
    </div>
  )
}

