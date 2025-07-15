"use client"
import ChooseProduct from '@/components/ChooseProduct/ChooseProduct';
import { UseSiteContext } from '@/SiteContext/SiteContext';
import React from 'react'

export default function Modal() {
     const { showProductDetailM } =
        UseSiteContext();
  return (
    <>
   {showProductDetailM && <ChooseProduct />}
    </>
  )
}
