import type { Metadata } from "next";
import "../globals.css";

import { CartProvider } from "@/store/CartProvider";
import { SiteProvider } from "@/SiteContext/SiteProvider";
import Header from "@/components/Custom/Header";

import { SideCart } from "@/components/MiniCart/SideCart";
import { BargerMenu } from "@/components/Bargermenu/Menu";
import Footer from "@/components/Custom/Footer";

import CartBottom from "@/components/CartBottom/CartBottom"
import Modal from "./Components/Modal";

export const metadata: Metadata = {
  title: "Masala taste of India",
  description: "Masala taste of India, Indian food",
  other: {
    'google': 'notranslate',  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" translate="no">
      <body>
        <SiteProvider>
          <CartProvider>
            <BargerMenu />
            <Modal />
           <div translate="no" className="z-50">
            <SideCart />
            </div>
            <div translate="no" className="z-50">
            <Header />
            </div>
            {children}
           
            <Footer />
            <div translate="no" className="sticky  bottom-8 flex justify-end pr-4 z-50"><CartBottom /></div> 
          </CartProvider>
        </SiteProvider>
      </body>
    </html>
  );
}
