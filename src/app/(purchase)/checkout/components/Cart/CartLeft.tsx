"use client";
//import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCartContext } from "@/store/CartContext";

//import { useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import CouponDiscForm from "./CouponDiscForm";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import DeliveryCost from "./DeliveryCost";
import Pickup from "./Pickup";
import CouponDisc from "./CouponDisc";
import { cartProductType, orderDataType  } from "@/lib/types/cartDataType";
import { createNewOrder } from "@/app/action/orders/dbOperations";
import { useRouter } from "next/navigation";
//import { FaCheckCircle } from 'react-icons/fa';

export default function CartLeft() {
  const {
    couponDisc,
    deliveryDis,
    chageDeliveryType,
    deliveryType,
    paymentType,
    newOrderCondition,
    setNewOrderCondition,
  } = UseSiteContext();

  //console.log("newOrderCondition-------------", newOrderCondition)
  
 const router = useRouter();

  const [addCoupon, setAddCoupon] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);
  
  const { cartData, setEndTotalG, setTotalDiscountG, endTotalG,  totalDiscountG } = useCartContext();
  let total = 0;
  cartData.forEach((item: cartProductType) => {
    total += item.quantity! * +item.price;
    // total += parseInt(item.quantity) * +parseFloat(item.price);
  });

  total = +total.toFixed(2);
  let endPrice = +total;
  let TotalDiscount = 0;
  if (deliveryType === "pickup") {
    let pickupDiscount = +total * 0.2;
    pickupDiscount = +pickupDiscount.toFixed(2);
    endPrice = endPrice - pickupDiscount;
    TotalDiscount = 20;
  }


  if (deliveryType === "delivery") {
   
    if (deliveryDis?.price !== undefined) {
      endPrice = endPrice + +deliveryDis?.price;
    }
    //deliveryDis, chageDeliveryType, deliveryType, newOrderCondition, setNewOrderCondition
  }

  if (couponDisc?.price) {
     //console.log("----coupon disc",couponDisc);
     if(couponDisc.discountType === "flat"){
      endPrice = endPrice - (+couponDisc?.price);
      // endPrice = +endPrice.toFixed(2);
     // TotalDiscount = TotalDiscount + +couponDisc?.price;
    
    // setFlatDiscount(+couponDisc?.price)
     }else{
    endPrice = endPrice - (+total * +couponDisc?.price) / 100;
    // endPrice = +endPrice.toFixed(2);
    TotalDiscount = TotalDiscount + +couponDisc?.price;
     }
  }
  //  console.log("total discount ------",TotalDiscount)
  //  console.log("end price -------", total- total*(+TotalDiscount)/100)

  const endPriceS = endPrice.toFixed(2).toString();
  const endPriceComma = endPriceS.split(".").join(",");
  useEffect(() => {
    endPrice = +endPrice.toFixed(2);
    setEndTotalG(endPrice);
    
  }, [endPrice]);

  useEffect(() => {
   // console.log("type, endprice, minspend--------", deliveryType,endPrice,deliveryDis?.minSpend);
     if (deliveryType === "delivery") {
      if (deliveryDis?.minSpend !== undefined) {
        if (deliveryDis?.minSpend >= endPrice) {
          // newOrderCondition
        //  console.log("order amount is low-----------",deliveryDis?.minSpend > endPrice)
         // const message = `Minimum amout for order is `
          setNewOrderCondition(false)
         
        }else{
          setNewOrderCondition(true)
        }
      }
     // console.log("deliveryDis minspend--------", deliveryDis?.minSpend);
    }

  }, [deliveryType,endPrice,deliveryDis?.minSpend]);
 

  useEffect(() => {
   // console.log("type, endprice, minspend--------", deliveryType,endPrice,deliveryDis?.minSpend);
     if (deliveryType === "delivery") {
      if (deliveryDis?.minSpend !== undefined) {
        if (deliveryDis?.minSpend >= endPrice) {
          setNewOrderCondition(false)
         }else{
          setNewOrderCondition(true)
        }
      }
    
    }

  }, []);

  useEffect(() => {
    setTotalDiscountG(TotalDiscount);
  }, [TotalDiscount]);


