import { NavLink } from 'react-router-dom'
import style from './Landing.module.css'
import procedimientos from "../../lauraassets/procedimientos.png"
import cursos from "../../lauraassets/cursos.png"
import insumos from "../../lauraassets/insumos.png"
import fondo from "../../lauraassets/bg1.png"
import { useNavigate } from 'react-router-dom'
import WhatssapButton from '../WhatsAppButton'
import Section2 from './Section2'
import { FaFacebook, FaInstagram, FaLocationDot,   FaWhatsapp } from "react-icons/fa6";

const Landing = () => {
    
    const navigate = useNavigate()

        const handleSubscribe = () => {
            navigate('/register');
        };

    return  (
        <div className={style.landing}>
     
    <div className="relative h-screen flex justify-start   mb-8 items-center text-white md: p-4 md: mt-8">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover brightness-50"
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-start   lg:text-left px-4 md:px-8 lg:px-16">
        <p className="uppercase text-3xl md:text-4xl lg:text-[4em]  font-bold italic leading-tight lg:leading-[100px] w-full  md:w-[50vw] lg:w-[33vw] mt-16 mb-4">
          realzamos tu belleza
        </p>
        <p className="w-full md:w-[50vw] lg:w-[30vw] font-quicksand font-semibold text-lg md:text-xl lg:text-[1.7em] mb-8">
          En nuestro estudio de cejas y pestañas creemos que la belleza es única y está en cada persona.
          Por eso, nos dedicamos a resaltar la belleza natural de cada uno, fomentando la autenticidad y la
          confianza a través de tratamientos especializados y personalizados.
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          href="https://wa.me/573502142355"
        >
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xl uppercase py-4 px-6 rounded-2xl">
            Saber más
          </button>
        </a>
        </div>
        </div>

            <Section2/>


            <div className={style.view3}>
                <p className={style.title3}>¿Que vas a encontrar en Laura Vargas
                    cejas y pestañas?</p>
                <div className={style.procedimientos}>
                    <div className={style.procedimiento}>
                        <img className={style.imgProc} src={procedimientos} />
                        <h4 className={style.titleProc}>Procedimientos</h4>
                        <div className={style.descProc}>Realizados por especialistas expertas en cada área, que harán que realces tu belleza natural </div>
                        <NavLink to="/procedimiento"><button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xl uppercase py-4 px-6 rounded-2xl m-4">Saber mas</button></NavLink>
                    </div>
                    <div className={style.procedimiento}>
                        <img className={style.imgProc} src={cursos} />
                        <h4 className={style.titleProc}>cursos personalizados</h4>
                        <div className={style.descProc}>Aprende y perfecciona tu técnica de la mano de Laura y lleva tu empresa a otro nivel.</div>
                        <NavLink to="/cursosDisponibles"><button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xl uppercase py-4 px-6 rounded-2xl m-4">Saber mas</button></NavLink>
                    </div>
                    <div className={style.procedimiento}>
                        <img className={style.imgProc} src={insumos} />
                        <h4 className={style.titleProc}>Insumos</h4>
                        <div className={style.descProc}>Somos la única tienda física especializada en insumos para aplicación de cejas y pestañas en el Meta. </div>
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xl uppercase py-4 px-6 rounded-2xl m-4">Saber mas</button>
                    </div>
<WhatssapButton/>
                </div>
            </div>
            <div className="py-12 bg-black">
      <p className="text-3xl md:text-5xl font-bold text-center text-white mb-8">Encuéntranos en</p>
      <div className="flex flex-col md:flex-row justify-center gap-8 px-4 md:px-8">
        {/* Ubicación 1 */}
        <div className="flex flex-col w-full md:w-1/2">
          <div className="relative w-full h-64 mb-4">
            <iframe
              src="https://maps.google.com/maps?q=Cra.%2043a%20calle%2026c%2036,%20Buque,%20Villavicencio,%20Meta&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              frameBorder="0"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="p-4 bg-pink-200 bg-opacity-90 rounded-lg shadow-md">
            <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/urGxSpTtibWLYTsF8" className="text-gray-600 hover:underline block mb-3 text-lg md:text-xl">
              <FaLocationDot className="inline mr-2 text-red-600"/> El Buque, Cra. 43a #26c -36,<br /> Buque, Villavicencio, Meta.
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/lauravargas.cp/" className="text-gray-600 hover:underline block mb-3 text-lg md:text-xl">
              <FaFacebook className="inline mr-2 text-blue-800"/> fucsiainsumosCP
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/fucsiainsumos/" className="text-gray-600 hover:underline block mb-3 text-lg md:text-xl">
              <FaInstagram className="inline mr-2 text-pink-700"/> @fucsiainsumos
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/573114928756" className="text-gray-600 hover:underline text-lg md:text-xl">
              <FaWhatsapp className="inline mr-2 text-green-600"/> +57 311 4922856
            </a>
          </div>
        </div>

        {/* Ubicación 2 */}
        <div className="flex flex-col w-full md:w-1/2 ">
          <div className="relative w-full h-64 mb-4">
            <iframe
              src="https://maps.google.com/maps?q=CC%20Balcones%20Plaza,%20Local%20L29C,%20Restrepo,%20Meta&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
              frameBorder="0"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
          <div className="p-4 bg-pink-200 bg-opacity-90 rounded-lg shadow-md">
            <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/mjDcG7ZvJjjW6HzGA" className="text-gray-600 hover:underline block mb-3 text-lg md:text-xl">
              <FaLocationDot className="inline mr-2  text-red-600"/> CC Balcones Plaza Local L29C,<br /> Restrepo Meta.
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/lauravargas.cp/" className="text-gray-600 hover:underline block mb-3 text-lg md:text-xl">
              <FaFacebook className="inline mr-2 text-blue-800"/> lauravargas.cp
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/lauravargas.cpmu/" className="text-gray-600 hover:underline block mb-3 text-lg md:text-xl">
              <FaInstagram className="inline mr-2 text-pink-700"/> @lauravargas.cpmu
            </a>
            <a target="_blank" rel="noopener noreferrer" href="https://wa.me/573502142355" className="text-gray-600 hover:underline text-lg md:text-xl">
              <FaWhatsapp className="inline mr-2 text-green-600"/> +57 350 2142355
            </a>
          </div>
        </div>
      </div>
    </div>
  
            </div>
       
    )
}

export default Landing