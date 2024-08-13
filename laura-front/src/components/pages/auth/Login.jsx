// src/components/Login.js
import  {useState} from'react'
import {Link}  from 'react-router-dom'
import { useAuth } from "../../../AuthContext";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [showPass, setShowPass]= useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleShowPass= () => {
setShowPass(!showPass)
  }

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!hasUpperCase) {
      return "La contraseña debe tener al menos una letra mayúscula.";
    }
    if (!hasNumber) {
      return "La contraseña debe tener al menos un número.";
    }
    if (!hasSpecialChar) {
      return "La contraseña debe tener al menos un carácter especial.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError, {
        className: 'Toastify__toast--custom',
        progressClassName: 'Toastify__progress-bar--custom'
      });
      return;
    }
    try {
      await login(email, password);
      toast.success('Inicio de sesión exitoso', {
        className: 'Toastify__toast--custom',
        progressClassName: 'Toastify__progress-bar--custom'
      });
    } catch (error) {
      let errorMessage;
      switch (error.code) {
        case 'auth/operation-not-allowed':
          errorMessage = 'Operación no permitida. Por favor, contacta al administrador.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado. Por favor, regístrate primero.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido. Por favor, verifica tu correo.';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
      }
      toast.error(errorMessage, {
        className: 'Toastify__toast--custom',
        progressClassName: 'Toastify__progress-bar--custom'
      });
      console.error(error);
    }
  };


  return (
    <div className="min-h-screen flex items-center p-6 justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg  text-center items-center shadow-md w-full md:w-96">
        <div>
          <h1 className="text-2xl mb-5"> Inicia Sesión</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative">
          <MdAlternateEmail className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600"/>
          <input
            type="email"
            className="border border-gray-200 w-full outline-none py-2 px-8 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="relative">
          <RiLockPasswordFill className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 hover:cursor-pointer"/>
          <input
            type={showPass ? "text" : "password"}
            className="border border-gray-200 w-full outline-none py-2 px-8 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {showPass ? (
           <AiFillEyeInvisible onClick={handleShowPass} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:cursor-pointer"/> 
          ) :(<AiFillEye onClick={handleShowPass} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:cursor-pointer"/> )}
          
        </div>
        <div>
          <button className=" mt-6 bg-violet-800 text-gray-400 uppercase w-full py-2 px-6 rounded-lg hover:scale-105 transition-all"  
          type="submit">ingresa</button>
          </div>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">¿No tienes una cuenta? <Link to="/register" className="text-violet-800 hover:underline">Regístrate aquí</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
