import style from './Footer.module.css'
import {RiFacebookCircleLine} from "react-icons/ri"
import {FiPhoneCall, FiInstagram} from "react-icons/fi"
import {BsInstagram} from "react-icons/bs"
import {MdOutlineLocationOn} from "react-icons/md"
import {FaWhatsapp} from "react-icons/fa"

const Footer = () => {
  return(
    <footer className={style.footer}>
        <p className={style.david}>Copyrigth © 2024 codeAndCoffee</p>
        <div className={style.iconosPlus}>
            <a target='_blank' className={style.link} href="https://www.facebook.com/lauravargas.cp/"><RiFacebookCircleLine className={style.oneIcono}/></a>
            <a target='_blank' className={style.link} href="https://www.instagram.com/lauravargas.cpmu/ "><FiInstagram className={style.oneIcono}/></a>
            <a target='_blank' className={style.link} href="https://api.whatsapp.com/send/?phone=573502142355&text&type=phone_number&app_absent=0"><FaWhatsapp className={style.oneIcono}/></a>
        </div>
        <p className={style.creadorDavid}><a className={style.link} target="_blank" href='https://www.codeandcoffee.tech'>Powered by CodeandCoffee</a></p>
    </footer>
  )
};

export default Footer