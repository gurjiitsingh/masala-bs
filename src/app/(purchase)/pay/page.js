"use client";
import React, { Suspense } from "react";

import {
 
  PayPalScriptProvider,
 
} from "@paypal/react-paypal-js";



//import { loadScript } from "@paypal/paypal-js";
import Checkout from "./components/Checkout";


const initialOptions = {
  //"client-id": "AaE5j_iAGG8h6JeuW6y3khLvftR8OT2qDi2tqlhTaOeC4QxU3feFgMgF1RYMGe7LuYAtd7EyhQZpUhQz",//
  "client-id": process.env.PAYPAL_CLIENT_ID,
   currency: "EUR",
  intent: "capture",
  locale: "de_DE", 
  debug: true,
  commit: true,
};


function ProviderWrapper() {
  return (
    <PayPalScriptProvider options={initialOptions}>
     <Suspense>
      <Checkout />
      </Suspense>
    </PayPalScriptProvider>
   
  );
}

export default ProviderWrapper;
