import CartButton from '@/components/AddToCart/CartButton'
import { cartProductType } from '@/lib/types/cartDataType'
import { ProductType } from '@/lib/types/productType'
import React from 'react'

export default function InsertData({baseProductName,addOnData}:{baseProductName:string,addOnData:ProductType}) {
   const ProductName = baseProductName +" "+ addOnData.name;
    const cartProduct:cartProductType ={
          id:addOnData.id,
          quantity:1,
          price:addOnData.price,
          name:ProductName,
          image:addOnData.image,
        } 
  return (
    <CartButton cartProduct={cartProduct} />
  )
}

