// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';
import logolaura from "../../../lauraassets/logolaura.png";
import style from '../../../components/Landing/Landing'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    document: '',
    documentType:'',
    phone: '',
    role: 'visitor', 
    sex: '',
    birthDate:''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  
  const loggedInUserInfo = useSelector((state) => state.userLogin.userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); 
    dispatch(registerUser(formData)).then(() => {
      if (loggedInUserInfo && loggedInUserInfo.role === 'admin') {
        navigate('/');
      } else {
        navigate('/');
      }
    });
  };

  return (
    
           
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <div className="bg-white p-8 rounded-lg  shadow-md w-full max-w-4xl">
      <div className="bg-black text-pink-500 py-4 px-6 rounded-lg flex items-center justify-center mb-4">
      
      <img className="w-38 h-12" src={logolaura} alt="Logo" />
    </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
              placeholder="Número de Documento"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          <div>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Tipo de Documento</option>
              <option value="Cedula">CC</option>
              <option value="NIT">NIT</option>
              <option value="Otro">X</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <div>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">X</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              required
            />
          </div>
          {loggedInUserInfo && loggedInUserInfo.role === 'admin' && (
            <div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="client">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-400"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
        {userInfo && <div className="text-green-500 mt-2">Registro exitoso!</div>}
      </div>
    </div>
   
  );
  
}  
export default Register;

