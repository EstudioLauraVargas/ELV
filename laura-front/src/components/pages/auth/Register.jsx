// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../Redux/Actions/actions';
import { useNavigate } from 'react-router-dom';

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
        navigate('/login');
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg text-center items-center shadow-md w-full md:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Registro de Cliente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Documento</label>
            <input
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Documento</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Seleccione</option>
              <option value="Cedula">CC</option>
              <option value="NIT">NIT</option>
              <option value="Otro">X</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Género</label>
            <select
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">X</option>
            </select>
          </div>
          <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
          {loggedInUserInfo && loggedInUserInfo.role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="client">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-pink-300 text-white py-2 px-4 rounded-md hover:bg-green-600"
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
};

export default Register;

