import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="relative container mx-auto px-4">
    <div className="flex flex-col md:flex-row my-24 gap-8">
      {/* Address Info */}
      <div className="flex flex-col md:w-1/2">
        <h1 className="text-[#333] text-5xl mb-6">Masala Taste of India</h1>
        <div className="space-y-4 text-lg">
          <a className="relative block aspect-square w-20 mb-5" href="/de">
            <img
              src="https://assets-prod-gillz.s3.eu-central-1.amazonaws.com/e251843b-6f27-458d-9d6f-0bc164920168/1731794259221_v6Yv4Ez.png"
              alt="Masala Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </a>

          <a
            className="flex items-center"
            href="http://maps.google.com/maps?q=52.2368464,10.4778527"
            target="_blank"
            rel="noreferrer"
            title="Steinbrink 26, 38122 Braunschweig-Broitzem, Germany"
          >
            <FaMapMarkerAlt className="text-gray-600 mr-2" />
            Steinbrink 26, 38122 Braunschweig-Broitzem, Germany
          </a>

          <a
            className="flex items-center"
            href="tel:053138963516"
            target="_blank"
            rel="noreferrer"
            title="053138963516"
          >
            <FaPhoneAlt className="text-gray-600 mr-2" />
            053138963516
          </a>

          <a
            className="flex items-center"
            href="mailto:info@masala-bs.de"
            target="_blank"
            rel="noreferrer"
            title="info@masala-bs.de"
          >
            <FaEnvelope className="text-gray-600 mr-2" />
            info@masala-bs.de
          </a>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full md:w-1/2">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2443.3598947836963!2d10.47527777666399!3d52.23684637198838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNTLCsDE0JzEyLjciTiAxMMKwMjgnNDAuMyJF!5e0!3m2!1sen!2sin!4v1736048462114!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        ></iframe>
      </div>
    </div>
  </div>
  )
}
