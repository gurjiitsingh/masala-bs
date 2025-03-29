
import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Header";

import { SideCart } from '@/components/MiniCart/SideCart';
import { BargerMenu } from '@/components/Bargermenu/Menu'
import Footer from "./Footer";
import CartBottom from "./CartBottom/CartBottom";




export default function Comcomp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
      
     <SiteProvider >
      <CartProvider>
        <BargerMenu />
      
      <SideCart />
     
      <Header />
    {children}
    <Footer />
    <div className="sticky  bottom-8 flex justify-end pr-4 z-50"><CartBottom /></div> 
      </CartProvider>
      </SiteProvider>
      </>
     
     
  );
}
