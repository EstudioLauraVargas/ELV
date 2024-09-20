import { Link } from 'react-router-dom';
import Navbar from '../Navbar';


const Panel = () => {
  return (
    <div className="h-screen w-full pt-20 p-8 bg-slate-600 ">
     <Navbar/> 
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Panel de Administrador</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
       
        <Link
          to="/abmcursos"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Gestionar Cursos</h2>
            <p className="text-gray-600">Administra cursos, edita y agregar nuevos.</p>
          </div>
        </Link>
        <Link
          to="/gestioncursos"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Gestionar Facturación</h2>
            <p className="text-gray-600">Gestiona las facturas y el historial de transacciones.</p>
          </div>
        </Link>
        <Link
          to="/register"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Gestionar Administrador</h2>
            <p className="text-gray-600">Crear nuevo Administrador.</p>
          </div>
        </Link>
        <Link
          to="/crudSubs"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Nuevas Suscripciones</h2>
            <p className="text-gray-600">Crear, Editar, Eliminar y Listar Suscripciones</p>
          </div>
        </Link>
        <Link
          to="/users"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Listar Clientes</h2>
            <p className="text-gray-600">Listar y Editar Clientes</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Panel;
