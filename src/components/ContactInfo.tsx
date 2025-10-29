'use client'


// components/ContactInfo.tsx
import { FaMapMarkedAlt, FaPhoneAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <section className="bg-[#f4efdf] text-[#2b2e4a] py-16 md:py-36 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {/* Standort */}
        <div>
          <FaMapMarkedAlt className="w-8 h-8 mx-auto mb-4 text-[#2b2e4a]" />
          <h3 className="uppercase text-sm tracking-wider font-semibold mb-2">Standort</h3>
           
          <p className="text-sm">Steinbrink 26,</p>
            <p className="text-sm">38122 </p>
            <p className="text-sm">Braunschweig-Broitzem, Germany</p>
        </div>

        {/* Telefon */}
        <div>
          <FaPhoneAlt className="w-8 h-8 mx-auto mb-4 text-[#2b2e4a]" />
          <h3 className="uppercase text-sm tracking-wider font-semibold mb-2">Telefon</h3>
          <p className="text-sm"> 053138963516</p>
        </div>

        {/* E-Mail */}
        <div>
          <FaEnvelope className="w-8 h-8 mx-auto mb-4 text-[#2b2e4a]" />
          <h3 className="uppercase text-sm tracking-wider font-semibold mb-2">E-Mail</h3>
          <a href="mailto:info@lakeside-ellerau.de" className="text-sm hover:underline">
            info@masala-bs.de
          </a>
        </div>

        {/* Öffnungszeiten */}
         {/* <div>
          <FaCalendarAlt className="w-8 h-8 mx-auto mb-4 text-[#2b2e4a]" />
          <h3 className="uppercase text-sm tracking-wider font-semibold mb-2">Öffnungszeiten</h3>
          <div className="text-sm space-y-1">
            <p>Montag: Ruhetag</p>
            <p>Dienstag bis Freitag:<br />12 bis 22 Uhr</p>
            <p>Samstag: 16 - 22 Uhr</p>
            <p>Sonntag: 12 bis 21 Uhr</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
