import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Cursos.module.css';
import { NavLink } from 'react-router-dom';
import logolaura from "../../lauraassets/logolaura.png";
import Slider from "react-slick";

const Cursos = () => {
    const settings = {
        dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,  // Centra el contenido
    centerPadding: '0px', // Ajusta el relleno para que el contenido ocupe todo el espacio
    adaptiveHeight: true, // Permite que la altura del slider se ajuste automáticamente
    }

    return (
        <>
            <div className={style.landing}>
                <img className={style.navBar} src={logolaura} alt="Logo" />
                <div className={style.view4}>
                    <div className={style.fondo2}></div>
                    <div className={style.info}>
                        <p className={style.titlexd}>Conviértete en mejor artista de mi mano</p>
                        <p className={style.subtitle}>
                            En mis cursos personalizados, te enseño todos mis tips y técnicas que me han
                            funcionado a lo largo de mi carrera y que te ayudarán a llevar tus procedimientos
                            al nivel al que tanto has querido llegar.
                        </p>
                        <div className={style.buttons}>
                            <a target="_blank" className={style.noLink} href="/misCursos">
                                <button className={style.button}>Ver Cursos</button>
                            </a>
                            <NavLink to="/">
                                <button className={style.button2}>Volver</button>
                            </NavLink>
                        </div>
                    </div>
                    <div className={style.image}>
                        <Slider {...settings}>
                            <div>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8FHkEI4ZtGw" title="TUTORIAL CEJAS: DEPILAR, DAR FORMA, TRUCOS, CONSEJOS Y TIPS | COMO DEPILARSE LAS CEJAS EN CASA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                            <div>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tqPTmyRlGUM" title="COMO DEPILARSE LAS CEJAS PASO A PASO, DAR FORMA Y TIPS." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                            <div>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EQBriD-jlVM" title="Emilia: look natural con brillos y pestañas XL | Secretos de Belleza | VOGUE España" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cursos;
