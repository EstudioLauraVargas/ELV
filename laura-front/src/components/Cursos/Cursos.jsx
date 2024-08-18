import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Actions/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logolaura from "../../lauraassets/logolaura.png";
import fondo2 from "../../lauraassets/bg2.png";
import { Bars3Icon } from '@heroicons/react/24/outline';


const Cursos = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userInfo = useSelector((state) => state.userLogin.userInfo);
    console.log(userInfo, "userinfo en cursos");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0px',
        adaptiveHeight: true,
    };

    const renderMenuItems = () => {
        if (!userInfo?.token) {
            // Si el usuario no está logueado, mostrar solo "Login" e "Inicio"
            return (
                <>
                    <NavLink to="/login" className="block text-lg py-2">Login</NavLink>
                    <NavLink to="/" className="block text-lg py-2">Inicio</NavLink>
                </>
            );
        } else if (userInfo.role === "admin") {
            // Si el usuario está logueado como "Admin", mostrar "Logout", "Panel" e "Inicio"
            return (
                <>
                    <button onClick={handleLogout} className="text-white uppercase font-bold">Logout</button>
                    <NavLink to="/panel" className="block text-lg py-2">Panel</NavLink>
                    <NavLink to="/" className="block text-lg py-2">Inicio</NavLink>
                </>
            );
        } else if (userInfo.role === "client") {
            // Si el usuario está logueado como "Client", mostrar "Logout", "Mis Cursos" e "Inicio"
            return (
                <>
                    <button onClick={handleLogout} className="text-white uppercase font-bold">Logout</button>
                    <NavLink to="/misCursos" className="block text-lg py-2">Mis Cursos</NavLink>
                    <NavLink to="/" className="block text-lg py-2">Inicio</NavLink>
                </>
            );
        }
    };

    return (
        <div className="landing bg-black text-white h-auto overflow-hidden">
            {/* Navbar */}
            <div className="navBar flex justify-between items-center p-6 fixed z-10 w-full top-0 left-0">
                <NavLink to="/">
                    <img src={logolaura} alt="Logo" className="h-12" />
                </NavLink>
                <button onClick={handleMenuToggle} className="text-white">
                    <Bars3Icon className="h-8 w-8" />
                </button>
            </div>

            {/* Sidebar Menu */}
            <div className={`fixed top-0 right-0 bg-black text-white w-64 h-full transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
                <div className="p-6">
                    {renderMenuItems()}
                </div>
            </div>

            {/* Main Content */}
            <div className="view4 relative h-screen flex flex-row-reverse justify-center items-center gap-[200px] pt-20">
                <div className="image w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] relative overflow-hidden mt-[10%]">
                    <Slider {...settings}>
                        <div>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8FHkEI4ZtGw" title="TUTORIAL CEJAS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <div>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tqPTmyRlGUM" title="COMO DEPILARSE LAS CEJAS PASO A PASO" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                        <div>
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/EQBriD-jlVM" title="Emilia: look natural con brillos y pestañas XL" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </Slider>
                </div>
                <div className="info z-[100]">
                    <h1 className="titlexd m-0 uppercase text-[4em] w-[33vw] font-bold leading-[60px] italic">
                        Conviértete en mejor artista de mi mano
                    </h1>
                    <p className="subtitle w-[30vw] font-bold text-[1.4em]">
                        En mis cursos personalizados, te enseño todos mis tips y técnicas que me han funcionado a lo largo de mi carrera y que te ayudarán a llevar tus procedimientos al nivel al que tanto has querido llegar.
                    </p>
                    <div className="buttons flex gap-[20px] mt-[1%]">
                        <a target="_blank" href="/misCursos">
                            <button className="button bg-pink-200 text-white w-[270px] h-[75px] rounded-[30px] uppercase font-bold italic transition duration-300 shadow-lg hover:shadow-[0_0_30px_10px_#e5959579]">
                                Ver Cursos
                            </button>
                        </a>
                        <NavLink to="/">
                            <button className="button2 bg-transparent text-white w-[270px] h-[75px] rounded-[30px] uppercase font-bold italic transition duration-300 hover:text-pink-200">
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
