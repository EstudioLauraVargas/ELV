import style from './Cursos.module.css'
import laura1 from "../../lauraassets/laura1.png"
import { NavLink } from 'react-router-dom'
import logolaura from "../../lauraassets/logolaura.png"

const Cursos = () => {

    return (
        <>
        <div className={style.landing}>
        <img className={style.navBar} src={logolaura} />
           <div className={style.view4}>
                <div className={style.fondo2}></div>
                <div className={style.info}>
                    <p className={style.titlexd}>conviertete en mejor artista de mi mano</p>
                    <p className={style.subtitle}>En mis cursos personalizados, te enseño todos mis tips  y técnicas que me han
                        funcionado a lo largo de mi carrera y que te ayudaran a llevar tus procedimientos al nivel al que tanto has querido llegar.  </p>
                    <div className={style.buttons}>
                    <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Consulta disponibilidad</button></a>
                    <NavLink to="/"><button className={style.button2}>Volver</button></NavLink>
                    </div>

                </div>
                <div className={style.image}>
                    <img className={style.img} src={laura1} style={{ transform: "scaleX(-1)", left: "-60%" }} />
                </div>
            </div>
            </div>
        </>
    )
}

export default Cursos