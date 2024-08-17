import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+573502142355" // Reemplaza con tu número de WhatsApp
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-pink-500 text-white p-4 md:p-5 rounded-full shadow-lg z-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-8 h-8 md:w-10 md:h-10"
        fill="currentColor"
      >
        <path d="M16.012 2.004a13.995 13.995 0 0 0-13.994 13.996 13.89 13.89 0 0 0 1.8 6.97l-1.86 6.8 6.97-1.83a14.047 14.047 0 0 0 6.98 1.85 13.996 13.996 0 0 0 0-27.991zm8.082 19.68c-.34.96-1.68 1.76-2.75 1.98-.74.17-1.74.31-5.05-.98-4.23-1.65-6.94-5.97-7.16-6.23-.21-.28-1.7-2.26-1.7-4.32s1.07-3.06 1.45-3.48c.34-.34.89-.5 1.42-.5.17 0 .32.01.46.02.4.02.6.04.86.66.34.81 1.1 2.77 1.2 2.97.1.2.17.45.05.72-.11.28-.17.45-.34.69s-.35.43-.52.65c-.17.22-.35.46-.15.83.2.38.91 1.51 1.95 2.44 1.34 1.2 2.48 1.58 2.86 1.75.4.17.63.14.86-.09.24-.24 1-.99 1.26-1.34.27-.34.52-.28.86-.17.35.1 2.2 1.04 2.58 1.23.38.2.64.3.74.46.09.16.09.93-.24 1.88z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;

