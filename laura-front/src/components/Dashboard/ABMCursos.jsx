import { Link } from 'react-router-dom';
import Navbar from '../Navbar';


const ABMCursos = () => {
  return (
    <div className="h-screen w-full pt-20 p-8 bg-slate-600 ">
        <Navbar/>
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Gestión de Cursos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <Link
          to="/gestioncursos"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2">Nuevo Curso</h2>
            <p className="text-gray-600"> Crea Un Nuevo Curso </p>
          </div>
        </Link>
        <Link
          to="/listarCursos"
          className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105 p-6 flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-xl font-semibold text-pink-500 mb-2"> Listar Cursos</h2>
            <p className="text-gray-600">Administra Cursos, Edita y Elimina </p>
          </div>
        </Link>
       
      </div>
    </div>
  );
};

export default ABMCursos;