async function proceedToOrder(){
  setIsDisabled(true)
  let canCompleteOrder = true;
  let allReadyAlerted = false;

  // console.log("paymentType------------", paymentType)
  // console.log("deliveryType------------", deliveryType)
  // console.log("deliveryDis minSpend------------", deliveryDis)
  // console.log("newOrderCondition ------------", newOrderCondition)

  
  if(paymentType === "" || paymentType === undefined){
    canCompleteOrder = false;
   
    setIsDisabled(false)
    alert(
      "Select Payment type"
    );
    allReadyAlerted = true;
  }

 

  if (deliveryType === "delivery" && deliveryDis === undefined) {
    console.log("deliveryType----",deliveryType,"deliveryDis-----", deliveryDis,"allReadyAlerted---",allReadyAlerted)
    setIsDisabled(false)
       canCompleteOrder = false;
      
 if(!allReadyAlerted){
       alert(
         "Wir können an diese Adresse nicht liefern. Bitte wählen Sie Abholung und erhalten Sie 10 % Rabatt"
       );
       allReadyAlerted = true;
      }
     }


  let AddressId =  "";
  let order_user_Id = "";
  let customer_name = "";

 if (typeof window !== "undefined") {

   AddressId = JSON.parse(localStorage.getItem("customer_address_Id") || "");
  order_user_Id = JSON.parse(localStorage.getItem("order_user_Id") || "");
   customer_name = JSON.parse(localStorage.getItem("customer_name") || "");

  // console.log("address id, useraddress id,  customer name ",AddressId,order_user_Id, customer_name)

}

 //console.log("userdata-----------",AddressId,order_user_Id,customer_name)


    if (!newOrderCondition && deliveryType !== "pickup") {
      setIsDisabled(false)
      canCompleteOrder = false;
      if(!allReadyAlerted){
      const minSpendMessage = `Minimum order amount for delivery is €${deliveryDis?.minSpend}`;
      alert(minSpendMessage);
      }
    }

    // if (deliveryType === "pickup" || deliveryDis !== undefined) {
    if (canCompleteOrder) {
     let flatDiscount = 0;
      if(couponDisc?.discountType === "flat" && couponDisc?.price ){
        flatDiscount = couponDisc?.price as number;
      }
      
     
        const purchaseData = {
        userId: order_user_Id,//order_user_Id, //session?.user?.id,
        customerName:customer_name,
        cartData,
        total: endTotalG,
        totalDiscountG,
        flatDiscount,
        addressId: AddressId,
        paymentType,
      } as orderDataType;
      let orderMasterId = "";
      if (cartData.length !== 0) {
       orderMasterId =  await createNewOrder(purchaseData);
     // console.log("master id----------",  orderMasterId)
      }
      setIsDisabled(false)
     
      if (paymentType === "paypal") {
        router.push(`/pay?orderMasterId=${orderMasterId}`);
      }
      //console.log("going to complete--------")
      if (paymentType === "cod") {
        // console.log("going to complete")
        router.push(`/complete?paymentType=Barzahlung&orderMasterId=${orderMasterId}`);
        //  router.push(`/checkout?email=${data.email}&deliverytype=${deliveryType}`)
      }
    }

}


const [disablePickUpBtn, setDisablePickUpBtn] = useState(false);
  const [disableDeliveryBtn, setDisableDeliveryBtn] = useState(false);

