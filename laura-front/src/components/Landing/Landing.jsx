import React from "react";
import { NavLink } from 'react-router-dom';
import sombras from '../../lauraassets/sombras.png';
import procedimientos from "../../lauraassets/procedimientos.png";
import cursos from "../../lauraassets/cursos.png";
import insumos from "../../lauraassets/insumos.png";
import logolaura from "../../lauraassets/logolaura.png";
import { FaFacebook, FaInstagram, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import WhatsAppButton from '../WhatsAppButton';

const Landing = () => {
    const navigate = useNavigate();

    const handleSubscribe = () => {
        navigate('/register');
    };

    return (
        <div className="bg-[#181c20] text-white flex flex-col items-center min-h-screen">
            <NavLink to="/login">
                <img className="w-32 h-auto mt-4" src={logolaura} alt="Logo" />
            </NavLink>
            <div
    className="relative flex justify-center items-center min-h-screen px-2 bg-cover bg-center"
    style={{
        backgroundImage: `url(${sombras})`,
        backgroundSize: '40%', // Ajusta el tamaño del fondo
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.2, // Ajusta la opacidad del fondo
    }}
>
    <div className="max-w-3xl mx-auto text-center relative z-10 font-saira text-gray-400">
        <p className="text-4xl font-bold mb-4 text-gray-500">realzamos tu belleza</p>
        <p className="text-lg mb-6 text-gray-500">
            En nuestro estudio de cejas y pestañas creemos que la belleza es única y está en cada persona.
            Por eso, nos dedicamos a resaltar la belleza natural de cada uno, fomentando la autenticidad y la
            confianza a través de tratamientos especializados y personalizados.
        </p>
        <a target="_blank" href="https://wa.me/573502142355" className="inline-block bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-600">
            Saber más
        </a>
    </div>
</div>

            <div className="relative py-16 px-4">
                <img
                    src={sombras}
                    alt="Sombras"
                    className="absolute inset-0 object-cover w-full h-full opacity-50 -z-10"
                />
                <p className="text-3xl font-bold mb-6 text-center relative z-10">¿Qué vas a encontrar en Laura Vargas cejas y pestañas?</p>
                <div className="flex flex-col items-center relative z-10">
                    <div className="border rounded-lg overflow-hidden shadow-lg text-center bg-gray-800 mb-6 w-full md:w-1/3">
                        <img className="w-full h-40 object-cover" src={procedimientos} alt="Procedimientos" />
                        <h4 className="text-xl font-semibold mt-4">Procedimientos</h4>
                        <p className="text-base p-4">Realizados por especialistas expertas en cada área, que harán que realces tu belleza natural.</p>
                        <NavLink to="/procedimiento">
                            <button className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-600">Saber más</button>
                        </NavLink>
                    </div>
                    <div className="border rounded-lg overflow-hidden shadow-lg text-center bg-gray-800 mb-6 w-full md:w-1/3">
                        <img className="w-full h-40 object-cover" src={cursos} alt="Cursos" />
                        <h4 className="text-xl font-semibold mt-4">Cursos Personalizados</h4>
                        <p className="text-base p-4">Aprende y perfecciona tu técnica de la mano de Laura y lleva tu empresa a otro nivel.</p>
                        <NavLink to="/cursos">
                            <button className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-600">Saber más</button>
                        </NavLink>
                    </div>
                    <div className="border rounded-lg overflow-hidden shadow-lg text-center bg-gray-800 mb-6 w-full md:w-1/3">
                        <img className="w-full h-40 object-cover" src={insumos} alt="Insumos" />
                        <h4 className="text-xl font-semibold mt-4">Insumos</h4>
                        <p className="text-base p-4">Somos la única tienda física especializada en insumos para aplicación de cejas y pestañas en el Meta.</p>
                        <button className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-600">Saber más</button>
                    </div>
                </div>
            </div>
            <div className="relative py-16 px-4">
                <img
                    src={sombras}
                    alt="Sombras"
                    className="absolute inset-0 object-cover w-full h-full opacity-50 -z-10"
                />
                <p className="text-3xl font-bold mb-6 text-center relative z-10">Encuéntranos en</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    <div className="text-center">
                        <div className="relative">
                            <iframe
                                src="https://maps.google.com/maps?q=Cra.%2043a%20calle%2026c%2036,%20Buque,%20Villavicencio,%20Meta&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                                frameBorder="0"
                                className="w-full h-60"
                                title="Location 1"
                            ></iframe>
                        </div>
                        <div className="mt-4">
                            <a target="_blank" href="https://maps.app.goo.gl/urGxSpTtibWLYTsF8" className="text-pink-300 hover:underline flex items-center justify-center">
                                <FaLocationDot className="mr-2" /> El Buque, Cra. 43a #26c -36, Buque, Villavicencio, Meta.
                            </a>
                            <a target="_blank" href="https://www.facebook.com/lauravargas.cp/" className="text-pink-300 hover:underline flex items-center justify-center mt-2">
                                <FaFacebook className="mr-2" /> fucsiainsumosCP
                            </a>
                            <a target="_blank" href="https://www.instagram.com/fucsiainsumos/" className="text-pink-300 hover:underline flex items-center justify-center mt-2">
                                <FaInstagram className="mr-2" /> @fucsiainsumos
                            </a>
                            <a target="_blank" href="https://wa.me/573114928756" className="text-pink-300 hover:underline flex items-center justify-center mt-2">
                                <FaWhatsapp className="mr-2" /> +57 311 4922856
                            </a>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="relative">
                            <iframe
                                src="https://maps.google.com/maps?q=CC%20Balcones%20Plaza,%20Local%20L29C,%20Restrepo,%20Meta&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                                frameBorder="0"
                                className="w-full h-60"
                                title="Location 2"
                            ></iframe>
                        </div>
                        <div className="mt-4">
                            <a target="_blank" href="https://maps.app.goo.gl/mjDcG7ZvJjjW6HzGA" className="text-pink-300 hover:underline flex items-center justify-center">
                                <FaLocationDot className="mr-2" /> CC Balcones Plaza Local L29C, Restrepo Meta.
                            </a>
                            <a target="_blank" href="https://www.facebook.com/lauravargas.cp/" className="text-pink-300 hover:underline flex items-center justify-center mt-2">
                                <FaFacebook className="mr-2" /> fucsiainsumosCP
                            </a>
                            <a target="_blank" href="https://www.instagram.com/fucsiainsumos/" className="text-pink-300 hover:underline flex items-center justify-center mt-2">
                                <FaInstagram className="mr-2" /> @fucsiainsumos
                            </a>
                            <a target="_blank" href="https://wa.me/573114928756" className="text-pink-300 hover:underline flex items-center justify-center mt-2">
                                <FaWhatsapp className="mr-2" /> +57 311 4922856
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 text-center py-4">
                <p className="text-gray-400">© 2024 Laura Vargas. Todos los derechos reservados.</p>
            </div>
            <WhatsAppButton />
        </div>
    );
};

export default Landing;
