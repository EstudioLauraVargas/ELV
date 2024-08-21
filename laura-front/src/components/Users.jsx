import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Config";
import Navbar from './Dashboard/Navbar';
import backgroundImage from "../lauraassets/bg1.png"

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users`); // Ajusta la URL según tu configuración
        setUsers(response.data.data); // Accede a la clave 'data' en la respuesta
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

const handleGoToPanel = () => {
    navigate("/panel");
  };

  return (
    <div
    className="min-h-screen bg-cover bg-center relative p-4 mt-16"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
     <Navbar/>
     <div className="flex justify-between items-center mb-4">
     <button
    onClick={handleGoToPanel}
    className="bg-pink-500 text-white px-4 py-2 rounded"
  >
    Ir a Panel
  </button>
      <h1 className="text-2xl font-bold mb-4 text-white bg-pink-500">Usuarios</h1>
      </div>
     
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Documento</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo Doc</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Apellido</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Telefono</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sexo</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha de Nac</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.document}>
                <td className="py-2 px-4 border-b border-gray-200">{user.document}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.documentType}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.lastName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.phone}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.sex}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};

export default Users;