useEffect(()=>{
  if(deliveryType==='pickup'){
    setDisablePickUpBtn(true)
    setDisableDeliveryBtn(false);
   // console.log("deliveryType---------",deliveryType)
  }
  if(deliveryType==='delivery'){
   
    setDisablePickUpBtn(false)
    setDisableDeliveryBtn(true);
   // console.log("deliveryType---------",deliveryType)
  }
  if(deliveryType===""){
  
    setDisablePickUpBtn(false)
    setDisableDeliveryBtn(false);
   // console.log("deliveryType---------",deliveryType)
  }
  },[deliveryType])
  
  
  
  


  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex flex-col bg-slate-50 p-5 h-full w-full gap-7 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-semibold border-b border-slate-200 py-3 w-full uppercase">
            {/* Shopping cart total */}
            {/* Gesamtsumme im Warenkorb */}
            Warenkorb-Summe
          </h2>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex flex-col justify-between gap-4">
            <div className="w-fit">
              <button
                onClick={() => setAddCoupon(!addCoupon)}
                className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
              >
                <span>Fügen Sie einen Gutschein hinzu </span>
                <span>
                  <FaChevronDown />
                </span>
              </button>
            </div>

            {addCoupon && (
              <>
                <CouponDiscForm />
              </>
            )}
          </div>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between">
            <div className="text-sm font-semibold py-3 w-full text-left">
              Zwischensumme
            </div>
            <div className="flex gap-1">
              <span>&#8364;</span>{" "}
              <span>{total.toString().replace(/\./g, ",")}</span>
            </div>
          </div>

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex  justify-start gap-4">
            <div className="w-fit">
             
                <button disabled={disablePickUpBtn} 
                  onClick={() => chageDeliveryType("pickup")}
                  className="flex gap-2  items-center text-sm text-slate-600 bg-green-200 border border-slate-200 rounded-2xl px-3 font-semibold py-1 w-full text-left "
                >
                  <span>Abholen </span>
                  {/* <span>
                  <FaChevronDown />
                </span> */}
                </button>
            
            </div>

            <div className="w-fit">
             
                <button disabled={disableDeliveryBtn}
                  onClick={() => chageDeliveryType("delivery")}
                  className="flex gap-2 items-center text-sm text-slate-600 bg-green-200 border border-slate-50 rounded-2xl px-3 font-semibold py-1 w-full text-left "
                >
                  <span>Lieferung </span>
                  {/* <span>
                  <FaChevronDown />
                </span> */}
                </button>
            
            </div>
          </div>

          <DeliveryCost />

          <Pickup total={total} />

          <CouponDisc total={total} />

          {/* <div className="font-semibold border-b border-slate-200 py-3 w-full ">
            <h3 className="text-sm font-semibold py-3 w-full text-left">
              {" "}
              Local Pickup (Restaurant)
            </h3>
          </div> */}

          {/* <div className="border-b border-slate-200 py-3 w-full ">
            <h3 className="text-sm font-semibold pt-3 pb-1 w-full text-left">
             
              Flat Rate
            </h3>
            <p className="text-sm  pb-3 w-full text-left"> $4</p>
          </div> */}

          <div className="font-semibold border-b border-slate-200 py-3 w-full flex justify-between">
            <div className="text-md font-semibold py-3 w-full text-left">
              Gesamt
            </div>
            <div className="flex gap-1">
              <span>&#8364;</span> <span> {endPriceComma} </span>
            </div>
          </div>

          {/* <FaCheckCircle className="text-red-500" size={40} />
              <span className="text-[.7rem] text-blue-500">
                Part of your order qualifies for FREE Delivery. Choose FREE
                Delivery option at checkout.
              </span> */}
        </div>
        {/* <div className="text-[1.1rem]">
          <span className="text-xl">Subtotal ({cartData.length} items) </span>{" "}
          :${total}
        </div> */}
        {/* <div className="flex items-center justify-center">
          <Link
            href={{
              pathname: "/checkout",
              //  query:{ userId: session?.user?.id}
            }}
          >
            <div className="w-[200px] py-1 text-center bg-yellow-500 rounded-2xl text-[.8rem]">
              Procces to buy
            </div>
          </Link>
        </div> */}
        {/* disabled={true} */}
        <button  disabled={ isDisabled }
              className="w-[200px] py-1 text-center bg-amber-400  font-bold rounded-xl text-[1.2rem]"
              onClick={() => {
                proceedToOrder()
              }}
            
            >
              <span className=" text-blue-900">Submit</span>
              <span className=" text-sky-500">Order</span>
            </button>
      </div>
    </div>
  );
}
