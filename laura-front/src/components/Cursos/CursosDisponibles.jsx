
import { NavLink } from "react-router-dom";

import CursosCarousel from "../Cursos/CursosCarousel";
import fondo2 from "../../lauraassets/bg1.png"


const CursosDisponibles = () => {
    return (
        <div className="landing bg-black text-white">
            <div className="view4 relative flex flex-col md:flex-row-reverse justify-center items-center gap-8 px-4 md:px-8 pt-10 md:pt-20 w-full max-w-full">
                
                {/* Carousel */}
                <div className="w-full md:w-1/2 ">
                    <CursosCarousel />
                </div>

                {/* Información del curso */}
                <div className="info z-10 text-center md:text-left w-full md:w-1/2">
                    <h1 className="titlexd uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[4em] w-full font-bold leading-tight md:leading-[60px] italic">
                        Conviértete en mejor artista de mi mano
                    </h1>
                    <p className="subtitle font-bold text-base sm:text-lg md:text-xl lg:text-[1.4em] mt-4 md:mt-6">
                        En mis cursos personalizados, te enseño todos mis tips y técnicas que me han funcionado a lo largo de mi carrera y que te ayudarán a llevar tus procedimientos al nivel al que tanto has querido llegar.
                    </p>
                    <div className="buttons flex flex-col md:flex-row gap-4 mt-6 md:mt-8">
                        <a target="_blank" href="/listaCursos">
                            <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold text-base sm:text-lg md:text-xl uppercase py-3 md:py-4 px-6 rounded-xl">
                                Ver Cursos
                            </button>
                        </a>
                        <NavLink to="/">
                            <button className="bg-transparent text-white border-2 border-white hover:border-pink-500 w-full md:w-64 h-10 md:h-12 lg:h-16 rounded uppercase font-bold italic transition duration-300 hover:text-pink-200">
                                Volver
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Imagen de fondo solo visible en pantallas medianas y grandes */}
                <div className="fondo2 absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat brightness-50 hidden md:block" style={{ backgroundImage: `url(${fondo2})` }}></div>
            </div>
        </div>
    );
};

export default CursosDisponibles