import style from './Footer.module.css'
import {RiFacebookCircleLine} from "react-icons/ri"
import {FiPhoneCall, FiInstagram} from "react-icons/fi"
import {BsInstagram} from "react-icons/bs"
import {MdOutlineLocationOn} from "react-icons/md"
import {FaWhatsapp} from "react-icons/fa"

const Footer = () => {
  return(
    <footer className={style.footer}>
        <p className={style.david}>Copyrigth © 2023 Natalie Ariza</p>
        <div className={style.iconosPlus}>
            <a target='_blank' className={style.link} href="https://www.facebook.com/profile.php?id=100091801837740"><RiFacebookCircleLine className={style.oneIcono}/></a>
            <a target='_blank' className={style.link} href="https://www.instagram.com/nataliearizaodontestetica/ "><FiInstagram className={style.oneIcono}/></a>
            <a target='_blank' className={style.link} href="https://goo.gl/maps/5AZAVcY3uA3oHwS38 "><MdOutlineLocationOn className={style.oneIcono}/></a>
            <a target='_blank' className={style.link} href="https://wa.link/sdh5gu"><FaWhatsapp className={style.oneIcono}/></a>
        </div>
        <p className={style.creadorDavid}><a className={style.link} target="_blank" href='https://www.codeandcoffee.tech'>Powered by CodeandCoffee</a></p>
    </footer>
  )
};

export default Footer