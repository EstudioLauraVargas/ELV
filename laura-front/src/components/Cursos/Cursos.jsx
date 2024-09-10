import { NavLink, useNavigate } from "react-router-dom";
import fondo2 from "../../lauraassets/bg2.png";
import React, { useState } from "react";
import SubscriptionCarousel from "../Dashboard/Subscriptions/SubscriptionCarousel";


const Cursos = () => {
  
    return (
        <div className="landing bg-black text-white">
        
            <div className="view4 relative flex flex-col md:flex-row-reverse justify-center items-center gap-16 pt-20">
                <SubscriptionCarousel />
                <div className="info z-[100]">
                    <h1 className="titlexd m-0 uppercase text-[4em] w-[33vw] font-bold leading-[60px] italic">
                        Conviértete en mejor artista de mi mano
                    </h1>
                    <p className="subtitle w-[30vw] font-bold text-[1.4em]">
                        En mis cursos personalizados, te enseño todos mis tips y técnicas que me han funcionado a lo largo de mi carrera y que te ayudarán a llevar tus procedimientos al nivel al que tanto has querido llegar.
                    </p>
                    <div className="buttons flex gap-[10px] mt-[1%]">
                        <a target="_blank" href="/misCursos">
                            <button className="button bg-pink-200 text-white w-[135px] h-[35px] rounded-[30px] uppercase font-bold italic transition duration-300 shadow-lg hover:shadow-[0_0_30px_10px_#e5959579] mt-4">
                                Ver Cursos
                            </button>
                        </a>
                        <NavLink to="/">
                            <button className="button2 bg-transparent text-white w-64 h-16 rounded-full uppercase font-bold italic transition duration-300 hover:text-pink-200">
                                Volver
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className="fondo2 absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat brightness-50" style={{ backgroundImage: `url(${fondo2})` }}></div>
            </div>
        </div>
    );
};

export default Cursos;
