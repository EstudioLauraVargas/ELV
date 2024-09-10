import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Actions/actions";
import { Bars3Icon } from "@heroicons/react/24/outline";
import logolaura from "../lauraassets/logolaura.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsOpen(false);
  };

  const renderMenuItems = () => {
    if (!userInfo?.token) {
      return (
        <>
          <NavLink
            to="/login"
            className="block text-lg py-2"
            onClick={handleMenuToggle} 
          >
            Login
          </NavLink>
          <NavLink
            to="/"
            className="block text-lg py-2"
            onClick={handleMenuToggle} 
          >
            Inicio
          </NavLink>
        </>
      );
    } else if (userInfo.role === "admin") {
      return (
        <>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false); 
            }}
            className="text-white uppercase font-bold"
          >
            Logout
          </button>
          <NavLink
            to="/panel"
            className="block text-lg py-2"
            onClick={handleMenuToggle} 
          >
            Panel
          </NavLink>
          <NavLink
            to="/"
            className="block text-lg py-2"
            onClick={handleMenuToggle}
          >
            Inicio
          </NavLink>
        </>
      );
    } else if (userInfo.role === "client") {
      return (
        <>
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false); 
            }}
            className="text-white uppercase font-bold"
          >
            Logout
          </button>
          <NavLink
            to="/misCursos"
            className="block text-lg py-2"
            onClick={handleMenuToggle} 
          >
            Mis Cursos
          </NavLink>
          <NavLink
            to="/"
            className="block text-lg py-2"
            onClick={handleMenuToggle} 
          >
            Inicio
          </NavLink>
        </>
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar fixed top-0 left-0 w-full z-50 ${isScrolled ? "bg-gray-900" : "bg-transparent"} transition-colors duration-300`}>
      <div className="navBar flex justify-between items-center p-6">
        <NavLink to="/">
          <img src={logolaura} alt="Logo" className="h-12" />
        </NavLink>
        <button onClick={handleMenuToggle} className="text-white">
          <Bars3Icon className="h-8 w-8" />
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 bg-black text-white w-64 h-full transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        <div className="p-6">{renderMenuItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;


