import { NavLink } from 'react-router-dom'
import style from './Landing.module.css'
import laura1 from "../../lauraassets/laura1.png"
import laura2 from "../../lauraassets/laura2.png"
import procedimientos from "../../lauraassets/procedimientos.png"
import cursos from "../../lauraassets/cursos.png"
import insumos from "../../lauraassets/insumos.png"
import logolaura from "../../lauraassets/logolaura.png"
//import sombras from "../../lauraassets/sombras.png"
import { Fade } from "react-awesome-reveal";
import { useNavigate } from 'react-router-dom'

import { FaFacebook, FaInstagram, FaLocationDot,   FaWhatsapp } from "react-icons/fa6";

const Landing = () => {
    
    const navigate = useNavigate()

        const handleSubscribe = () => {
            navigate('/register');
        };

    return  (
        <div className={style.landing}>
            <NavLink to="/login">
                <img className={style.navBar} src={logolaura} alt="Logo" />
            </NavLink>
            <div className={style.view1}>
               
                <div className={style.fondo}></div>
                <div className={style.info}>
                    <p className={style.title}>realzamos tu belleza</p>
                    <p className={style.subtitle}>En nuestro estudio de cejas y pestañas creemos que la belleza es única y está en cada persona.
                        Por eso, nos dedicamos a resaltar la belleza natural de cada uno, fomentando la autenticidad y la
                        confianza a través de tratamientos especializados y personalizados.</p>
                        <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Saber mas</button></a>
       
               
                </div>
                
            </div>
            <div className={style.view2}>
                <img className={style.imgAbsoluta} />
                <img className={style.imgAbsoluta2} />
                
                <div className={style.info2}>
                    <p className={style.title2}>acerca de laura vargas</p>
                    <p className={style.subtitle2}>Laura es micropigmentadora especialista en cejas y labios, se ha capacitado desde hace mas de
                        4 años para tener técnicas exclusivas con acabados super naturales que busca realzar la belleza de sus clientas y estudiantes.
                        <br></br><br></br>
                        <span style={{ color: "#e59595", fontSize:'1.6em'}}>Actualmente dicta cursos personalizados, enfocados en crear artistas especialistas en Micropigmentación, Cejas y Pestañas.</span>
                        <br></br><br></br>
                        Cuenta con un equipo de trabajo entrenado para dar lo mejor en lo que saben hacer, y que busca atender a cada una de
                        nuestras clientas de forma especial para hacerlas sentir seguras y confiadas de su belleza.  </p>
                </div>
                
            </div>
            <div className={style.view3}>
                <p className={style.title3}>¿Que vas a encontrar en Laura Vargas
                    cejas y pestañas?</p>
                <div className={style.procedimientos}>
                    <div className={style.procedimiento}>
                        <img className={style.imgProc} src={procedimientos} />
                        <h4 className={style.titleProc}>Procedimientos</h4>
                        <div className={style.descProc}>Realizados por especialistas expertas en cada área, que harán que realces tu belleza natural </div>
                        <NavLink to="/procedimiento"><button className={style.buttonProc}>Saber mas</button></NavLink>
                    </div>
                    <div className={style.procedimiento}>
                        <img className={style.imgProc} src={cursos} />
                        <h4 className={style.titleProc}>cursos personalizados</h4>
                        <div className={style.descProc}>Aprende y perfecciona tu técnica de la mano de Laura y lleva tu empresa a otro nivel.</div>
                        <NavLink to="/cursos"><button className={style.buttonProc}>Saber mas</button></NavLink>
                    </div>
                    <div className={style.procedimiento}>
                        <img className={style.imgProc} src={insumos} />
                        <h4 className={style.titleProc}>Insumos</h4>
                        <div className={style.descProc}>Somos la única tienda física especializada en insumos para aplicación de cejas y pestañas en el Meta. </div>
                        <button className={style.buttonProc}>Saber mas</button>
                    </div>

                </div>
            </div>
            <div className={style.view6}>
                <p className={style.title3}>Encuentranos en</p>
                <div className={style.locations}>
                    <div className={style.location}>
                        <div className={style.mapa}>
                            <iframe
                                src="https://maps.google.com/maps?q=Cra.%2043a%20calle%2026c%2036,%20Buque,%20Villavicencio,%20Meta&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                                frameborder="0"
                                className={style.map}
                            ></iframe>
                            {/* <iframe className={style.map} frameborder="0" src="https://www.google.com/maps/embed/v1/place?q=Cra.+43a+#26c+-36,+Buque,+Villavicencio,+Meta&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe> */}

                        </div>
                        <div className={style.infoloc}>
                            <a target="_blank" className={style.noLink} href="https://maps.app.goo.gl/urGxSpTtibWLYTsF8"><p className={style.texto}><FaLocationDot /> El Buque, Cra. 43a #26c -36,<br></br> Buque, Villavicencio, Meta.</p></a>
                            <a target="_blank" className={style.noLink} href="https://www.facebook.com/lauravargas.cp/"><p className={style.texto}><FaFacebook/> fucsiainsumosCP</p></a>
                            <a target="_blank" className={style.noLink} href="https://www.instagram.com/fucsiainsumos/"><p className={style.texto}><FaInstagram /> @fucsiainsumos</p></a>
                            <a target="_blank" className={style.noLink} href="https://wa.me/573114928756"><p className={style.texto}><FaWhatsapp /> +57 311 4922856</p></a>
                        </div>
                    </div>
                    <div className={style.location}>
                        <div className={style.mapa}>
                            <iframe
                                src="https://maps.google.com/maps?q=CC%20Balcones%20Plaza,%20Local%20L29C,%20Restrepo,%20Meta&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                                frameborder="0"
                                className={style.map}
                            ></iframe>
                        </div>
                        <div className={style.infoloc}>
                        <a target="_blank" className={style.noLink} href="https://maps.app.goo.gl/mjDcG7ZvJjjW6HzGA"><p className={style.texto}><FaLocationDot /> CC Balcones Plaza Local L29C,<br></br> Restrepo Meta.</p></a>
                        <a target="_blank" className={style.noLink} href="https://www.facebook.com/lauravargas.cp/"><p className={style.texto}><FaFacebook/> lauravargas.cp</p></a>
                        <a target="_blank" className={style.noLink} href="https://www.instagram.com/lauravargas.cpmu/"><p className={style.texto}><FaInstagram /> @lauravargas.cpmu</p></a>
                        <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><p className={style.texto}><FaWhatsapp /> +57 350 2142355</p></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing