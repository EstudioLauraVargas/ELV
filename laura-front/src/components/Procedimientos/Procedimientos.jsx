import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom'
import style from './Procedimientos.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import p10 from "../../lauraassets/img1.jpg"
import { useState } from 'react';
import img1 from "../../lauraassets/img1.jpg"
import img2 from "../../lauraassets/img2.jpg"
import img3 from "../../lauraassets/img3.png"
import img4 from "../../lauraassets/img4.png"
import img5 from "../../lauraassets/img5.png"
import img6 from "../../lauraassets/img6.jpg"
//import logolaura from "../../lauraassets/logolaura.png"

// microcejas
import microcejas3 from "../../lauraassets/procLaura/microcejas/microcejas3.jpeg"
import microcejas6 from "../../lauraassets/procLaura/microcejas/microcejas6.png"
import microcejas12 from "../../lauraassets/procLaura/microcejas/microcejas12.png"
import microcejas13 from "../../lauraassets/procLaura/microcejas/microcejas13.jpeg"
import microcejas14 from "../../lauraassets/procLaura/microcejas/microcejas14.jpeg"
import microcejas15 from "../../lauraassets/procLaura/microcejas/microcejas15.jpeg"
import microcejas16 from "../../lauraassets/procLaura/microcejas/microcejas16.jpeg"
import microcejas17 from "../../lauraassets/procLaura/microcejas/microcejas17.jpeg"

// microlabios
import microlabios13 from "../../lauraassets/procLaura/microlabios/microlabios13.png"
import microlabios14 from "../../lauraassets/procLaura/microlabios/microlabios14.png"
import microlabios15 from "../../lauraassets/procLaura/microlabios/microlabios15.png"
import microlabios16 from "../../lauraassets/procLaura/microlabios/microlabios16.jpg"
import microlabios17 from "../../lauraassets/procLaura/microlabios/microlabios17.jpg"
import microlabios18 from "../../lauraassets/procLaura/microlabios/microlabios18.jpg"
import microlabios19 from "../../lauraassets/procLaura/microlabios/microlabios19.jpg"
import microlabios20 from "../../lauraassets/procLaura/microlabios/microlabios20.jpg"
import microlabios21 from "../../lauraassets/procLaura/microlabios/microlabios21.jpg"
import microlabios22 from "../../lauraassets/procLaura/microlabios/microlabios22.jpg"
import microlabios23 from "../../lauraassets/procLaura/microlabios/microlabios23.jpg"

// pestañas
import pestañas5 from "../../lauraassets/procLaura/pestañas/pestañas5.jpeg"
import pestañas6 from "../../lauraassets/procLaura/pestañas/pestañas6.jpeg"
import pestañas7 from "../../lauraassets/procLaura/pestañas/pestañas7.jpeg"
import pestañas8 from "../../lauraassets/procLaura/pestañas/pestañas8.jpeg"
import pestañas9 from "../../lauraassets/procLaura/pestañas/pestañas9.jpeg"
import pestañas10 from "../../lauraassets/procLaura/pestañas/pestañas10.jpeg"
import pestañas11 from "../../lauraassets/procLaura/pestañas/pestañas11.jpeg"
import pestañas12 from "../../lauraassets/procLaura/pestañas/pestañas12.jpeg"
import pestañas13 from "../../lauraassets/procLaura/pestañas/pestañas13.jpeg"
import pestañas14 from "../../lauraassets/procLaura/pestañas/pestañas14.jpeg"
import pestañas15 from "../../lauraassets/procLaura/pestañas/pestañas15.jpeg"
import pestañas16 from "../../lauraassets/procLaura/pestañas/pestañas16.jpeg"
import pestañas17 from "../../lauraassets/procLaura/pestañas/pestañas17.jpeg"

// lifting
import lifting1 from "../../lauraassets/procLaura/lifting/lifting1.png"
import lifting2 from "../../lauraassets/procLaura/lifting/lifting2.jpeg"

