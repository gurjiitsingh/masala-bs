import React from "react";

import InsertData from "./InsertData";
import { addOnType } from "@/lib/types/addOnType";
import { MdDiscount } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
export default function AddOn({
  baseProductName,
  addOnData,
}: {
  baseProductName: string;
  addOnData: addOnType[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {" "}
      {addOnData.map((addon: addOnType, i) => {
        return (
          <div
            key={i}
            className="flex flex-col gap-1 border-t border-slate-400"
          >
            <div className="flex text-slate-500 items-center  justify-between p-1  rounded-3xl">
              {i ? (
                <>
                  <div>{addon.name}</div>
                  <div className="flex">
                    <div>
                      <RiDiscountPercentFill size={24} className="text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div>{addon.name}</div>
                </>
              )}
              <div>
                <InsertData
                  baseProductName={baseProductName}
                  addOnData={addon}
                />
              </div>
            </div>

            {i ? (
              <div className="flex justify-between items-center">
                {" "}
                <div className="shadow-3xl p-1 rounded-3xl border border-amber-400 flex gap-1 w-fit">
                  <div>{addon.desc}</div>
                  <div>
                    <MdDiscount
                      size={24}
                      className="text-red-600 -mr-3 -mb-3"
                    />
                  </div>
                </div>
                <div>&euro;{addon.price}</div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className=" p-1 rounded-3xl border border-amber-400 flex gap-1 w-fit">
                  <div>{addon.desc}</div>
                </div>
                <div>
                    <div>&euro;{addon.price}</div>
                  </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
