import React from "react";
import Image from "next/image";
import Link from "next/link";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "254722333324";

  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50 md:right-2">
      <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <div className="hover:scale-110 transition-transform duration-300">
          <Image
            src="/images/whatsapp-icon.png"
            alt="WhatsApp"
            width={80}
            height={60}
            className="drop-shadow-lg"
          />
        </div>
      </Link>
    </div>
  );
};

export default WhatsAppButton;