// henna
import henna3 from "../../lauraassets/procLaura/henna/henna3.jpg"
import henna5 from "../../lauraassets/procLaura/henna/henna5.jpg"
import henna6 from "../../lauraassets/procLaura/henna/henna6.png"
import henna12 from "../../lauraassets/procLaura/henna/henna12.jpg"
import henna13 from "../../lauraassets/procLaura/henna/henna13.jpg"
import henna14 from "../../lauraassets/procLaura/henna/henna14.jpg"
import henna15 from "../../lauraassets/procLaura/henna/henna15.jpg"
import henna16 from "../../lauraassets/procLaura/henna/henna16.jpg"
import henna17 from "../../lauraassets/procLaura/henna/henna17.jpg"
import henna18 from "../../lauraassets/procLaura/henna/henna18.jpg"
import henna19 from "../../lauraassets/procLaura/henna/henna19.jpg"
import henna38 from "../../lauraassets/procLaura/henna/henna38.jpeg"

// laminado
import laminado1 from "../../lauraassets/procLaura/laminado/laminado1.jpg"
import laminado3 from "../../lauraassets/procLaura/laminado/laminado3.jpg"
import laminado4 from "../../lauraassets/procLaura/laminado/laminado4.jpg"
import laminado5 from "../../lauraassets/procLaura/laminado/laminado5.jpg"
import laminado8 from "../../lauraassets/procLaura/laminado/laminado8.jpeg"
import laminado9 from "../../lauraassets/procLaura/laminado/laminado9.jpeg"
import laminado2 from "../../lauraassets/procLaura/laminado/laminado2.jpg"

// import p11 from "../../lauraassets/p11.jpg"

// import p20 from "../../lauraassets/p20.jpg"
const Procedimientos = () => {

    const [id, setId] = useState(null)

    return (
        <>
        {id == null && <div className={style.landing}><div className={style.view5} id="procedimientos">
            <p className={style.title3}>Procedimientos</p>
            <div className={style.container}>
                <div className={style.fila}>
                    <img className={style.box} onClick={() => setId(1)} src={img1} />
                    <img className={style.box} onClick={() => setId(3)} src={img2} />
                    <img className={style.box} onClick={() => setId(6)} src={img3} />
                </div>
                <div className={style.fila}>
                    <img className={style.box} onClick={() => setId(4)} src={img4} />
                    <img className={style.box} onClick={() => setId(5)} src={img5} />
                    <img className={style.box} onClick={() => setId(2)} src={img6} />
                </div>
            </div>
            <NavLink to="/"><button className={style.button2} style={{margin:"0 auto"}}>Volver</button></NavLink>
        </div></div>
        }
        {id == 1 && <div className={style.landing}>
            {/* <img className={style.navBar} src={logolaura} /> */}
            <h1 className={style.title}>Micropigmentación de cejas</h1>
            <div className={style.procedimiento}>
                <div className={style.carrusel}>
                <Carousel autoPlay infiniteLoop interval={3000} renderArrowPrev={() => null} renderArrowNext={() => null}
                showStatus={false} renderThumbs={() => null}>
                <div>
                    <img src={microcejas3} />
                </div>
                <div>
                    <img src={microcejas6} />
                </div>
                <div>
                    <img src={microcejas12} />
                </div>
                <div>
                    <img src={microcejas13} />
                </div>
                <div>
                    <img src={microcejas14} />
                </div>
                <div>
                    <img src={microcejas15} />
                </div>
                <div>
                    <img src={microcejas16} />
                </div>
                <div>
                    <img src={microcejas17} />
                </div>
            </Carousel>
                </div>
                <div className={style.detalles}>
                    <p className={style.descripcion}>La micropigmenatacion de cejas es una tecnica que se trabaja en cejas que han tenido procedimientos
                        anteriores que se han desgastado con el tiempo y requieren refuerzo de color o un nuevo diseño,cejas naturales que han perdido
                        la horma o aquellas personas a las que les gusta el efecto del maquillaje en sus cejas.
                        <br></br><br></br>
                        En Laura Vargas cejas y pestañas hacemos sombras, amamos los resultados naturales, recuerda que este 
                        procedimiento tiene una duracion de 8 a 12 meses</p>
                        <div className={style.buttons}>
                        <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Agenda tu valoracion</button></a>
                    <button onClick={() => setId(null)} className={style.button2}>Volver</button>
                        </div>
                </div>
            </div>
        </div>}
        {id == 2 && <div className={style.landing}>
            <img className={style.navBar} src={logolaura} />
            <h1 className={style.title}>Micropigmentacion 
de labios</h1>
            <div className={style.procedimiento}>
                <div className={style.carrusel}>
                <Carousel autoPlay infiniteLoop interval={3000} renderArrowPrev={() => null} renderArrowNext={() => null}
                showStatus={false} renderThumbs={() => null}>
                <div>
                    <img src={microlabios13} />
                </div>
                <div>
                    <img src={microlabios14} />
                </div>
                <div>
                    <img src={microlabios15} />
                </div>
                <div>
                    <img src={microlabios16} />
                </div>
                <div>
                    <img src={microlabios17} />
                </div>
                <div>
                    <img src={microlabios18} />
                </div>
                <div>
                    <img src={microlabios19} />
                </div>
                <div>
                    <img src={microlabios20} />
                </div>
                <div>
                    <img src={microlabios21} />
                </div>
                <div>
                    <img src={microlabios22} />
                </div>
                <div>
                    <img src={microlabios23} />
                </div>
            </Carousel>
                </div>
                <div className={style.detalles}>
                    <p className={style.descripcion}>La micropigmenatacion de labios es una técnica que nos permite neutralizar labios oscuros, darle vida a labios palidos con color o resaltar esos labios voluminosos pero sin color, todo dependera de tu lamina labial, para hacerte este procedimiento debes hidratar con anticipacion usando un humectante libre de productos derivados del petroleo.
<br></br><br></br>
Recupera el color y la definición de tus labios
Luce unos labios más carnosos y sensuales
Adiós al labial durante horas</p>
                        <div className={style.buttons}>
                    <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Agenda tu valoracion</button></a>
                    <button onClick={() => setId(null)} className={style.button2}>Volver</button>
                        </div>
                </div>
            </div>
        </div>}
        {id == 3 && <div className={style.landing}>
            <img className={style.navBar} src={logolaura} />
            <h1 className={style.title}>Extensiones de pestañas</h1>
            <div className={style.procedimiento}>
                <div className={style.carrusel}>
                <Carousel autoPlay infiniteLoop interval={3000} renderArrowPrev={() => null} renderArrowNext={() => null}
                showStatus={false} renderThumbs={() => null}>
                <div>
                    <img src={pestañas5} />
                </div>
                <div>
                    <img src={pestañas6} />
                </div>
                <div>
                    <img src={pestañas7} />
                </div>
                <div>
                    <img src={pestañas8} />
                </div>
                <div>
                    <img src={pestañas9} />
                </div>
                <div>
                    <img src={pestañas10} />
                </div>
                <div>
                    <img src={pestañas11} />
                </div>
                <div>
                    <img src={pestañas12} />
                </div>
                <div>
                    <img src={pestañas13} />
                </div>
                <div>
                    <img src={pestañas14} />
                </div>
                <div>
                    <img src={pestañas15} />
                </div>
                <div>
                    <img src={pestañas16} />
                </div>
                <div>
                    <img src={pestañas17} />
                </div>
            </Carousel>
                </div>
                <div className={style.detalles}>
                    <p className={style.descripcion}>Quieres lucir una mirada perfecta y cautivadora? ¿Quieres ahorrar tiempo en el maquillaje? Entonces, los servicios de  las especialistas de Laura Vargas cejas y pestañas son para ti.
<br></br> <br></br>
En Laura Vargas cejas y pestañas, ofrecemos una amplia gama de técnicas, volúmenes, fibras tecnológicas para que puedas lucir una mirada perfecta y natural. 
<br></br><br></br>
Luce unas pestañas largas, voluminosas y curvadas sin necesidad de maquillarte.
Adiós al rizador de pestañas.
Sal de casa con la mirada perfecta en solo una hora</p>
                        <div className={style.buttons}>
                    <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Agenda tu valoracion</button></a>
                    <button onClick={() => setId(null)} className={style.button2}>Volver</button>
                        </div>
                </div>
            </div>
        </div>}
        {id == 4 && <div className={style.landing}>
            <img className={style.navBar} src={logolaura} />
            <h1 className={style.title}>Lifting  de pestañas</h1>
            <div className={style.procedimiento}>
                <div className={style.carrusel}>
                <Carousel autoPlay infiniteLoop interval={3000} renderArrowPrev={() => null} renderArrowNext={() => null}
                showStatus={false} renderThumbs={() => null}>
                <div>
                    <img src={lifting1} />
                </div>
                <div>
                    <img src={lifting2} />
                </div>
            </Carousel>
                </div>
                <div className={style.detalles}>
                    <p className={style.descripcion}>El lifting de pestañas nos permite darle definición a tus pestañas naturales, dándole una forma divina y que haga que luzcas siempre lindas tus pestañas naturales, es un procedimiento que dura de 1 a 2 meses depende del crecimiento de tus pestañas
<br></br> <br></br>
Pestañas más largas y levantadas sin necesidad de rizador.
Dile adiós al encrespador de pestañas.
Luce unas pestañas más abiertas y expresivas
<br></br> <br></br>
Luego del procedimiento podrás usar tu mascara de pestañas sin problemas.</p>
                        <div className={style.buttons}>
                    <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Agenda tu valoracion</button></a>
                    <button onClick={() => setId(null)} className={style.button2}>Volver</button>
                        </div>
                </div>
            </div>
        </div>}
        {id == 5 && <div className={style.landing}>
            <img className={style.navBar} src={logolaura} />
            <h1 className={style.title}>Diseño y depilacion</h1>
            <div className={style.procedimiento}>
                <div className={style.carrusel}>
                <Carousel autoPlay infiniteLoop interval={3000} renderArrowPrev={() => null} renderArrowNext={() => null}
                showStatus={false} renderThumbs={() => null}>
                <div>
                    <img src={henna3} />
                </div>
                <div>
                    <img src={henna5} />
                </div>
                <div>
                    <img src={henna6} />
                </div>
                <div>
                    <img src={henna12} />
                </div>
                <div>
                    <img src={henna13} />
                </div>
                <div>
                    <img src={henna14} />
                </div>
                <div>
                    <img src={henna15} />
                </div>
                <div>
                    <img src={henna16} />
                </div>
                <div>
                    <img src={henna17} />
                </div>
                <div>
                    <img src={henna18} />
                </div>
                <div>
                    <img src={henna19} />
                </div>
                <div>
                    <img src={henna38} />
                </div>
            </Carousel>
                </div>
                <div className={style.detalles}>
                    <p className={style.descripcion}>En Laura Vargas cejas y pestañas nos encanta realzar tu belleza, por eso sabemos que un buen diseño y la perfecta limpieza de tus cejas es la clave para que permanezcan hermosas y sean el marco perfecto para tu rostro, manejamos técnicas pulcras y delicadas para hacer la depilación de tus cejas. 
<br></br><br></br>
Contamos con especialistas para que siempre estés segura que de nuestro estudio saldrás mucho mas hermosa, agenda tu cita no dejes pasar la oportunidad de verte siempre bella y delicada. 
<br></br><br></br>
Para la pigmentación temporal usamos productos de la mejor calidad y técnicas que hacen que se vean definidas y naturales. </p>
                        <div className={style.buttons}>
                    <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Agenda tu valoracion</button></a>
                    <button onClick={() => setId(null)} className={style.button2}>Volver</button>
                        </div>
                </div>
            </div>
        </div>}
        {id == 6 && <div className={style.landing}>
            <img className={style.navBar} src={logolaura} />
            <h1 className={style.title}>Laminado de cejas</h1>
            <div className={style.procedimiento}>
                <div className={style.carrusel}>
                <Carousel autoPlay infiniteLoop interval={3000} renderArrowPrev={() => null} renderArrowNext={() => null}
                showStatus={false} renderThumbs={() => null}>
                <div>
                    <img src={laminado1} />
                </div>
                <div>
                    <img src={laminado3} />
                </div>
                <div>
                    <img src={laminado4} />
                </div>
                <div>
                    <img src={laminado5} />
                </div>
                <div>
                    <img src={laminado2} />
                </div>
                <div>
                    <img src={laminado9} />
                </div>
            </Carousel>
                </div>
                <div className={style.detalles}>
                    <p className={style.descripcion}>Este procedimiento es ideal para las chicas que tienen cejas pobladas y quieren darle forma y definición a sus vellos, en este procedimiento las ordenamos y le damos forma para que tengas cejas definidas y peinadas por semanas. 
<br></br><br></br>
Te permitirá evitar depilar tan seguido y hará que luzcas unas cejas mas gruesas y naturales. 
<br></br><br></br>
Este procedimiento tiene duración de 1 a 2 meses  dependerá del crecimiento de tus cejas, en Laura Vargas cejas y pestañas contamos con los mejores especialistas y productos de calidad para tu atención</p>
                        <div className={style.buttons}>
                    <a target="_blank" className={style.noLink} href="https://wa.me/573502142355"><button className={style.button}>Agenda tu valoracion</button></a>
                    <button onClick={() => setId(null)} className={style.button2}>Volver</button>
                        </div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default Procedimientos