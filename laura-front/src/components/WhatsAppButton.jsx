import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import style from './what.module.css'

const WhatssapButton = () => {
  return (
    <a
      href="https://wa.me/573502142355" 
      className={style.whatsappButton}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faWhatsapp} size="2x" />
    </a>
  );
}

export default WhatssapButton;


