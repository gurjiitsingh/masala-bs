import React from "react";
import { allText } from "@/lib/constants/alltext";
import { Sour_Gummy } from "next/font/google";

const sourGummy = Sour_Gummy({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // choose what you need
});
export default function Title() {
  return (
    <div className="flex gap-2 my-5">
      <div className=" flex items-center">
        <img src="/logo.webp" alt="Company Logo" className="h-12 w-auto" />
      </div>
      <div className="">
        {" "}
        <h1
          className={`${sourGummy.className} rounded-2xl  text-5xl w-full font-bold    text-[#496208] `}
        >
          <div className="">
            {allText.brand}
            <span className="text-xl font-light pl-1">{allText.tagline}</span>
          </div>
        </h1>
      </div>
    </div>
  );
}
