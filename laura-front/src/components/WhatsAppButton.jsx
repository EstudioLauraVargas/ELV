import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import style from './what.module.css'

const WhatssapButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=573502142355&text&type=phone_number&app_absent=0" 
      className={style.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" />
    </a>
  );
}

export default WhatssapButton;


