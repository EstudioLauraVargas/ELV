// Navbar.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/Actions/actions'; 
import { FaSignOutAlt } from 'react-icons/fa';
import logolaura from "../../lauraassets/logolaura.png"
import { useNavigate} from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center fixed top-0  left-0 w-full z-50">
      <div className="flex items-center">
        <img src={logolaura} alt="Logo de la empresa" className="h-10" />
      </div>
      <div className="flex items-center space-x-4">
        {userInfo ? (
          <>
            <span>{userInfo.name}</span>
            <button onClick={handleLogout} className="flex items-center">
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </>
        ) : (
          <span>No estás logueado</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
