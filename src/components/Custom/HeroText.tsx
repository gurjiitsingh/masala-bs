import React from 'react'
import { Bebas_Neue } from 'next/font/google';
import { allText } from '@/lib/constants/alltext';
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // only one weight
});

export default function HeroText() {
  return (
    <div>
         <h2 className={`${bebas.className} text-3xl w-full my-2 text-emerald-900`} >
               {/* <h2 className="text-3xl w-full my-4 text-slate-600"> */}
                {allText.offer}  {" "} 
                <span className="text-xl"> {allText.offer_instruction} </span>
              </h2>
               <div className='p-2 bg-amber-200 text-sky-600 font-semibold rounded-xl mb-2'>{allText.deliveryNote}</div>
                  <p className="text-sm text-slate-500">{allText.disclaimer}</p>
    </div>
  )
}
